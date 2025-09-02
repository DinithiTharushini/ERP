export type Course = { id?: number; code: string; title: string };

import { getAuthHeader } from '@/lib/auth';

export async function listCourses(): Promise<Course[]> {
  const res = await fetch('/api/courses', { cache: 'no-store', headers: { ...getAuthHeader() } });
  return res.json();
}

export async function createCourse(input: Omit<Course, 'id'>): Promise<Course> {
  const res = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateCourse(id: number, input: Omit<Course, 'id'>): Promise<Course> {
  const res = await fetch(`/api/courses/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteCourse(id: number): Promise<void> {
  const res = await fetch(`/api/courses/${id}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
}



