import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { newEmail, newPassword } = await request.json();
    const db = await getDb();

    // Always hash before storing — never save plaintext
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db.collection('settings').updateOne(
      { _type: 'settings' },
      { $set: { _type: 'settings', adminEmail: newEmail, adminPassword: hashedPassword } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Error updating settings' }, { status: 500 });
  }
}
