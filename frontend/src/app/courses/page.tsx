"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, BackButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listCourses, createCourse, updateCourse, deleteCourse, type Course } from "@/lib/api/courses";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"code" | "title">("code");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const load = async () => { setCourses(await listCourses()); };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? courses.filter(c => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)) : courses;
    const sorted = [...base].sort((a, b) => {
      const va = (a[sortKey] || "").toString().toLowerCase();
      const vb = (b[sortKey] || "").toString().toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [courses, query, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const clickSort = (k: "code" | "title") => {
    if (k === sortKey) setSortDir(d => (d === "asc" ? "desc" : "asc")); else { setSortKey(k); setSortDir("asc"); }
  };

  const resetForm = () => { setCode(""); setTitle(""); setEditing(null); };

  const submit = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const payload = { code, title };
      if (editing?.id) await updateCourse(editing.id, payload);
      else await createCourse(payload);
      setNotice({ type: "success", msg: editing ? "Updated" : "Created" });
      await load();
      setOpen(false);
      resetForm();
    } catch (e) {
      setNotice({ type: "error", msg: String(e instanceof Error ? e.message : e) });
    } finally { setLoading(false); }
  };

  const del = async (id: number) => {
    if (!confirm("Delete this course?")) return;
    setNotice(null);
    await deleteCourse(id);
    await load();
    setNotice({ type: "success", msg: "Deleted" });
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Courses</div>
          <BackButton>Back</BackButton>
        </div>
        <div className="flex gap-2 w-full md:w-auto max-w-sm">
          <Input
            placeholder="Search by code or title"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
          <Button onClick={() => { resetForm(); setOpen(true); }}>Add</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="sr-only">Courses</CardTitle>
            <div className="text-xs text-muted-foreground">{filtered.length} total</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notice && (
            <div className={`rounded-md px-3 py-2 text-sm ${notice.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {notice.msg}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => clickSort("code")}>Code {sortKey === "code" && (sortDir === "asc" ? "▲" : "▼")}</th>
                  <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => clickSort("title")}>Title {sortKey === "title" && (sortDir === "asc" ? "▲" : "▼")}</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {current.map(c => (
                  <tr key={c.id} className="border-b">
                    <td className="py-2 pr-4">{c.code}</td>
                    <td className="py-2 pr-4">{c.title}</td>
                    <td className="py-2 space-x-2">
                      <Button variant="outline" onClick={() => { setEditing(c); setCode(c.code); setTitle(c.title); setOpen(true); }}>Edit</Button>
                      <Button variant="destructive" onClick={() => c.id && del(c.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
                {current.length === 0 && (
                  <tr><td className="py-6 px-3 text-center text-muted-foreground" colSpan={3}>No results</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-muted-foreground">{filtered.length} total • Page {page} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <select className="border rounded px-2 py-1 text-sm bg-background" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                {[5,10,20].map(n => <option key={n} value={n}>{n}/page</option>)}
              </select>
              <div className="flex gap-1">
                <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
                <Button variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-md w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Course</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm mb-1">Code</label>
                <Input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. CS101" />
              </div>
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Intro to CS" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={submit} disabled={loading || !code || !title}>{editing ? "Save" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


