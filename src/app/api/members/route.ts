import { NextResponse } from 'next/server';
import { getMembers, saveMembers, Member } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const member: Member = await request.json();
    const members = getMembers();
    
    if (!member.id) {
      member.id = Date.now().toString();
      members.push(member);
    } else {
      const idx = members.findIndex(m => m.id === member.id);
      if (idx !== -1) {
        members[idx] = member;
      } else {
        members.push(member);
      }
    }
    
    saveMembers(members);
    
    return NextResponse.json({ success: true, member });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving member" }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(getMembers());
  } catch (error) {
    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });
    
    let members = getMembers();
    members = members.filter(m => m.id !== id);
    saveMembers(members);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting member" }, { status: 500 });
  }
}
