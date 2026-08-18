const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const KV = env.BUUKKAUS;
  const { company, icp } = await request.json();
  if (!company || !icp) return json({ error: 'company and icp are required' }, 400);

  const docKey = `company:${company}:icp:${icp}`;
  const prevKey = `${docKey}:prev`;
  const prevRaw = await KV.get(prevKey);
  if (!prevRaw) return json({ error: 'No previous version to revert to' }, 404);

  await KV.put(docKey, prevRaw);
  return json({ icp: JSON.parse(prevRaw) });
}
