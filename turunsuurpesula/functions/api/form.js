// turunsuurpesula/functions/api/form.js
// Contact/quote forms on turunsuurpesula.fi -> Resend -> myynti@melers.fi
// Sends from noreply@melers.fi because turunsuurpesula.fi is not a verified
// Resend sending domain (see followup to verify it).

const FIELDS = [
  ['nimi', 'Nimi'],
  ['yritys', 'Yritys'],
  ['toimiala', 'Toimiala'],
  ['email', 'Sähköposti'],
  ['puhelin', 'Puhelin'],
  ['viesti', 'Viesti'],
]

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!body.email && !body.puhelin) {
    return json({ error: 'Missing required fields' }, 400)
  }

  const subject = `[Turun Suurpesula] Tarjouspyyntö — ${body.yritys || body.nimi || 'Nimi ei annettu'}`

  const rows = FIELDS.filter(([k]) => body[k])
    .map(([k, label]) => `<tr><td><b>${label}</b></td><td>${esc(body[k])}</td></tr>`)
    .join('')

  const html = `
    <h2>${esc(subject)}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      ${rows}
      <tr><td><b>Lähde</b></td><td>turunsuurpesula.fi${esc(body.source || '')}</td></tr>
    </table>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Turun Suurpesula <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      reply_to: body.email || undefined,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    console.error('Resend error:', await res.text())
    return json({ error: 'Email send failed' }, 500)
  }

  return json({ ok: true }, 200)
}
