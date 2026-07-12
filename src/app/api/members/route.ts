import { NextResponse } from 'next/server';
import { getMembers, deleteMember, Member } from '@/lib/db';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const members = await getMembers();
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: 'Failed to load members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const member: Member = await request.json();
    const db = await getDb();

    if (!member.id) member.id = Date.now().toString();

    await db.collection('members').updateOne(
      { id: member.id },
      { $set: member },
      { upsert: true }
    );

    return NextResponse.json({ success: true, member });
  } catch {
    return NextResponse.json({ success: false, message: 'Error saving member' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });

    await deleteMember(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Error deleting member' }, { status: 500 });
  }
}
