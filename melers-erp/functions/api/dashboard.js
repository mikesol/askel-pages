// functions/api/dashboard.js
function cors(resp) {
  resp.headers.set('Access-Control-Allow-Origin', '*');
  return resp;
}

export async function onRequestGet({ env }) {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const t = todayStart.getTime();

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const m = monthStart.getTime();

  const [orders_today, kg_today, revenue_mtd, overdue_invoices] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) as n FROM orders WHERE received_at >= ?`).bind(t).first(),
    env.DB.prepare(`SELECT SUM(weight_kg) as kg FROM orders WHERE completed_at >= ?`).bind(t).first(),
    env.DB.prepare(`SELECT SUM(amount) as rev FROM invoices WHERE status='paid' AND issued_at >= ?`).bind(m).first(),
    env.DB.prepare(`SELECT COUNT(*) as n FROM invoices WHERE status!='paid' AND due_at < ?`).bind(now).first(),
  ]);

  const { results: recent_orders } = await env.DB.prepare(
    `SELECT o.*, c.name as customer_name FROM orders o JOIN customers c ON o.customer_id = c.id ORDER BY o.received_at DESC LIMIT 10`
  ).all();

  return cors(new Response(JSON.stringify({
    orders_today: orders_today?.n || 0,
    kg_today: kg_today?.kg || 0,
    revenue_mtd: revenue_mtd?.rev || 0,
    overdue_invoices: overdue_invoices?.n || 0,
    recent_orders,
  }), { headers: { 'Content-Type': 'application/json' } }));
}
