import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection('projects').find({}).toArray();
    return NextResponse.json(docs.map(({ _id, ...rest }) => rest));
  } catch {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json();
    const db = await getDb();

    if (!project.id) project.id = Date.now().toString();

    await db.collection('projects').updateOne(
      { id: project.id },
      { $set: project },
      { upsert: true }
    );

    return NextResponse.json({ success: true, project });
  } catch {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });

    const db = await getDb();
    await db.collection('projects').deleteOne({ id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Error deleting project' }, { status: 500 });
  }
}
