import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const bulletins = await db
      .collection('bulletins')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    return NextResponse.json(bulletins.map(({ _id, ...rest }) => rest));
  } catch {
    return NextResponse.json({ error: 'Failed to load bulletins' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const bulletin = await request.json();
    const db = await getDb();

    if (!bulletin.id) bulletin.id = Date.now().toString();
    bulletin.timestamp = Date.now();

    await db.collection('bulletins').insertOne(bulletin);
    return NextResponse.json({ success: true, bulletin });
  } catch {
    return NextResponse.json({ error: 'Failed to save bulletin' }, { status: 500 });
  }
}
