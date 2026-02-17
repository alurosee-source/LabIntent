import { neon } from '@neondatabase/serverless';

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(process.env.DATABASE_URL);
}

export async function initDatabase() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS beta_signups (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      game VARCHAR(50) NOT NULL,
      rank VARCHAR(100) NOT NULL,
      telegram VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Add telegram column if table exists without it
  try {
    await sql`
      ALTER TABLE beta_signups
      ADD COLUMN IF NOT EXISTS telegram VARCHAR(100) NOT NULL DEFAULT ''
    `;
  } catch (e) {
    // Column might already exist or other error - safe to ignore for IF NOT EXISTS
  }

  await sql`
    CREATE TABLE IF NOT EXISTS test_results (
      id SERIAL PRIMARY KEY,
      nickname TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      avg_reaction_ms INTEGER,
      missed_targets INTEGER,
      false_clicks INTEGER,
      score INTEGER,
      sleep_hours INTEGER,
      stress INTEGER,
      motivation INTEGER
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS coach_applications (
      id SERIAL PRIMARY KEY,
      name TEXT,
      team_name TEXT,
      contact TEXT,
      team_size TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  return true;
}
