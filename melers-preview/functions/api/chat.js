export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { nimi, email, viesti, source } = body;

  if (!viesti) {
    return new Response(JSON.stringify({ error: 'viesti required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const html = `
    <h2>[Melers] Chat-viesti</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      ${nimi    ? `<tr><td><b>Nimi</b></td><td>${nimi}</td></tr>` : ''}
      ${email   ? `<tr><td><b>Sähköposti</b></td><td>${email}</td></tr>` : ''}
      <tr><td><b>Viesti</b></td><td>${viesti}</td></tr>
      <tr><td><b>Sivu</b></td><td>${source || 'tuntematon'}</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Melers Chat <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      reply_to: email || undefined,
      subject: `[Melers] Chat: ${nimi || 'Anonyymi'} — ${viesti.slice(0, 60)}`,
      html,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
