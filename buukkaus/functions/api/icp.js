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
  const body = await request.json();
  const { company, icp } = body;
  if (!company || !icp) return json({ error: 'company and icp are required' }, 400);

  const docKey = `company:${company}:icp:${icp}`;
  const prevKey = `${docKey}:prev`;

  const existing = await KV.get(docKey);
  if (existing) await KV.put(prevKey, existing);

  const doc = {
    company, icp,
    label: body.label || icp,
    opening: body.opening || '',
    reason: body.reason || '',
    voicemail: body.voicemail || '',
    discoveryQuestions: Array.isArray(body.discoveryQuestions) ? body.discoveryQuestions : [],
    objections: Array.isArray(body.objections) ? body.objections : [],
    bookingAsk: body.bookingAsk || '',
    rules: Array.isArray(body.rules) ? body.rules : [],
    updatedAt: new Date().toISOString(),
  };
  await KV.put(docKey, JSON.stringify(doc));

  const companiesRaw = await KV.get('companies');
  const companies = companiesRaw ? JSON.parse(companiesRaw) : [];
  let companyEntry = companies.find(c => c.slug === company);
  if (!companyEntry) {
    companyEntry = { slug: company, label: body.companyLabel || company, icps: [] };
    companies.push(companyEntry);
  }
  const icpEntry = companyEntry.icps.find(i => i.slug === icp);
  if (!icpEntry) {
    companyEntry.icps.push({ slug: icp, label: doc.label });
  } else {
    icpEntry.label = doc.label;
  }
  await KV.put('companies', JSON.stringify(companies));

  return json({ icp: doc });
}
