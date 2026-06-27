import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { newEmail, newPassword } = await request.json();
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
    
    const newSettings = {
      adminEmail: newEmail,
      adminPassword: newPassword
    };
    
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating settings" }, { status: 500 });
  }
}
