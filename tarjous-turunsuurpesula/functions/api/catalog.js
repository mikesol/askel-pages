const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT id, industry, description, unit, min_price, max_price, default_vat_rate, sort_order FROM pricing_catalog ORDER BY industry, sort_order'
    ).all();
    return json({ rows: results });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    if (!body.industry || !body.description || !body.unit) return json({ error: 'industry, description, and unit are required' }, 400);
    const result = await env.DB.prepare(
      'INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(body.industry, body.description, body.unit, body.min_price || 0, body.max_price || 0, body.default_vat_rate ?? 25.5, body.sort_order || 0).run();
    return json({ id: result.meta.last_row_id });
  }

  return json({ error: 'Method not allowed' }, 405);
}
