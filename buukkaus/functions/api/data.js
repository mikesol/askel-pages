const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  const KV = env.BUUKKAUS;
  const companiesRaw = await KV.get('companies');
  const companies = companiesRaw ? JSON.parse(companiesRaw) : [];

  const icps = {};
  for (const company of companies) {
    for (const icp of company.icps) {
      const raw = await KV.get(`company:${company.slug}:icp:${icp.slug}`);
      if (raw) icps[`${company.slug}:${icp.slug}`] = JSON.parse(raw);
    }
  }

  return json({ companies, icps });
}
