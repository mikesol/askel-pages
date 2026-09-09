const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const rep = url.searchParams.get('rep');
    const customer = url.searchParams.get('customer');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    let sql = 'SELECT id, created_at, sales_rep, customer_company, industry FROM proposals WHERE 1=1';
    const binds = [];
    if (rep) { sql += ' AND sales_rep LIKE ?'; binds.push(`%${rep}%`); }
    if (customer) { sql += ' AND customer_company LIKE ?'; binds.push(`%${customer}%`); }
    if (from) { sql += ' AND created_at >= ?'; binds.push(from); }
    if (to) { sql += ' AND created_at <= ?'; binds.push(to); }
    sql += ' ORDER BY created_at DESC';

    const { results } = await env.DB.prepare(sql).bind(...binds).all();
    return json({ rows: results });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    if (!body.sales_rep || !body.customer_company || !body.industry) {
      return json({ error: 'sales_rep, customer_company, and industry are required' }, 400);
    }
    const result = await env.DB.prepare(
      `INSERT INTO proposals (sales_rep, sales_rep_contact, customer_company, contact_name, contact_info, industry, needs_summary, proposal_date, process_start_date, process_delivery_cycle, process_vuokratekstiilit, process_sorting_need, language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      body.sales_rep, body.sales_rep_contact || '', body.customer_company, body.contact_name || '', body.contact_info || '',
      body.industry, body.needs_summary || '', body.proposal_date || '', body.process_start_date || '',
      body.process_delivery_cycle || '', body.process_vuokratekstiilit || '', body.process_sorting_need || '', body.language || 'fi'
    ).run();
    const proposalId = result.meta.last_row_id;

    const items = Array.isArray(body.line_items) ? body.line_items : [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      await env.DB.prepare(
        `INSERT INTO proposal_line_items (proposal_id, description, unit, qty, unit_price, vat_rate, is_discounted, original_price, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(proposalId, it.description, it.unit || '', it.qty || 1, it.unit_price || 0, it.vat_rate ?? 25.5, it.is_discounted ? 1 : 0, it.original_price ?? null, i).run();
    }

    return json({ id: proposalId });
  }

  return json({ error: 'Method not allowed' }, 405);
}
