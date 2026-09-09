CREATE TABLE proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  sales_rep TEXT NOT NULL,
  sales_rep_contact TEXT,
  customer_company TEXT NOT NULL,
  contact_name TEXT,
  contact_info TEXT,
  industry TEXT NOT NULL,
  needs_summary TEXT,
  proposal_date TEXT,
  process_start_date TEXT,
  process_delivery_cycle TEXT,
  process_vuokratekstiilit TEXT,
  process_sorting_need TEXT,
  language TEXT NOT NULL DEFAULT 'fi'
);

CREATE TABLE proposal_line_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proposal_id INTEGER NOT NULL REFERENCES proposals(id),
  description TEXT NOT NULL,
  unit TEXT,
  qty REAL NOT NULL DEFAULT 1,
  unit_price REAL NOT NULL,
  vat_rate REAL NOT NULL,
  is_discounted INTEGER NOT NULL DEFAULT 0,
  original_price REAL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pricing_catalog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  industry TEXT NOT NULL,
  description TEXT NOT NULL,
  unit TEXT NOT NULL,
  min_price REAL NOT NULL,
  max_price REAL NOT NULL,
  default_vat_rate REAL NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE industry_content (
  industry TEXT PRIMARY KEY,
  selling_points_fi TEXT NOT NULL,
  selling_points_en TEXT NOT NULL
);

CREATE INDEX idx_line_items_proposal ON proposal_line_items(proposal_id);
CREATE INDEX idx_catalog_industry ON pricing_catalog(industry);
CREATE INDEX idx_proposals_rep ON proposals(sales_rep);
CREATE INDEX idx_proposals_customer ON proposals(customer_company);
