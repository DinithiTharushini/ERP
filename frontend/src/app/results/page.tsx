"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listStudents, type Student } from "@/lib/api/students";
import { listGradesByStudent, type Grade } from "@/lib/api/grades";

export default function ResultsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState<number | "">("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { listStudents().then(setStudents); }, []);

  const load = async () => {
    if (!studentId) return;
    setLoading(true);
    try { setGrades(await listGradesByStudent(Number(studentId))); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <select className="border rounded px-2 py-2 bg-background" value={studentId} onChange={e => setStudentId(Number(e.target.value))}>
              <option value="" disabled>Select student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.indexNumber} - {s.firstName} {s.lastName}</option>)}
            </select>
            <Button onClick={load} disabled={!studentId || loading}>Load</Button>
          </div>

          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="py-2 px-3">Term</th>
                  <th className="py-2 px-3">Course</th>
                  <th className="py-2 px-3">Letter</th>
                  <th className="py-2 px-3">Points</th>
                  <th className="py-2 px-3">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => (
                  <tr key={g.id} className="border-t">
                    <td className="py-2 px-3">{g.term}</td>
                    <td className="py-2 px-3">{g.courseCode}</td>
                    <td className="py-2 px-3">{g.letter || "-"}</td>
                    <td className="py-2 px-3">{g.points ?? "-"}</td>
                    <td className="py-2 px-3">{g.remarks || "-"}</td>
                  </tr>
                ))}
                {grades.length === 0 && (
                  <tr><td className="py-6 px-3 text-center text-muted-foreground" colSpan={5}>No results</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


