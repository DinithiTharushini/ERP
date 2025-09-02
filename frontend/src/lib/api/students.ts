export type Student = {
  id?: number;
  indexNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

import { getAuthHeader } from '@/lib/auth';

export async function listStudents(q?: string): Promise<Student[]> {
  const url = new URL('/api/students', window.location.origin);
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...getAuthHeader() } });
  try {
    const data = await res.json();
    return Array.isArray(data) ? data as Student[] : [];
  } catch {
    return [];
  }
}

export async function createStudent(input: Omit<Student, 'id'>): Promise<Student> {
  const res = await fetch('/api/students', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateStudent(id: number, input: Omit<Student, 'id'>): Promise<Student> {
  const res = await fetch(`/api/students/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`/api/students/${id}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
}


