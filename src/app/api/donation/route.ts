import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'donation.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ bankName: "", accountName: "", accountNumber: "", ifscCode: "", qrCodeBase64: "" });
    }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load donation data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'donation.json');
    fs.writeFileSync(dataPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save donation data" }, { status: 500 });
  }
}
