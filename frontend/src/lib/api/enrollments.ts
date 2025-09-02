export type Enrollment = { id: number; studentId: number; studentName: string; offeringId: number; courseCode: string; term: string; status: 'ENROLLED'|'WAITLISTED' };

import { getAuthHeader } from '@/lib/auth';

export async function listEnrollments(studentId: number): Promise<Enrollment[]> {
  const url = new URL('/api/enrollments', window.location.origin);
  url.searchParams.set('studentId', String(studentId));
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try { const data = await res.json(); return Array.isArray(data) ? data as Enrollment[] : []; } catch { return []; }
}

export async function listEnrollmentsByOffering(offeringId: number): Promise<Enrollment[]> {
  const url = new URL('/api/enrollments', window.location.origin);
  url.searchParams.set('offeringId', String(offeringId));
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try { const data = await res.json(); return Array.isArray(data) ? data as Enrollment[] : []; } catch { return []; }
}

export async function createEnrollment(body: { studentId: number; offeringId: number }): Promise<Enrollment> {
  const res = await fetch('/api/enrollments', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteEnrollment(id: number): Promise<void> {
  const res = await fetch(`/api/enrollments/${id}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
}


