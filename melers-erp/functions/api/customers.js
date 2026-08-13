// functions/api/customers.js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM customers ORDER BY name ASC`
  ).all();
  return cors(new Response(JSON.stringify({ customers: results }), {
    headers: { 'Content-Type': 'application/json' }
  }));
}

export async function onRequestPost({ env, request }) {
  const body = await request.json();
  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO customers (id,name,ytunnus,industry,contact,email,phone,pricing_type,pricing_value,contract_notes,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id, body.name, body.ytunnus || '', body.industry || 'Muu',
    body.contact || '', body.email || '', body.phone || '',
    body.pricing_type || 'per_kg', body.pricing_value || 0,
    body.contract_notes || '', now
  ).run();
  const customer = await env.DB.prepare(`SELECT * FROM customers WHERE id = ?`).bind(id).first();
  return cors(new Response(JSON.stringify({ customer }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
