import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'events.json');
    if (!fs.existsSync(dataPath)) return NextResponse.json([]);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const event = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'events.json');
    
    let events = [];
    if (fs.existsSync(dataPath)) {
      events = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }

    if (!event.id) event.id = Date.now().toString();
    
    events.push(event);

    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2), 'utf-8');
    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save event" }, { status: 500 });
  }
}
