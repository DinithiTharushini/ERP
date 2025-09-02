export type Instructor = { id?: number; staffId: string; name: string; email: string };

import { getAuthHeader } from '@/lib/auth';

export async function listInstructors(q?: string): Promise<Instructor[]> {
  const url = new URL('/api/instructors', window.location.origin);
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try {
    const data = await res.json();
    return Array.isArray(data) ? data as Instructor[] : [];
  } catch { return []; }
}

export async function createInstructor(input: Omit<Instructor, 'id'>): Promise<Instructor> {
  const res = await fetch('/api/instructors', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateInstructor(id: number, input: Omit<Instructor, 'id'>): Promise<Instructor> {
  const res = await fetch(`/api/instructors/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteInstructor(id: number): Promise<void> {
  const res = await fetch(`/api/instructors/${id}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
}


