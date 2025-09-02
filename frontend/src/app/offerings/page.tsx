"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listOfferings, createOffering, updateOffering, deleteOffering, type Offering } from "@/lib/api/offerings";
import { listCourses, type Course } from "@/lib/api/courses";
import { listInstructors, type Instructor } from "@/lib/api/instructors";
import { listStudents, type Student } from "@/lib/api/students";
import { listEnrollmentsByOffering, createEnrollment, deleteEnrollment, type Enrollment } from "@/lib/api/enrollments";
import { createGrade, updateGrade, listGradesByOffering, type Grade } from "@/lib/api/grades";
import { useAuth } from "@/lib/useAuth";

export default function OfferingsPage() {
  const { user } = useAuth();
  const roles = user?.roles || [];
  const has = (r: string) => roles.includes(r) || roles.includes(`ROLE_${r}`);
  const isAdmin = has('ADMIN');
  const isInstructor = has('INSTRUCTOR');
  const [term, setTerm] = useState("2025-Sem1");
  const [items, setItems] = useState<Offering[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Offering | null>(null);
  const [courseId, setCourseId] = useState<number | "">("");
  const [instructorId, setInstructorId] = useState<number | "">("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedOfferingId, setSelectedOfferingId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | "">("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [gradesByEnrollment, setGradesByEnrollment] = useState<Record<number, Grade>>({});

  const loadRefs = async () => {
    setCourses(await listCourses());
    setInstructors(await listInstructors());
    if (isAdmin) setStudents(await listStudents());
  };
  const load = async () => { setItems(await listOfferings(term)); };

  useEffect(() => { loadRefs(); load(); }, [isAdmin]);

  const applyFilter = async () => { await load(); };

  const resetForm = () => { setCourseId(""); setInstructorId(""); setCapacity(""); setEditing(null); };

  const submit = async () => {
    if (!courseId || !instructorId || !capacity) return;
    setLoading(true);
    setNotice(null);
    try {
      const body = { term, courseId: Number(courseId), instructorId: Number(instructorId), capacity: Number(capacity) };
      if (editing?.id) { await updateOffering(editing.id, body); setNotice({ type: "success", msg: "Updated" }); }
      else { await createOffering(body); setNotice({ type: "success", msg: "Created" }); }
      await load();
      setOpen(false);
      resetForm();
    } catch (e) { setNotice({ type: "error", msg: String(e) }); }
    finally { setLoading(false); }
  };

  const del = async (id: number) => {
    if (!confirm("Delete this offering?")) return;
    setNotice(null);
    await deleteOffering(id);
    await load();
    setNotice({ type: "success", msg: "Deleted" });
  };

  const openEnroll = async (offeringId: number) => {
    setSelectedOfferingId(offeringId);
    setSelectedStudentId("");
    setEnrollOpen(true);
  };

  const submitEnroll = async () => {
    if (!selectedOfferingId || !selectedStudentId) return;
    setLoading(true);
    try {
      await createEnrollment({ studentId: Number(selectedStudentId), offeringId: selectedOfferingId });
      await load();
      setEnrollOpen(false);
      setNotice({ type: "success", msg: "Enrollment saved" });
    } catch (e) {
      setNotice({ type: "error", msg: String(e) });
    } finally { setLoading(false); }
  };

  const openManage = async (offeringId: number) => {
    setSelectedOfferingId(offeringId);
    const [ens, gs] = await Promise.all([
      listEnrollmentsByOffering(offeringId),
      listGradesByOffering(offeringId)
    ]);
    setEnrollments(ens);
    const map: Record<number, Grade> = {};
    gs.forEach(g => { map[g.enrollmentId] = g; });
    setGradesByEnrollment(map);
    setManageOpen(true);
  };

  const dropEnrollment = async (id: number) => {
    await deleteEnrollment(id);
    if (selectedOfferingId) {
      setEnrollments(await listEnrollmentsByOffering(selectedOfferingId));
      await load();
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Offerings</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <Input value={term} onChange={e => setTerm(e.target.value)} placeholder="e.g. 2025-Sem1" />
              <Button onClick={applyFilter}>Apply</Button>
              {isAdmin && <Button onClick={() => { resetForm(); setOpen(true); }}>Add</Button>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notice && (
            <div className={`rounded-md px-3 py-2 text-sm ${notice.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{notice.msg}</div>
          )}
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="py-2 px-3">Term</th>
                  <th className="py-2 px-3">Course</th>
                  <th className="py-2 px-3">Instructor</th>
                  <th className="py-2 px-3">Capacity</th>
                  <th className="py-2 px-3">Enrolled</th>
                  <th className="py-2 px-3">Waitlisted</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(o => (
                  <tr key={o.id} className="border-t">
                    <td className="py-2 px-3">{o.term}</td>
                    <td className="py-2 px-3">{o.courseCode} - {o.courseTitle}</td>
                    <td className="py-2 px-3">{o.instructorName}</td>
                    <td className="py-2 px-3">{o.capacity}</td>
                    <td className="py-2 px-3">{o.enrolledCount}</td>
                    <td className="py-2 px-3">{o.waitlistedCount}</td>
                    <td className="py-2 px-3 space-x-2">
                      {isAdmin && <Button onClick={() => openEnroll(o.id!)}>Enroll</Button>}
                      {(isAdmin || isInstructor) && <Button variant="outline" onClick={() => openManage(o.id!)}>Manage</Button>}
                      {isAdmin && <Button variant="outline" onClick={() => { setEditing(o); setCourseId(o.courseId); setInstructorId(o.instructorId); setCapacity(o.capacity); setOpen(true); }}>Edit</Button>}
                      {isAdmin && <Button variant="destructive" onClick={() => o.id && del(o.id)}>Delete</Button>}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td className="py-6 px-3 text-center text-muted-foreground" colSpan={5}>No results</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background shadow-lg border rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b font-semibold">{editing ? "Edit" : "Add"} Offering</div>
            <div className="p-6 space-y-3">
              <div>
                <div className="text-sm mb-1">Term</div>
                <Input value={term} onChange={e => setTerm(e.target.value)} />
              </div>
              <div>
                <div className="text-sm mb-1">Course</div>
                <select className="border rounded px-2 py-2 w-full bg-background" value={courseId} onChange={e => setCourseId(Number(e.target.value))}>
                  <option value="" disabled>Select course</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.title}</option>)}
                </select>
              </div>
              <div>
                <div className="text-sm mb-1">Instructor</div>
                <select className="border rounded px-2 py-2 w-full bg-background" value={instructorId} onChange={e => setInstructorId(Number(e.target.value))}>
                  <option value="" disabled>Select instructor</option>
                  {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
              <div>
                <div className="text-sm mb-1">Capacity</div>
                <Input type="number" min={1} value={capacity} onChange={e => setCapacity(Number(e.target.value))} />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); }}>Cancel</Button>
              <Button onClick={submit} disabled={loading || !courseId || !instructorId || !capacity}>{editing ? "Save" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}

      {enrollOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background shadow-lg border rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b font-semibold">Enroll Student</div>
            <div className="p-6 space-y-3">
              <div>
                <div className="text-sm mb-1">Student</div>
                <select className="border rounded px-2 py-2 w-full bg-background" value={selectedStudentId} onChange={e => setSelectedStudentId(Number(e.target.value))}>
                  <option value="" disabled>Select student</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.indexNumber} - {s.firstName} {s.lastName}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setEnrollOpen(false); }}>Cancel</Button>
              <Button onClick={submitEnroll} disabled={loading || !selectedStudentId}>Enroll</Button>
            </div>
          </div>
        </div>
      )}

      {manageOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background shadow-lg border rounded-lg w-full max-w-lg">
            <div className="px-6 py-4 border-b font-semibold">Manage Enrollments</div>
            <div className="p-6 space-y-3">
              <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="text-left">
                      <th className="py-2 px-3">Student</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Letter</th>
                      <th className="py-2 px-3">Points</th>
                      <th className="py-2 px-3">Remarks</th>
                      <th className="py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map(e => (
                      <ManageRow key={e.id} enrollment={e} initialGrade={gradesByEnrollment[e.id]} onDropped={() => { if (selectedOfferingId) { listEnrollmentsByOffering(selectedOfferingId).then(setEnrollments); load(); } }} />
                    ))}
                    {enrollments.length === 0 && (
                      <tr><td className="py-6 px-3 text-center text-muted-foreground" colSpan={6}>No enrollments</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setManageOpen(false); }}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ManageRow({ enrollment, onDropped, initialGrade }: { enrollment: Enrollment; onDropped: () => void; initialGrade?: Grade }) {
  const [letter, setLetter] = useState<string>(initialGrade?.letter || "");
  const [points, setPoints] = useState<string>(initialGrade?.points != null ? String(initialGrade.points) : "");
  const [remarks, setRemarks] = useState<string>(initialGrade?.remarks || "");
  const [gradeId, setGradeId] = useState<number | null>(initialGrade?.id ?? null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const trimmed = points.trim();
      const numericPoints = trimmed === "" ? undefined : Number(trimmed);
      const body = { enrollmentId: enrollment.id, letter: letter || undefined, points: numericPoints, remarks: remarks || undefined };
      if (gradeId) {
        const g = await updateGrade(gradeId, body);
        setGradeId(g.id);
      } else {
        const g = await createGrade(body);
        setGradeId(g.id);
      }
    } finally { setSaving(false); }
  };

  return (
    <tr className="border-t">
      <td className="py-2 px-3">{enrollment.studentName}</td>
      <td className="py-2 px-3">{enrollment.status}</td>
      <td className="py-2 px-3"><Input value={letter} onChange={e => setLetter(e.target.value)} placeholder="A" /></td>
      <td className="py-2 px-3"><Input type="text" inputMode="decimal" value={points} onChange={e => setPoints(e.target.value)} placeholder="4.0" /></td>
      <td className="py-2 px-3"><Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="optional" /></td>
      <td className="py-2 px-3 space-x-2">
        <Button onClick={save} disabled={saving}>Save</Button>
        <Button variant="destructive" onClick={async () => { await deleteEnrollment(enrollment.id); onDropped(); }}>Drop</Button>
      </td>
    </tr>
  );
}


