import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection('boardImages').findOne({ _type: 'boardOfDirectors' });
    if (!doc) return NextResponse.json({ imageUrl: null });
    return NextResponse.json({ imageUrl: doc.imageUrl, uploadedAt: doc.uploadedAt });
  } catch {
    return NextResponse.json({ error: 'Failed to load board image' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate it's an image data URL
    if (!imageBase64.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid format — only image files are accepted.' }, { status: 400 });
    }

    // base64 string length × 0.75 ≈ actual byte size
    const approxBytes = Math.ceil(imageBase64.length * 0.75);
    if (approxBytes > MAX_SIZE_BYTES) {
      const sizeMb = (approxBytes / 1024 / 1024).toFixed(1);
      return NextResponse.json(
        {
          error: `Image is too large (${sizeMb} MB). Maximum allowed size is 5 MB. Please compress or resize the image before uploading.`,
        },
        { status: 413 }
      );
    }

    const db = await getDb();
    await db.collection('boardImages').updateOne(
      { _type: 'boardOfDirectors' },
      { $set: { _type: 'boardOfDirectors', imageUrl: imageBase64, uploadedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save board image' }, { status: 500 });
  }
}
