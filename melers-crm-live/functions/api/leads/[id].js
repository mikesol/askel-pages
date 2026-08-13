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
      `UPDATE leads SET stage=?, tag=?, company=?, ytunnus=?, contact=?, title=?, phone=?, email=?,
       deal=?, contact_date=?, next_contact=? WHERE id=?`
    ).bind(
      b.stage, b.tag, b.company, b.ytunnus || '', b.contact, b.title || '',
      b.phone || '', b.email || '', b.deal || 0, b.contact_date || '', b.next_contact || '', id
    ).run();
    const lead = await DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first();
    if (!lead) return json({ error: 'Not found' }, 404);
    const log = await DB.prepare('SELECT * FROM lead_logs WHERE lead_id = ? ORDER BY id').bind(id).all();
    return json({ lead: { ...lead, log: log.results.map(r => ({ id: r.id, date: r.date, text: r.text })) } });
  }

  if (request.method === 'DELETE') {
    const today = new Date().toISOString().split('T')[0];
    await DB.prepare('UPDATE leads SET archived=1, archived_date=? WHERE id=?').bind(today, id).run();
    return json({ ok: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}
