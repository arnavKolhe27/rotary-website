import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
    const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

    if (email === settingsData.adminEmail && password === settingsData.adminPassword) {
      // Very basic auth, suitable for this zero-maintenance spec
      return NextResponse.json({ success: true, token: "admin-auth-token-123" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
