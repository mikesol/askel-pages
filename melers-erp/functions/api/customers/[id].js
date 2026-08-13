// functions/api/customers/[id].js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestGet({ env, params }) {
  const customer = await env.DB.prepare(`SELECT * FROM customers WHERE id = ?`).bind(params.id).first();
  if (!customer) return cors(new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } }));
  const { results } = await env.DB.prepare(`SELECT COUNT(*) as count FROM orders WHERE customer_id = ?`).bind(params.id).all();
  const order_count = results[0]?.count || 0;
  return cors(new Response(JSON.stringify({ customer, order_count }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestPut({ env, params, request }) {
  const body = await request.json();
  await env.DB.prepare(
    `UPDATE customers SET name=?,ytunnus=?,industry=?,contact=?,email=?,phone=?,pricing_type=?,pricing_value=?,contract_notes=? WHERE id=?`
  ).bind(
    body.name, body.ytunnus || '', body.industry || 'Muu',
    body.contact || '', body.email || '', body.phone || '',
    body.pricing_type || 'per_kg', body.pricing_value || 0,
    body.contract_notes || '', params.id
  ).run();
  const customer = await env.DB.prepare(`SELECT * FROM customers WHERE id = ?`).bind(params.id).first();
  return cors(new Response(JSON.stringify({ customer }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
