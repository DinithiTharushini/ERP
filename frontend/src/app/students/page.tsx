"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, BackButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listStudents, createStudent, updateStudent, deleteStudent, type Student } from "@/lib/api/students";

export default function StudentsPage() {
  const [items, setItems] = useState<Student[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [indexNumber, setIndexNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const load = async () => { setItems(await listStudents(q)); };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items, [items]);

  const resetForm = () => { setIndexNumber(""); setFirstName(""); setLastName(""); setEmail(""); setEditing(null); };

  const submit = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const payload = { indexNumber, firstName, lastName, email };
      if (editing?.id) { await updateStudent(editing.id, payload); setNotice({ type: "success", msg: "Updated" }); }
      else { await createStudent(payload); setNotice({ type: "success", msg: "Created" }); }
      await load();
      setOpen(false);
      resetForm();
    } catch (e) {
      setNotice({ type: "error", msg: String(e) });
    } finally { setLoading(false); }
  };

  const del = async (id: number) => {
    if (!confirm("Delete this student?")) return;
    setNotice(null);
    await deleteStudent(id);
    await load();
    setNotice({ type: "success", msg: "Deleted" });
  };

  const onSearch = async () => { await load(); };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Students</div>
          <BackButton>Back</BackButton>
        </div>
        <div className="flex gap-2 w-full md:w-auto max-w-sm">
          <Input placeholder="Search by name or index" value={q} onChange={e => setQ(e.target.value)} />
          <Button onClick={onSearch}>Search</Button>
          <Button onClick={() => { resetForm(); setOpen(true); }}>Add</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="sr-only">Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notice && (
            <div className={`rounded-md px-3 py-2 text-sm ${notice.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{notice.msg}</div>
          )}
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="py-2 px-3">Index</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-t">
                    <td className="py-2 px-3 font-medium">{s.indexNumber}</td>
                    <td className="py-2 px-3">{s.firstName} {s.lastName}</td>
                    <td className="py-2 px-3">{s.email}</td>
                    <td className="py-2 px-3 space-x-2">
                      <Button variant="outline" onClick={() => { setEditing(s); setIndexNumber(s.indexNumber); setFirstName(s.firstName); setLastName(s.lastName); setEmail(s.email); setOpen(true); }}>Edit</Button>
                      <Button variant="destructive" onClick={() => s.id && del(s.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td className="py-6 px-3 text-center text-muted-foreground" colSpan={4}>No results</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background shadow-lg border rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b font-semibold">{editing ? "Edit" : "Add"} Student</div>
            <div className="p-6 space-y-3">
              <div>
                <div className="text-sm mb-1">Index Number</div>
                <Input value={indexNumber} onChange={e => setIndexNumber(e.target.value)} placeholder="e.g. 2020/CS/001" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm mb-1">First Name</div>
                  <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <div className="text-sm mb-1">Last Name</div>
                  <Input value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="text-sm mb-1">Email</div>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={submit} disabled={loading || !indexNumber || !firstName || !lastName || !email}>{editing ? "Save" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


