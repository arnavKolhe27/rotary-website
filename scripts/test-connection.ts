// scripts/test-connection.ts
// Run with: npx tsx scripts/test-connection.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { MongoClient } from 'mongodb';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'rotary_club');
    const result = await db.command({ ping: 1 });
    console.log('✅ MongoDB ping OK:', result);
    console.log('✅ Database:', db.databaseName);
  } catch (err) {
    console.error('❌ Connection failed:', err);
    console.error('\nCommon causes:');
    console.error('  1. Atlas Network Access does not allow 0.0.0.0/0');
    console.error('  2. Wrong username/password in the URI');
    console.error('  3. URI not copied from the "Drivers" option in Atlas Connect dialog');
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
