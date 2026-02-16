import { config } from 'dotenv';
import { initDatabase } from '../lib/db';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function main() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('✓ Database initialized successfully!');
    console.log('✓ Table "beta_signups" created or already exists');
    process.exit(0);
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    process.exit(1);
  }
}

main();
