const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env, params } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  const id = params.id;
  const proposal = await env.DB.prepare('SELECT * FROM proposals WHERE id = ?').bind(id).first();
  if (!proposal) return json({ error: 'Not found' }, 404);

  const { results: line_items } = await env.DB.prepare(
    'SELECT id, description, unit, qty, unit_price, vat_rate, is_discounted, original_price, sort_order FROM proposal_line_items WHERE proposal_id = ? ORDER BY sort_order'
  ).bind(id).all();

  return json({ proposal, line_items });
}
