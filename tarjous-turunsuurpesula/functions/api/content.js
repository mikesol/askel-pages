const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: CORS }); }

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  const { results } = await env.DB.prepare('SELECT industry, selling_points_fi, selling_points_en FROM industry_content').all();
  return json({ rows: results });
}
