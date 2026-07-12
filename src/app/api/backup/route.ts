import { NextResponse } from 'next/server';
import { getMembers } from '@/lib/db';

export async function GET() {
  try {
    const members = await getMembers();

    const headers = ['ID', 'Name', 'Role', 'Years', 'Achievements', 'Projects', 'Milestones'];

    const rows = members.map((m) => {
      const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
      return [
        m.id,
        escapeCsv(m.name),
        escapeCsv(m.designation),
        escapeCsv(m.year),
        escapeCsv(m.bio?.achievements),
        escapeCsv(m.bio?.projects),
        escapeCsv(m.bio?.milestones),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="rotary_database_backup.csv"',
      },
    });
  } catch {
    return new NextResponse('Error generating backup', { status: 500 });
  }
}
