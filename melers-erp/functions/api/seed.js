// functions/api/seed.js
export async function onRequestPost({ env }) {
  const DB = env.DB;

  // Drop and recreate tables
  await DB.exec(`DROP TABLE IF EXISTS invoices`);
  await DB.exec(`DROP TABLE IF EXISTS order_items`);
  await DB.exec(`DROP TABLE IF EXISTS orders`);
  await DB.exec(`DROP TABLE IF EXISTS customers`);

  await DB.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      ytunnus TEXT,
      industry TEXT DEFAULT 'Muu',
      contact TEXT,
      email TEXT,
      phone TEXT,
      pricing_type TEXT DEFAULT 'per_kg',
      pricing_value REAL DEFAULT 0,
      contract_notes TEXT,
      created_at INTEGER NOT NULL
    )
  `);

  await DB.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL REFERENCES customers(id),
      status TEXT NOT NULL DEFAULT 'received',
      weight_kg REAL DEFAULT 0,
      notes TEXT,
      received_at INTEGER NOT NULL,
      completed_at INTEGER
    )
  `);

  await DB.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id),
      item_type TEXT NOT NULL,
      quantity INTEGER DEFAULT 0
    )
  `);

  await DB.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL REFERENCES customers(id),
      order_id TEXT REFERENCES orders(id),
      amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      issued_at INTEGER NOT NULL,
      due_at INTEGER NOT NULL,
      notes TEXT
    )
  `);

  const now = Date.now();
  const day = 86400000;

  // 5 customers
  const customers = [
    { id: 'c1', name: 'Sokos Hotel Turku', ytunnus: '0123456-7', industry: 'Majoituspalvelut', contact: 'Mia Korhonen', email: 'mia.korhonen@sokos.fi', phone: '040 123 4567', pricing_type: 'per_kg', pricing_value: 2.80, contract_notes: 'Nouto ti + pe, max 200 kg/kerta' },
    { id: 'c2', name: 'Ravintola Auran Aalto', ytunnus: '0234567-8', industry: 'Ravintola-ala', contact: 'Jari Mäkinen', email: 'jari@auranaalto.fi', phone: '044 234 5678', pricing_type: 'per_kg', pricing_value: 3.20, contract_notes: 'Tabliinat + työtakit viikoittain' },
    { id: 'c3', name: 'Turun kaupunki / Vanhuspalvelut', ytunnus: '0204819-8', industry: 'Julkinen sektori', contact: 'Leena Virtanen', email: 'leena.virtanen@turku.fi', phone: '02 330 0000', pricing_type: 'flat', pricing_value: 1200, contract_notes: 'Kiinteä kuukausisopimus, laskutus kk alussa' },
    { id: 'c4', name: 'Attendo Suomi Oy', ytunnus: '0987654-3', industry: 'Terveys & hyvinvointi', contact: 'Satu Leinonen', email: 'satu.leinonen@attendo.fi', phone: '010 321 4321', pricing_type: 'per_kg', pricing_value: 2.50, contract_notes: 'Vuodevaatteet + pyyhkeet, 3x viikko' },
    { id: 'c5', name: 'CleanTeam Palvelut Oy', ytunnus: '1122334-5', industry: 'Kiinteistöpalvelut', contact: 'Timo Salo', email: 'timo@cleanteam.fi', phone: '040 998 7654', pricing_type: 'per_kg', pricing_value: 2.60, contract_notes: 'Siivoustekstiilit, toimitusaika 48h' },
  ];

  for (const c of customers) {
    await DB.prepare(
      `INSERT INTO customers (id,name,ytunnus,industry,contact,email,phone,pricing_type,pricing_value,contract_notes,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(c.id, c.name, c.ytunnus, c.industry, c.contact, c.email, c.phone, c.pricing_type, c.pricing_value, c.contract_notes, now - 30*day).run();
  }

  // 10 orders, 2 per status
  const statuses = ['received', 'washing', 'drying', 'finishing', 'ready'];
  const customerIds = ['c1', 'c2', 'c3', 'c4', 'c5'];
  const orders = [
    { id: 'o1', customer_id: 'c1', status: 'received', weight_kg: 42.5, notes: 'Kiireellinen, hotelligaala huomenna', received_at: now - 2*60*60*1000 },
    { id: 'o2', customer_id: 'c3', status: 'received', weight_kg: 78.0, notes: '', received_at: now - 4*60*60*1000 },
    { id: 'o3', customer_id: 'c2', status: 'washing', weight_kg: 31.2, notes: 'Tabliinat erikseen', received_at: now - 1*day },
    { id: 'o4', customer_id: 'c4', status: 'washing', weight_kg: 95.0, notes: 'Vuodevaatteet 60°', received_at: now - 1*day - 3*60*60*1000 },
    { id: 'o5', customer_id: 'c5', status: 'drying', weight_kg: 28.5, notes: '', received_at: now - 2*day },
    { id: 'o6', customer_id: 'c1', status: 'drying', weight_kg: 56.3, notes: 'Delicate-ohjelma pyykeille', received_at: now - 2*day - 2*60*60*1000 },
    { id: 'o7', customer_id: 'c3', status: 'finishing', weight_kg: 102.0, notes: '', received_at: now - 3*day },
    { id: 'o8', customer_id: 'c2', status: 'finishing', weight_kg: 19.8, notes: 'Taitellaan erikseen', received_at: now - 3*day - 4*60*60*1000 },
    { id: 'o9', customer_id: 'c4', status: 'ready', weight_kg: 88.4, notes: '', received_at: now - 5*day, completed_at: now - 1*day },
    { id: 'o10', customer_id: 'c5', status: 'ready', weight_kg: 33.1, notes: '', received_at: now - 4*day, completed_at: now - 12*60*60*1000 },
  ];

  const itemTypes = ['Liinavaatteet', 'Pyyhkeet', 'Työtakit', 'Verhot', 'Muu'];
  for (const o of orders) {
    await DB.prepare(
      `INSERT INTO orders (id,customer_id,status,weight_kg,notes,received_at,completed_at) VALUES (?,?,?,?,?,?,?)`
    ).bind(o.id, o.customer_id, o.status, o.weight_kg, o.notes || '', o.received_at, o.completed_at || null).run();
    // 2 item types per order
    const types = itemTypes.slice(0, 2).map((t, i) => ({ id: `oi-${o.id}-${i}`, order_id: o.id, item_type: t, quantity: 10 + i * 5 }));
    for (const item of types) {
      await DB.prepare(
        `INSERT INTO order_items (id,order_id,item_type,quantity) VALUES (?,?,?,?)`
      ).bind(item.id, item.order_id, item.item_type, item.quantity).run();
    }
  }

  // 3 invoices
  const invoices = [
    { id: 'inv1', customer_id: 'c1', order_id: null, amount: 548.40, status: 'paid', issued_at: now - 35*day, due_at: now - 5*day, notes: 'Heinäkuu 2026' },
    { id: 'inv2', customer_id: 'c4', order_id: 'o9', amount: 221.00, status: 'sent', issued_at: now - 7*day, due_at: now + 14*day, notes: '' },
    { id: 'inv3', customer_id: 'c2', order_id: 'o8', amount: 63.36, status: 'draft', issued_at: now - 1*day, due_at: now + 21*day, notes: 'Tarkista paino' },
  ];

  for (const inv of invoices) {
    await DB.prepare(
      `INSERT INTO invoices (id,customer_id,order_id,amount,status,issued_at,due_at,notes) VALUES (?,?,?,?,?,?,?,?)`
    ).bind(inv.id, inv.customer_id, inv.order_id, inv.amount, inv.status, inv.issued_at, inv.due_at, inv.notes).run();
  }

  return new Response(JSON.stringify({ ok: true, message: 'Seeded: 5 customers, 10 orders, 3 invoices' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
