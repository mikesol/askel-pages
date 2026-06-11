import { getCalendarEvents, eventsForDate, findBestChunk, createCalendarEvent } from './gcal.js';

const FI_DAYS   = { 2: 'tiistai', 5: 'perjantai' };
const FI_PERIOD = { morning: 'aamupäivä', afternoon: 'iltapäivä' };
const PERIOD_TIME = { morning: 'klo 7–12', afternoon: 'klo 12–16' };

function helsinkiToday() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Helsinki' });
}

function isValidSlotDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.getUTCDay() === 2 || d.getUTCDay() === 5;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const { slot_date, slot_period, nimi, osoite, puhelin, email, lisatiedot } = body;

  if (!slot_date || !slot_period || !nimi || !osoite)
    return json({ error: 'slot_date, slot_period, nimi, and osoite are required' }, 400);

  if (!['morning', 'afternoon'].includes(slot_period))
    return json({ error: 'slot_period must be morning or afternoon' }, 400);

  if (!isValidSlotDate(slot_date))
    return json({ error: 'slot_date must be a Tuesday or Friday' }, 400);

  // 23:59 cutoff — bookings only accepted for future dates (not today)
  if (slot_date <= helsinkiToday())
    return json({ error: 'Bookings must be made by 23:59 the day before' }, 400);

  // Re-check live calendar capacity (prevents race conditions and stale client data)
  let rawEvents = [];
  try {
    rawEvents = await getCalendarEvents(env, `${slot_date}T00:00:00Z`, `${slot_date}T21:00:00Z`);
  } catch (err) {
    console.error('gcal fetch failed:', err.message);
  }
  const dayEvents = eventsForDate(rawEvents, slot_date);
  const bestChunk = findBestChunk(slot_period, dayEvents);

  if (bestChunk === null)
    return json({ error: 'No capacity available for this slot' }, 409);

  const id = crypto.randomUUID();
  const created_at = Date.now();

  await env.DB.prepare(
    `INSERT INTO bookings (id, slot_date, slot_period, name, address, phone, email, notes, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, slot_date, slot_period, nimi, osoite, puhelin || null, email || null, lisatiedot || null, 'web', created_at).run();

  // Format date labels for emails
  const d = new Date(slot_date + 'T12:00:00Z');
  const dateLabel = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
  const dayFi     = FI_DAYS[d.getUTCDay()];
  const periodFi  = FI_PERIOD[slot_period];
  const periodTime = PERIOD_TIME[slot_period];

  const staffHtml = `
    <h2>Uusi kuljetusvaraus</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Päivä</b></td><td>${dayFi} ${dateLabel} — ${periodFi} (${periodTime})</td></tr>
      <tr><td><b>Asiakas</b></td><td>${nimi}</td></tr>
      <tr><td><b>Noutoosoite</b></td><td>${osoite}</td></tr>
      ${puhelin    ? `<tr><td><b>Puhelin</b></td><td>${puhelin}</td></tr>` : ''}
      ${email      ? `<tr><td><b>Sähköposti</b></td><td>${email}</td></tr>` : ''}
      ${lisatiedot ? `<tr><td><b>Lisätiedot</b></td><td>${lisatiedot}</td></tr>` : ''}
      <tr><td><b>Varaus-ID</b></td><td>${id}</td></tr>
    </table>
  `;

  const staffPromise = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Melers Varaukset <noreply@melers.fi>',
      to: ['myynti@melers.fi'],
      subject: `[Melers] Kuljetusvaraus: ${nimi} — ${dayFi} ${dateLabel} ${periodFi}`,
      html: staffHtml,
    }),
  });

  const customerPromises = email ? [
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Melers Pesulapalvelut <noreply@melers.fi>',
        to: [email],
        reply_to: 'myynti@melers.fi',
        subject: `Kuljetusvaraus vahvistettu — ${dayFi} ${dateLabel} ${periodFi}`,
        html: `
          <h2>Varauksesi on vahvistettu!</h2>
          <p style="font-family:sans-serif;font-size:15px">Hei ${nimi},</p>
          <p style="font-family:sans-serif;font-size:15px">Kuljetusvarauksesi on vastaanotettu:</p>
          <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
            <tr><td><b>Päivä</b></td><td>${dayFi} ${dateLabel}</td></tr>
            <tr><td><b>Aika</b></td><td>${periodFi} ${periodTime}</td></tr>
            <tr><td><b>Noutoosoite</b></td><td>${osoite}</td></tr>
            ${lisatiedot ? `<tr><td><b>Lisätiedot</b></td><td>${lisatiedot}</td></tr>` : ''}
          </table>
          <p style="font-family:sans-serif;font-size:14px;color:#666">Kysymyksiä? myynti@melers.fi tai +358 22 331718</p>
        `,
      }),
    })
  ] : [];

  const calendarPromise = createCalendarEvent(env, { slot_date, slot_chunk_minutes: bestChunk, nimi, osoite, puhelin, email, lisatiedot, id })
    .catch(err => console.error('gcal create failed:', err.message));

  await Promise.all([staffPromise, ...customerPromises, calendarPromise]);

  return json({ ok: true, id });
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

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
