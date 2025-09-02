"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const login = async () => {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('auth.basic', `Basic ${token}`);
    const res = await fetch('/api/me', { headers: { Authorization: `Basic ${token}` } });
    if (res.ok) {
      setMsg("Logged in");
      const me = await res.json();
      const roles: string[] = me?.roles || [];
      const has = (r: string) => roles.includes(r) || roles.includes(`ROLE_${r}`);
      if (has('ADMIN')) router.push('/admin');
      else if (has('INSTRUCTOR')) router.push('/instructor');
      else if (has('STUDENT')) router.push('/student');
      else router.push('/courses');
    } else {
      setMsg("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem('auth.basic');
    setMsg("Logged out");
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {msg && <div className="text-sm text-muted-foreground">{msg}</div>}
          <div>
            <div className="text-sm mb-1">Username</div>
            <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
          </div>
          <div>
            <div className="text-sm mb-1">Password</div>
            <Input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <div className="flex gap-2">
            <Button onClick={login} disabled={!username || !password}>Login</Button>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}


