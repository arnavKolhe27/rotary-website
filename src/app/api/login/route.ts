import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = await getDb();
    const settings = await db.collection('settings').findOne({ _type: 'settings' });

    if (!settings) {
      return NextResponse.json({ success: false, message: 'Settings not configured' }, { status: 500 });
    }

    if (email !== settings.adminEmail) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, settings.adminPassword);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true, token: 'admin-auth-token-123' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
