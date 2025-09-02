export type Offering = {
  id?: number;
  term: string;
  courseId: number;
  courseCode: string;
  courseTitle: string;
  instructorId: number;
  instructorName: string;
  capacity: number;
};

import { getAuthHeader } from '@/lib/auth';

export async function listOfferings(term?: string): Promise<Offering[]> {
  const url = new URL('/api/offerings', window.location.origin);
  if (term) url.searchParams.set('term', term);
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try { const data = await res.json(); return Array.isArray(data) ? data as Offering[] : []; } catch { return []; }
}

export async function createOffering(body: { term: string; courseId: number; instructorId: number; capacity: number }): Promise<Offering> {
  const res = await fetch('/api/offerings', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateOffering(id: number, body: { term: string; courseId: number; instructorId: number; capacity: number }): Promise<Offering> {
  const res = await fetch(`/api/offerings/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteOffering(id: number): Promise<void> {
  const res = await fetch(`/api/offerings/${id}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
}


