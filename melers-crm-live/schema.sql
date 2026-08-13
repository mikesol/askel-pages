CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stage TEXT NOT NULL DEFAULT 'liidi',
  tag TEXT NOT NULL DEFAULT 'UUSI asiakas',
  company TEXT NOT NULL,
  ytunnus TEXT DEFAULT '',
  contact TEXT NOT NULL DEFAULT '',
  title TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  deal INTEGER DEFAULT 0,
  contact_date TEXT DEFAULT '',
  next_contact TEXT DEFAULT '',
  archived INTEGER DEFAULT 0,
  archived_date TEXT DEFAULT '',
  created_at TEXT DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS lead_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT NOT NULL,
  ytunnus TEXT DEFAULT '',
  industry TEXT DEFAULT 'Muu',
  contact TEXT NOT NULL DEFAULT '',
  title TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  pricing TEXT DEFAULT '—',
  created_date TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TEXT DEFAULT (date('now'))
);
