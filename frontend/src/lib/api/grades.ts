export type Grade = { id: number; enrollmentId: number; studentName: string; courseCode: string; term: string; letter?: string; points?: number; remarks?: string };

import { getAuthHeader } from '@/lib/auth';

export async function listGradesByOffering(offeringId: number): Promise<Grade[]> {
  const url = new URL('/api/grades', window.location.origin);
  url.searchParams.set('offeringId', String(offeringId));
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try { const data = await res.json(); return Array.isArray(data) ? data as Grade[] : []; } catch { return []; }
}

export async function listGradesByStudent(studentId: number): Promise<Grade[]> {
  const url = new URL('/api/grades', window.location.origin);
  url.searchParams.set('studentId', String(studentId));
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try { const data = await res.json(); return Array.isArray(data) ? data as Grade[] : []; } catch { return []; }
}

export async function createGrade(body: { enrollmentId: number; letter?: string; points?: number; remarks?: string }): Promise<Grade> {
  const res = await fetch('/api/grades', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateGrade(id: number, body: { enrollmentId: number; letter?: string; points?: number; remarks?: string }): Promise<Grade> {
  const res = await fetch(`/api/grades/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


