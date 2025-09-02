"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export function Navbar() {
  const { user } = useAuth();
  const roles = user?.roles || [];
  const has = (r: string) => roles.includes(r) || roles.includes(`ROLE_${r}`);
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-12 px-4">
        <Link href="/" className="font-semibold">ERP</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/courses">Courses</Link>
          <Link href="/offerings">Offerings</Link>
          {has('ADMIN') && <Link href="/students">Students</Link>}
          {has('ADMIN') && <Link href="/instructors">Instructors</Link>}
          {has('ADMIN') && <Link href="/admin">Admin</Link>}
          {has('INSTRUCTOR') && <Link href="/instructor">Instructor</Link>}
          {has('STUDENT') && <Link href="/student">Student</Link>}
          <Link href="/health" className="text-muted-foreground">Health</Link>
        </nav>
      </div>
    </header>
  );
}
