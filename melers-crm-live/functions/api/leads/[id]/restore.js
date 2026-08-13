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
    await DB.prepare("UPDATE leads SET archived=0, archived_date='' WHERE id=?").bind(id).run();
    const lead = await DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first();
    if (!lead) return json({ error: 'Not found' }, 404);
    const log = await DB.prepare('SELECT * FROM lead_logs WHERE lead_id = ? ORDER BY id').bind(id).all();
    return json({ lead: { ...lead, log: log.results.map(r => ({ id: r.id, date: r.date, text: r.text })) } });
  }

  return json({ error: 'Method not allowed' }, 405);
}
