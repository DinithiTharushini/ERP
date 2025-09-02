"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ClipboardList } from "lucide-react";

export default function InstructorDashboard() {
  const items = [
    { href: "/offerings", title: "Offerings", description: "Manage your course offerings", Icon: Target },
    { href: "/results", title: "Grades", description: "Enter or review grades", Icon: ClipboardList },
  ] as const;

  return (
    <main className="container mx-auto p-6">
      <div className="text-2xl font-semibold mb-4">Instructor Dashboard</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ href, title, description, Icon }, idx) => (
          <Link key={href} href={href} className="block group">
            <Card className="h-full border-border shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-white ${idx===0?"bg-blue-600":"bg-emerald-600"}`}>
                    <Icon size={18} />
                  </span>
                  <span>{title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

