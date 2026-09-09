const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env, params } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'PUT') return json({ error: 'Method not allowed' }, 405);

  const industry = params.industry;
  const body = await request.json();
  await env.DB.prepare(
    `INSERT INTO industry_content (industry, selling_points_fi, selling_points_en) VALUES (?, ?, ?)
     ON CONFLICT(industry) DO UPDATE SET selling_points_fi = excluded.selling_points_fi, selling_points_en = excluded.selling_points_en`
  ).bind(industry, body.selling_points_fi || '', body.selling_points_en || '').run();
  return json({ ok: true });
}
