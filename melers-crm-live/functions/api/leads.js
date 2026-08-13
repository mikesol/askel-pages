const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

async function getLeadsWithLogs(DB) {
  const leadsResult = await DB.prepare('SELECT * FROM leads ORDER BY id').all();
  const logsResult = await DB.prepare('SELECT * FROM lead_logs ORDER BY id').all();
  const logsByLead = {};
  for (const log of logsResult.results) {
    if (!logsByLead[log.lead_id]) logsByLead[log.lead_id] = [];
    logsByLead[log.lead_id].push({ id: log.id, date: log.date, text: log.text });
  }
  const leads = [], archived = [];
  for (const l of leadsResult.results) {
    const lead = { ...l, log: logsByLead[l.id] || [] };
    if (l.archived) archived.push(lead);
    else leads.push(lead);
  }
  return { leads, archived };
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const DB = env.DB;

  if (request.method === 'GET') {
    const data = await getLeadsWithLogs(DB);
    return json(data);
  }

  if (request.method === 'POST') {
    const b = await request.json();
    const result = await DB.prepare(
      `INSERT INTO leads (stage, tag, company, ytunnus, contact, title, phone, email, deal, contact_date, next_contact)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      b.stage || 'liidi', b.tag || 'UUSI asiakas', b.company || '', b.ytunnus || '',
      b.contact || '', b.title || '', b.phone || '', b.email || '',
      b.deal || 0, b.contact_date || '', b.next_contact || ''
    ).run();
    const lead = await DB.prepare('SELECT * FROM leads WHERE id = ?').bind(result.meta.last_row_id).first();
    if (b.log && b.log.length) {
      for (const entry of b.log) {
        await DB.prepare('INSERT INTO lead_logs (lead_id, date, text) VALUES (?, ?, ?)')
          .bind(lead.id, entry.date, entry.text).run();
      }
    }
    const log = await DB.prepare('SELECT * FROM lead_logs WHERE lead_id = ? ORDER BY id').bind(lead.id).all();
    return json({ lead: { ...lead, log: log.results.map(r => ({ id: r.id, date: r.date, text: r.text })) } }, 201);
  }

  return json({ error: 'Method not allowed' }, 405);
}
