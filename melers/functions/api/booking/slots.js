// ~/askel-pages/melers/functions/api/booking/slots.js

const FI_DAYS = { 2: 'Tiistai', 5: 'Perjantai' };

function getNextSlotDates(n = 8) {
  const slots = [];
  const d = new Date();
  // Use Helsinki time offset (UTC+2 or UTC+3) — approximate with UTC+2
  d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
  d.setDate(d.getDate() + 1); // start from tomorrow
  while (slots.length < n) {
    const day = d.getUTCDay();
    if (day === 2 || day === 5) {
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(d.getUTCDate()).padStart(2, '0');
      slots.push({ date: `${yyyy}-${mm}-${dd}`, fi: FI_DAYS[day] });
    }
    d.setDate(d.getDate() + 1);
  }
  return slots;
}

export async function onRequestGet(context) {
  const { env } = context;

  const slotDates = getNextSlotDates(8);
  const dateList = slotDates.map(s => `'${s.date}'`).join(',');

  const rows = await env.DB.prepare(
    `SELECT slot_date, COUNT(*) as count FROM bookings WHERE slot_date IN (${dateList}) GROUP BY slot_date`
  ).all();

  const countMap = {};
  for (const row of rows.results) {
    countMap[row.slot_date] = row.count;
  }

  const slots = slotDates.map(s => ({
    date: s.date,
    fi: s.fi,
    count: countMap[s.date] || 0,
  }));

  return new Response(JSON.stringify({ slots }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
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
