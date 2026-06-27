import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'bulletins.json');
    if (!fs.existsSync(dataPath)) return NextResponse.json([]);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    // Sort by timestamp descending
    data.sort((a: any, b: any) => b.timestamp - a.timestamp);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load bulletins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const bulletin = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'bulletins.json');
    
    let bulletins = [];
    if (fs.existsSync(dataPath)) {
      bulletins = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }

    if (!bulletin.id) bulletin.id = Date.now().toString();
    bulletin.timestamp = Date.now();
    
    bulletins.push(bulletin);

    fs.writeFileSync(dataPath, JSON.stringify(bulletins, null, 2), 'utf-8');
    return NextResponse.json({ success: true, bulletin });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save bulletin" }, { status: 500 });
  }
}
