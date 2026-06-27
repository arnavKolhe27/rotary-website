import fs from 'fs';
import path from 'path';

export interface MemberBio {
  achievements: string;
  projects: string;
  milestones: string;
}

export interface Member {
  id: string;
  name: string;
  photoURL: string;
  year: string;
  designation: string;
  displayOrder: number;
  bio: MemberBio;
}

const DB_PATH = path.join(process.cwd(), 'data', 'members.json');

export function getMembers(): Member[] {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data) as Member[];
  } catch (error) {
    return [];
  }
}

export function saveMembers(members: Member[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(members, null, 2), 'utf-8');
}

export function getCurrentRotaryYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  if (now.getMonth() < 6) { // 0-indexed, 6 is July
    return `${year - 1}-${year}`;
  } else {
    return `${year}-${year + 1}`;
  }
}

export function getActiveBoard(year: string = getCurrentRotaryYear()): Member[] {
  const all = getMembers();
  return all.filter(m => m.year === year).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPastPresidents(currentYear: string = getCurrentRotaryYear()): Member[] {
  const all = getMembers();
  return all
    .filter(m => m.designation.includes("President") && m.year !== currentYear && m.year < currentYear)
    .sort((a, b) => b.year.localeCompare(a.year));
}
