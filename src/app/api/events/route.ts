import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const upcomingOnly = searchParams.get('upcoming') === 'true';

    const db = await getDb();
    const query: Record<string, unknown> = {};

    if (upcomingOnly) {
      // date field is stored as 'YYYY-MM-DD' string (from <input type="date">)
      const today = new Date().toISOString().split('T')[0];
      query.date = { $gte: today };
    }

    const events = await db
      .collection('events')
      .find(query)
      .sort({ date: upcomingOnly ? 1 : -1 })
      .toArray();

    return NextResponse.json(events.map(({ _id, ...rest }) => rest));
  } catch {
    return NextResponse.json({ error: 'Failed to load events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const event = await request.json();
    const db = await getDb();

    if (!event.id) event.id = Date.now().toString();

    await db.collection('events').insertOne(event);
    return NextResponse.json({ success: true, event });
  } catch {
    return NextResponse.json({ error: 'Failed to save event' }, { status: 500 });
  }
}
