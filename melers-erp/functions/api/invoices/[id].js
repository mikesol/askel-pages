// functions/api/invoices/[id].js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestPut({ env, params, request }) {
  const body = await request.json();
  await env.DB.prepare(`UPDATE invoices SET status=? WHERE id=?`).bind(body.status, params.id).run();
  const invoice = await env.DB.prepare(
    `SELECT i.*, c.name as customer_name FROM invoices i JOIN customers c ON i.customer_id = c.id WHERE i.id=?`
  ).bind(params.id).first();
  return cors(new Response(JSON.stringify({ invoice }), { headers: { 'Content-Type': 'application/json' } }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
