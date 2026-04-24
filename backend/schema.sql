-- ContentFlow PostgreSQL Schema
-- Run: psql $DATABASE_URL -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Users ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'creator' CHECK (role IN ('creator', 'admin')),
  tier          TEXT NOT NULL DEFAULT 'starter' CHECK (tier IN ('starter', 'growth', 'premium')),
  bio           TEXT,
  website       TEXT,
  avatar_url    TEXT,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Brand settings ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS brand_settings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  channel_name    TEXT,
  niche           TEXT,
  tone_of_voice   TEXT,
  platforms       TEXT[],
  primary_color       TEXT DEFAULT '#2563EB',
  secondary_color     TEXT DEFAULT '#EC4899',
  brand_profile_data  JSONB,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

-- ── Content items ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS content_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('script', 'caption', 'email', 'idea', 'thumbnail')),
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  platform    TEXT,
  status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'scheduled', 'published')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_user ON content_items(user_id);
CREATE INDEX IF NOT EXISTS idx_content_status ON content_items(status);

-- ── Approvals log ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS approvals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id  UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  reviewed_by UUID REFERENCES users(id),
  action      TEXT NOT NULL CHECK (action IN ('approved', 'rejected')),
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Partnerships ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partnerships (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_name   TEXT NOT NULL,
  category     TEXT,
  stage        TEXT NOT NULL DEFAULT 'identified' CHECK (stage IN ('identified', 'contacted', 'negotiating', 'closed')),
  value_eur    NUMERIC(10, 2),
  deal_type    TEXT,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Invoices ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS invoices (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_invoice_id   TEXT UNIQUE,
  amount_eur          NUMERIC(10, 2) NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  invoice_url         TEXT,
  period_start        TIMESTAMPTZ,
  period_end          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Notification preferences ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notification_prefs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  edit_complete    BOOLEAN NOT NULL DEFAULT TRUE,
  approval         BOOLEAN NOT NULL DEFAULT TRUE,
  partnership      BOOLEAN NOT NULL DEFAULT TRUE,
  publish          BOOLEAN NOT NULL DEFAULT FALSE,
  analytics        BOOLEAN NOT NULL DEFAULT TRUE,
  billing          BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (user_id)
);

-- ── API Keys ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS api_keys (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  key_hash   TEXT NOT NULL,
  prefix     TEXT NOT NULL,
  last_used  TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── updated_at trigger ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$ DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['users','brand_settings','content_items','partnerships']
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS trg_updated_at ON %I;
      CREATE TRIGGER trg_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    ', tbl, tbl);
  END LOOP;
END $$;

-- ── Team Dashboard ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS team_dashboard (
  user_id    UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data       JSONB        NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_dashboard_user_id ON team_dashboard(user_id);
