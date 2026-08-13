// functions/api/orders/[id].js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestPut({ env, params, request }) {
  const body = await request.json();
  const completed_at = body.status === 'ready' ? Date.now() : null;
  await env.DB.prepare(
    `UPDATE orders SET status=?,weight_kg=?,notes=?,completed_at=? WHERE id=?`
  ).bind(
    body.status, body.weight_kg ?? null, body.notes ?? '', completed_at, params.id
  ).run();
  const order = await env.DB.prepare(
    `SELECT o.*, c.name as customer_name FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?`
  ).bind(params.id).first();
  const { results: items } = await env.DB.prepare(
    `SELECT item_type, quantity FROM order_items WHERE order_id = ?`
  ).bind(params.id).all();
  order.items = items;
  return cors(new Response(JSON.stringify({ order }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
