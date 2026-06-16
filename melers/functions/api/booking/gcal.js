async function getAccessToken(env) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('gcal token error: ' + JSON.stringify(data));
  return data.access_token;
}

export async function getCalendarEvents(env, timeMin, timeMax) {
  const token = await getAccessToken(env);
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );
  url.searchParams.set('timeMin', timeMin);
  url.searchParams.set('timeMax', timeMax);
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  if (data.error) throw new Error('gcal events error: ' + JSON.stringify(data.error));
  return data.items || [];
}

// --- Capacity helpers ---

// 30-min chunk starts in minutes from midnight (07:00–16:00)
const CHUNKS = {
  morning:   [420, 450, 480, 510, 540, 570, 600, 630, 660, 690], // 07:00–11:30
  afternoon: [720, 750, 780, 810, 840, 870, 900, 930],            // 12:00–15:30
};

// Extract local HH:MM minutes from a dateTime string like "2026-05-26T09:00:00+03:00"
// The time portion IS the local Helsinki time (offset already embedded by Google).
function localMinutes(dateTimeStr) {
  const m = dateTimeStr.match(/T(\d{2}):(\d{2})/);
  return m ? parseInt(m[1]) * 60 + parseInt(m[2]) : null;
}

function localDate(dateTimeStr) {
  const m = dateTimeStr.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

// Convert raw Google Calendar events to {start, end} minute pairs for a specific date,
// filtered to overlap with 07:00–16:00 (420–960 min).
export function eventsForDate(rawEvents, date) {
  return rawEvents
    .filter(e => e.start?.dateTime && e.end?.dateTime)
    .map(e => {
      if (localDate(e.start.dateTime) !== date) return null;
      const start = localMinutes(e.start.dateTime);
      const end   = localMinutes(e.end.dateTime);
      if (start === null || end === null) return null;
      return { start, end };
    })
    .filter(Boolean)
    .filter(e => e.start < 960 && e.end > 420); // any overlap with 07:00–16:00
}

function chunkCapacity(chunkStart, dateEvents) {
  const chunkEnd = chunkStart + 30;
  const overlapping = dateEvents.filter(e => e.start < chunkEnd && e.end > chunkStart);
  if (overlapping.some(e => (e.end - e.start) > 60)) return 0; // >1hr event blocks chunk
  return Math.max(0, 3 - overlapping.length);
}

// Total remaining capacity for a morning/afternoon block.
export function blockCapacity(period, dateEvents) {
  return CHUNKS[period].reduce((sum, c) => sum + chunkCapacity(c, dateEvents), 0);
}

// Returns start-time in minutes of the chunk with the most remaining capacity, or null.
export function findBestChunk(period, dateEvents) {
  let best = null, bestCap = 0;
  for (const chunkStart of CHUNKS[period]) {
    const cap = chunkCapacity(chunkStart, dateEvents);
    if (cap > bestCap) { bestCap = cap; best = chunkStart; }
  }
  return best;
}

function fmtMin(min) {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

export async function createCalendarEvent(env, { slot_date, slot_chunk_minutes, nimi, osoite, puhelin, email, lisatiedot, id }) {
  const token = await getAccessToken(env);
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';

  const description = [
    `Osoite: ${osoite}`,
    puhelin    ? `Puhelin: ${puhelin}`      : null,
    email      ? `Sähköposti: ${email}`      : null,
    lisatiedot ? `Lisätiedot: ${lisatiedot}` : null,
    `Varaus-ID: ${id}`,
  ].filter(Boolean).join('\n');

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: `Nouto: ${nimi}`,
        location: osoite,
        description,
        start: { dateTime: `${slot_date}T${fmtMin(slot_chunk_minutes)}:00`, timeZone: 'Europe/Helsinki' },
        end:   { dateTime: `${slot_date}T${fmtMin(slot_chunk_minutes + 30)}:00`, timeZone: 'Europe/Helsinki' },
      }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error('gcal create error: ' + JSON.stringify(data.error));
  return data;
}
