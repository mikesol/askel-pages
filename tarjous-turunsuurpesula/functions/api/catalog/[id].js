const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env, params } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const id = params.id;

  if (request.method === 'PUT') {
    const body = await request.json();
    await env.DB.prepare(
      'UPDATE pricing_catalog SET industry=?, description=?, unit=?, min_price=?, max_price=?, default_vat_rate=?, sort_order=? WHERE id=?'
    ).bind(body.industry, body.description, body.unit, body.min_price || 0, body.max_price || 0, body.default_vat_rate ?? 25.5, body.sort_order || 0, id).run();
    return json({ ok: true });
  }

  if (request.method === 'DELETE') {
    await env.DB.prepare('DELETE FROM pricing_catalog WHERE id=?').bind(id).run();
    return json({ ok: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}
