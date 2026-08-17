// functions/api/contact.js — Cloudflare Pages Function
// Receives form submissions from turunsuurpesula.fi and emails myynti@melers.fi via Resend

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { nimi, yritys, toimiala, email, puhelin, viesti, tekstiilit, maara, source } = body;

  if (!puhelin && !email) {
    return json({ error: 'Puhelin tai sähköposti vaaditaan' }, 400);
  }

  const subject = source === 'hatapesut'
    ? `[TSP] Hätäpesu-tarjouspyyntö — ${nimi || 'Nimi ei annettu'}`
    : `[TSP] Tarjouspyyntö — ${yritys || nimi || 'Tuntematon'}`;

  const html = `
    <h2 style="font-family:sans-serif">${subject}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${nimi       ? `<tr><td><b>Nimi</b></td><td>${esc(nimi)}</td></tr>` : ''}
      ${yritys     ? `<tr><td><b>Yritys</b></td><td>${esc(yritys)}</td></tr>` : ''}
      ${toimiala   ? `<tr><td><b>Toimiala</b></td><td>${esc(toimiala)}</td></tr>` : ''}
      ${email      ? `<tr><td><b>Sähköposti</b></td><td>${esc(email)}</td></tr>` : ''}
      ${puhelin    ? `<tr><td><b>Puhelin</b></td><td>${esc(puhelin)}</td></tr>` : ''}
      ${tekstiilit && tekstiilit.length ? `<tr><td><b>Tekstiilit</b></td><td>${tekstiilit.map(esc).join(', ')}</td></tr>` : ''}
      ${maara      ? `<tr><td><b>Määrä</b></td><td>${esc(maara)}</td></tr>` : ''}
      ${viesti     ? `<tr><td><b>Viesti</b></td><td style="white-space:pre-wrap">${esc(viesti)}</td></tr>` : ''}
      <tr><td><b>Lähde</b></td><td>${esc(source || 'tuntematon')}</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Turun Suurpesula <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      reply_to: email || undefined,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return json({ error: 'Lähetys epäonnistui' }, 500);
  }

  return json({ ok: true }, 200);
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

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
