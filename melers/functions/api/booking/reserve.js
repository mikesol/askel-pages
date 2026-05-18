function isValidSlotDate(dateStr) {
  // Must be a Tuesday (day 2) or Friday (day 5)
  const d = new Date(dateStr + 'T12:00:00Z');
  const day = d.getUTCDay();
  return day === 2 || day === 5;
}

const FI_DAYS = { 2: 'tiistai', 5: 'perjantai' };

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { slot_date, nimi, osoite, puhelin, email, lisatiedot } = body;

  if (!slot_date || !nimi || !osoite) {
    return new Response(JSON.stringify({ error: 'slot_date, nimi, and osoite are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  if (!isValidSlotDate(slot_date)) {
    return new Response(JSON.stringify({ error: 'slot_date must be a Tuesday or Friday' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const id = crypto.randomUUID();
  const created_at = Date.now();

  await env.DB.prepare(
    `INSERT INTO bookings (id, slot_date, name, address, phone, email, notes, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, slot_date, nimi, osoite, puhelin || null, email || null, lisatiedot || null, 'web', created_at).run();

  // Format date for emails
  const d = new Date(slot_date + 'T12:00:00Z');
  const dateLabel = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
  const dayFi = FI_DAYS[d.getUTCDay()];

  // Notification to Melers staff
  const staffHtml = `
    <h2>Uusi kuljetusvaraus</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Päivä</b></td><td>${dayFi} ${dateLabel}</td></tr>
      <tr><td><b>Asiakas</b></td><td>${nimi}</td></tr>
      <tr><td><b>Noutoosoite</b></td><td>${osoite}</td></tr>
      ${puhelin  ? `<tr><td><b>Puhelin</b></td><td>${puhelin}</td></tr>` : ''}
      ${email    ? `<tr><td><b>Sähköposti</b></td><td>${email}</td></tr>` : ''}
      ${lisatiedot ? `<tr><td><b>Lisätiedot</b></td><td>${lisatiedot}</td></tr>` : ''}
      <tr><td><b>Varaus-ID</b></td><td>${id}</td></tr>
    </table>
  `;

  const staffPromise = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Melers Varaukset <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      subject: `[Melers] Kuljetusvaraus: ${nimi} — ${dayFi} ${dateLabel}`,
      html: staffHtml,
    }),
  });

  // Confirmation to customer (only if email provided)
  const customerPromises = email ? [
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Melers Pesulapalvelut <noreply@melers.fi>',
        to: [email],
        reply_to: 'myynti@melers.fi',
        subject: `Kuljetusvaraus vahvistettu — ${dayFi} ${dateLabel}`,
        html: `
          <h2>Varauksesi on vahvistettu!</h2>
          <p style="font-family:sans-serif;font-size:15px">Hei ${nimi},</p>
          <p style="font-family:sans-serif;font-size:15px">Kuljetusvarauksesi on vastaanotettu:</p>
          <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
            <tr><td><b>Päivä</b></td><td>${dayFi} ${dateLabel}</td></tr>
            <tr><td><b>Noutoosoite</b></td><td>${osoite}</td></tr>
            ${lisatiedot ? `<tr><td><b>Lisätiedot</b></td><td>${lisatiedot}</td></tr>` : ''}
          </table>
          <p style="font-family:sans-serif;font-size:14px;color:#666">Noutoaika klo 9–15. Otamme yhteyttä tarvittaessa. Kysymyksiä? myynti@melers.fi tai +358 22 331718</p>
        `,
      }),
    })
  ] : [];

  await Promise.all([staffPromise, ...customerPromises]);

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
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
