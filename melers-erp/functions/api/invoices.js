// functions/api/invoices.js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestGet({ env }) {
  const { results: invoices } = await env.DB.prepare(
    `SELECT i.*, c.name as customer_name FROM invoices i
     JOIN customers c ON i.customer_id = c.id
     ORDER BY i.issued_at DESC`
  ).all();
  const totals = await env.DB.prepare(
    `SELECT
       SUM(amount) as total_invoiced,
       SUM(CASE WHEN status='paid' THEN amount ELSE 0 END) as total_paid,
       SUM(CASE WHEN status!='paid' THEN amount ELSE 0 END) as outstanding
     FROM invoices`
  ).first();
  return cors(new Response(JSON.stringify({ invoices, summary: totals }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestPost({ env, request }) {
  const body = await request.json();
  const id = crypto.randomUUID();
  const now = Date.now();
  const due_at = now + 21 * 86400000;
  await env.DB.prepare(
    `INSERT INTO invoices (id,customer_id,order_id,amount,status,issued_at,due_at,notes) VALUES (?,?,?,?,?,?,?,?)`
  ).bind(id, body.customer_id, body.order_id || null, body.amount, 'draft', now, due_at, body.notes || '').run();

  if (body.order_id) {
    await env.DB.prepare(`UPDATE orders SET status='invoiced' WHERE id=?`).bind(body.order_id).run();
  }

  const invoice = await env.DB.prepare(
    `SELECT i.*, c.name as customer_name FROM invoices i JOIN customers c ON i.customer_id = c.id WHERE i.id=?`
  ).bind(id).first();
  return cors(new Response(JSON.stringify({ invoice }), { status: 201, headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
