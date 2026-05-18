-- ~/askel-pages/melers/schema.sql
CREATE TABLE IF NOT EXISTS bookings (
  id          TEXT    PRIMARY KEY,
  slot_date   TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  address     TEXT    NOT NULL,
  phone       TEXT,
  email       TEXT,
  notes       TEXT,
  source      TEXT    DEFAULT 'web',
  created_at  INTEGER NOT NULL
);
