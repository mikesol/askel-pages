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

  if (request.method === 'POST') {
    const b = await request.json();
    const date = b.date || new Date().toISOString().split('T')[0];
    const text = (b.text || '').trim();
    if (!text) return json({ error: 'text required' }, 400);
    await DB.prepare('INSERT INTO lead_logs (lead_id, date, text) VALUES (?, ?, ?)').bind(id, date, text).run();
    const log = await DB.prepare('SELECT * FROM lead_logs WHERE lead_id = ? ORDER BY id').bind(id).all();
    return json({ log: log.results.map(r => ({ id: r.id, date: r.date, text: r.text })) }, 201);
  }

  return json({ error: 'Method not allowed' }, 405);
}
