"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listInstructors, createInstructor, updateInstructor, deleteInstructor, type Instructor } from "@/lib/api/instructors";

export default function InstructorsPage() {
  const [items, setItems] = useState<Instructor[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Instructor | null>(null);
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const load = async () => { setItems(await listInstructors(q)); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setStaffId(""); setName(""); setEmail(""); setEditing(null); };

  const submit = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const payload = { staffId, name, email };
      if (editing?.id) { await updateInstructor(editing.id, payload); setNotice({ type: "success", msg: "Updated" }); }
      else { await createInstructor(payload); setNotice({ type: "success", msg: "Created" }); }
      await load();
      setOpen(false);
      resetForm();
    } catch (e) { setNotice({ type: "error", msg: String(e) }); }
    finally { setLoading(false); }
  };

  const del = async (id: number) => {
    if (!confirm("Delete this instructor?")) return;
    setNotice(null);
    await deleteInstructor(id);
    await load();
    setNotice({ type: "success", msg: "Deleted" });
  };

  const onSearch = async () => { await load(); };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Instructors</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <Input placeholder="Search by name or staff id" value={q} onChange={e => setQ(e.target.value)} />
              <Button onClick={onSearch}>Search</Button>
              <Button onClick={() => { resetForm(); setOpen(true); }}>Add</Button>
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
                  <th className="py-2 px-3">Staff ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id} className="border-t">
                    <td className="py-2 px-3 font-medium">{i.staffId}</td>
                    <td className="py-2 px-3">{i.name}</td>
                    <td className="py-2 px-3">{i.email}</td>
                    <td className="py-2 px-3 space-x-2">
                      <Button variant="outline" onClick={() => { setEditing(i); setStaffId(i.staffId); setName(i.name); setEmail(i.email); setOpen(true); }}>Edit</Button>
                      <Button variant="destructive" onClick={() => i.id && del(i.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
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
            <div className="px-6 py-4 border-b font-semibold">{editing ? "Edit" : "Add"} Instructor</div>
            <div className="p-6 space-y-3">
              <div>
                <div className="text-sm mb-1">Staff ID</div>
                <Input value={staffId} onChange={e => setStaffId(e.target.value)} placeholder="e.g. ST123" />
              </div>
              <div>
                <div className="text-sm mb-1">Name</div>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <div className="text-sm mb-1">Email</div>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={submit} disabled={loading || !staffId || !name || !email}>{editing ? "Save" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


