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
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const DB = env.DB;

  if (request.method === 'GET') {
    const result = await DB.prepare('SELECT * FROM customers ORDER BY id').all();
    return json({ customers: result.results });
  }

  if (request.method === 'POST') {
    const b = await request.json();
    const result = await DB.prepare(
      `INSERT INTO customers (company, ytunnus, industry, contact, title, phone, email, pricing, created_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      b.company || '', b.ytunnus || '', b.industry || 'Muu', b.contact || '',
      b.title || '', b.phone || '', b.email || '', b.pricing || '—',
      b.created_date || new Date().toISOString().split('T')[0], b.notes || ''
    ).run();
    const customer = await DB.prepare('SELECT * FROM customers WHERE id = ?').bind(result.meta.last_row_id).first();
    return json({ customer }, 201);
  }

  return json({ error: 'Method not allowed' }, 405);
}
