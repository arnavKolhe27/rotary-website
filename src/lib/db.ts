import { getDb } from './mongodb';

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

export function getCurrentRotaryYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  // Rotary year runs July–June
  if (now.getMonth() < 6) {
    return `${year - 1}-${year}`;
  } else {
    return `${year}-${year + 1}`;
  }
}

export async function getMembers(): Promise<Member[]> {
  const db = await getDb();
  const docs = await db.collection('members').find({}).toArray();
  // Strip MongoDB _id before returning
  return docs.map((doc: any) => ({ ...doc, _id: doc._id?.toString() }) as Member);
}

export async function saveMembers(members: Member[]): Promise<void> {
  const db = await getDb();
  const col = db.collection('members');
  for (const member of members) {
    if (!member.id) member.id = Date.now().toString();
    await col.updateOne({ id: member.id }, { $set: member }, { upsert: true });
  }
}

export async function deleteMember(id: string): Promise<void> {
  const db = await getDb();
  await db.collection('members').deleteOne({ id });
}

export async function getActiveBoard(year: string = getCurrentRotaryYear()): Promise<Member[]> {
  const all = await getMembers();
  return all
    .filter((m) => m.year === year)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPastPresidents(currentYear: string = getCurrentRotaryYear()): Promise<Member[]> {
  const all = await getMembers();
  return all
    .filter(
      (m) =>
        m.designation.includes('President') &&
        m.year !== currentYear &&
        m.year < currentYear
    )
    .sort((a, b) => b.year.localeCompare(a.year));
}
