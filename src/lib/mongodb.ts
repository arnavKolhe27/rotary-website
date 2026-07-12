import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'rotary_club';

// Module-level cache (production / Vercel serverless)
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Dev hot-reload safety: reuse across HMR boundaries via global
declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export async function getDb(): Promise<Db> {
  // Return cached Db if already connected
  if (cachedDb) return cachedDb;

  if (process.env.NODE_ENV === 'development') {
    // In dev, persist across hot reloads using global
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri);
      await global._mongoClient.connect();
      global._mongoDb = global._mongoClient.db(dbName);
    }
    cachedClient = global._mongoClient;
    cachedDb = global._mongoDb!;
  } else {
    // In production (Vercel), use module-level singleton
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
      cachedDb = cachedClient.db(dbName);
    }
  }

  return cachedDb!;
}
