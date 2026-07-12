import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection('donation').findOne({ _type: 'donation' });
    if (!doc) {
      return NextResponse.json({
        bankName: '', accountName: '', accountNumber: '', ifscCode: '', qrCodeBase64: '',
      });
    }
    const { _id, _type, ...data } = doc;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to load donation data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();
    await db.collection('donation').updateOne(
      { _type: 'donation' },
      { $set: { _type: 'donation', ...body } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save donation data' }, { status: 500 });
  }
}
