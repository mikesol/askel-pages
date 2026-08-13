const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export async function onRequest(context) {
  const { request, env, params } = context;
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const DB = env.DB;
  const id = parseInt(params.id);
  if (isNaN(id)) return json({ error: 'Invalid id' }, 400);

  if (request.method === 'PUT') {
    const b = await request.json();
    await DB.prepare(
      `UPDATE customers SET company=?, ytunnus=?, industry=?, contact=?, title=?, phone=?, email=?, pricing=?, created_date=?, notes=? WHERE id=?`
    ).bind(
      b.company, b.ytunnus || '', b.industry || 'Muu', b.contact, b.title || '',
      b.phone || '', b.email || '', b.pricing || '—', b.created_date || '', b.notes || '', id
    ).run();
    const customer = await DB.prepare('SELECT * FROM customers WHERE id = ?').bind(id).first();
    if (!customer) return json({ error: 'Not found' }, 404);
    return json({ customer });
  }

  return json({ error: 'Method not allowed' }, 405);
}
