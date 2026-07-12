// scripts/migrate-to-db.ts
// Run with: npx tsx scripts/migrate-to-db.ts
// Idempotent — safe to run multiple times; uses upsert keyed on existing IDs.
// JSON files are left untouched as backup.

import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { MongoClient } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_NAME = process.env.MONGODB_DB || 'rotary_club';

function readJson(file: string): any[] | Record<string, any> {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, 'utf-8').trim();
  if (!raw || raw === '') return [];
  return JSON.parse(raw);
}

async function migrateCollection(
  col: any,
  docs: any[],
  keyField: string,
  label: string
) {
  if (!Array.isArray(docs) || docs.length === 0) {
    console.log(`  ${label}: 0 records found, skipping.`);
    return;
  }
  let upserted = 0;
  let unchanged = 0;
  for (const doc of docs) {
    const filter = { [keyField]: doc[keyField] };
    const result = await col.updateOne(filter, { $set: doc }, { upsert: true });
    result.upsertedCount > 0 ? upserted++ : unchanged++;
  }
  console.log(`  ${label}: ${docs.length} total → ${upserted} inserted, ${unchanged} already present.`);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  console.log('✅ Connected to MongoDB\n');

  const db = client.db(DB_NAME);

  // ── Projects ──────────────────────────────────────────────────────────────
  console.log('📦 Migrating projects...');
  const projects = readJson('projects.json') as any[];
  await migrateCollection(db.collection('projects'), projects, 'id', 'projects');

  // ── Members ───────────────────────────────────────────────────────────────
  console.log('👥 Migrating members...');
  const members = readJson('members.json') as any[];
  await migrateCollection(db.collection('members'), members, 'id', 'members');

  // ── Events ────────────────────────────────────────────────────────────────
  console.log('📅 Migrating events...');
  const events = readJson('events.json') as any[];
  await migrateCollection(db.collection('events'), events, 'id', 'events');

  // ── Bulletins ─────────────────────────────────────────────────────────────
  console.log('📰 Migrating bulletins...');
  const bulletins = readJson('bulletins.json') as any[];
  await migrateCollection(db.collection('bulletins'), bulletins, 'id', 'bulletins');

  // ── Donation (single document) ────────────────────────────────────────────
  console.log('💳 Migrating donation settings...');
  const donation = readJson('donation.json') as Record<string, any>;
  if (donation && typeof donation === 'object' && !Array.isArray(donation) && Object.keys(donation).length > 0) {
    await db.collection('donation').updateOne(
      { _type: 'donation' },
      { $set: { _type: 'donation', ...donation } },
      { upsert: true }
    );
    console.log('  donation: 1 document upserted.');
  } else {
    console.log('  donation: empty or not found, skipping.');
  }

  // ── Settings (admin credentials — hash the password) ──────────────────────
  console.log('🔐 Migrating settings (hashing password)...');
  const settings = readJson('settings.json') as Record<string, any>;
  if (settings && typeof settings === 'object' && !Array.isArray(settings) && settings.adminEmail) {
    const rawPassword: string = settings.adminPassword || '';

    // Detect if already a bcrypt hash (starts with $2b$ or $2a$)
    const isAlreadyHashed = /^\$2[ab]\$/.test(rawPassword);
    const hashedPassword = isAlreadyHashed
      ? rawPassword
      : await bcrypt.hash(rawPassword, 12);

    if (!isAlreadyHashed) {
      console.log('  Password was plaintext — hashed with bcrypt (rounds=12).');
    } else {
      console.log('  Password already hashed — stored as-is.');
    }

    await db.collection('settings').updateOne(
      { _type: 'settings' },
      {
        $set: {
          _type: 'settings',
          adminEmail: settings.adminEmail,
          adminPassword: hashedPassword,
        },
      },
      { upsert: true }
    );
    console.log('  settings: 1 document upserted.');
  } else {
    console.log('  settings.json not found or empty — skipping.');
  }

  console.log('\n✅ Migration complete. JSON backup files are untouched in /data/');
  await client.close();
}

main().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
