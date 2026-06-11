// ~/askel-pages/melers/functions/api/form.js
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { nimi, yritys, email, puhelin, viesti, palvelu, toimiala, source } = body;

  if (!viesti && !email) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const subject = source === 'yrityksille'
    ? `[Melers] Tarjouspyyntö — ${yritys || 'Yritys ei annettu'}`
    : `[Melers] Yhteydenotto — ${nimi || 'Nimi ei annettu'}`;

  const html = `
    <h2>${subject}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      ${nimi       ? `<tr><td><b>Nimi</b></td><td>${nimi}</td></tr>` : ''}
      ${yritys     ? `<tr><td><b>Yritys</b></td><td>${yritys}</td></tr>` : ''}
      ${toimiala   ? `<tr><td><b>Toimiala</b></td><td>${toimiala}</td></tr>` : ''}
      ${email      ? `<tr><td><b>Sähköposti</b></td><td>${email}</td></tr>` : ''}
      ${puhelin    ? `<tr><td><b>Puhelin</b></td><td>${puhelin}</td></tr>` : ''}
      ${palvelu    ? `<tr><td><b>Palvelu</b></td><td>${palvelu}</td></tr>` : ''}
      ${viesti     ? `<tr><td><b>Viesti</b></td><td>${viesti}</td></tr>` : ''}
      <tr><td><b>Lähde</b></td><td>${source || 'tuntematon'}</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Melers Lomake <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      reply_to: email || undefined,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Email send failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
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
