import { getCalendarEvents, eventsForDate, blockCapacity } from './gcal.js';

const FI_DAYS   = { 0:'Sunnuntai', 1:'Maanantai', 2:'Tiistai', 3:'Keskiviikko', 4:'Torstai', 5:'Perjantai', 6:'Lauantai' };
const FI_PERIOD = { morning: 'aamupäivä', afternoon: 'iltapäivä' };

function helsinkiToday() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Helsinki' }); // "YYYY-MM-DD"
}

// Next N Tue/Fri dates from tomorrow (Helsinki).
function deliveryDates(n = 60) {
  const today = helsinkiToday();
  const dates = [];
  const d = new Date(today + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  while (dates.length < n) {
    const day = d.getUTCDay();
    if (day === 2 || day === 5) dates.push({ date: d.toISOString().slice(0, 10), day });
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return dates;
}

export async function onRequestGet(context) {
  const { env } = context;

  const candidates = deliveryDates(8); // ~4 weeks / 1 month of Tue+Fri
  const first = candidates[0].date;
  const last  = candidates[candidates.length - 1].date;

  let rawEvents = [];
  try {
    rawEvents = await getCalendarEvents(env, `${first}T00:00:00Z`, `${last}T21:00:00Z`);
  } catch (err) {
    console.error('gcal fetch failed:', err.message);
  }

  const slots = [];
  for (const { date, day } of candidates) {
    const dayEvents = eventsForDate(rawEvents, date);
    for (const period of ['morning', 'afternoon']) {
      if (blockCapacity(period, dayEvents) > 0) {
        slots.push({ date, period, fi: FI_DAYS[day], fiPeriod: FI_PERIOD[period] });
      }
    }
  }

  return new Response(JSON.stringify({ slots }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
