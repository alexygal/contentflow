CREATE TABLE IF NOT EXISTS team_dashboard (
  user_id    UUID PRIMARY KEY,
  data       JSONB        NOT NULL,
  updated_at TIMESTAMP    NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
