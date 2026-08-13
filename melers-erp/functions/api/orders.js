// functions/api/orders.js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

async function getOrdersWithDetails(DB, whereClauses, bindings) {
  const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
  const { results: orders } = await DB.prepare(
    `SELECT o.*, c.name as customer_name FROM orders o
     JOIN customers c ON o.customer_id = c.id
     ${where}
     ORDER BY o.received_at DESC`
  ).bind(...bindings).all();

  for (const order of orders) {
    const { results: items } = await DB.prepare(
      `SELECT item_type, quantity FROM order_items WHERE order_id = ?`
    ).bind(order.id).all();
    order.items = items;
  }
  return orders;
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const customer_id = url.searchParams.get('customer_id');

  const clauses = [];
  const bindings = [];
  if (status) { clauses.push('o.status = ?'); bindings.push(status); }
  if (customer_id) { clauses.push('o.customer_id = ?'); bindings.push(customer_id); }

  const orders = await getOrdersWithDetails(env.DB, clauses, bindings);
  return cors(new Response(JSON.stringify({ orders }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestPost({ env, request }) {
  const body = await request.json();
  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO orders (id,customer_id,status,weight_kg,notes,received_at) VALUES (?,?,?,?,?,?)`
  ).bind(id, body.customer_id, 'received', body.weight_kg || 0, body.notes || '', now).run();

  if (body.items && Array.isArray(body.items)) {
    for (const item of body.items) {
      await env.DB.prepare(
        `INSERT INTO order_items (id,order_id,item_type,quantity) VALUES (?,?,?,?)`
      ).bind(crypto.randomUUID(), id, item.item_type, item.quantity || 0).run();
    }
  }

  const orders = await getOrdersWithDetails(env.DB, ['o.id = ?'], [id]);
  return cors(new Response(JSON.stringify({ order: orders[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
