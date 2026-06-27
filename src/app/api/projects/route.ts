import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'projects.json');
    if (!fs.existsSync(dataPath)) return NextResponse.json([]);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'projects.json');
    
    let projects = [];
    if (fs.existsSync(dataPath)) {
      projects = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }

    if (!project.id) {
      project.id = Date.now().toString();
      projects.push(project);
    } else {
      const idx = projects.findIndex((p: any) => p.id === project.id);
      if (idx !== -1) projects[idx] = project;
      else projects.push(project);
    }

    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2), 'utf-8');
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });

    const dataPath = path.join(process.cwd(), 'data', 'projects.json');
    if (fs.existsSync(dataPath)) {
      let projects = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      projects = projects.filter((p: any) => p.id !== id);
      fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2), 'utf-8');
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting project" }, { status: 500 });
  }
}
