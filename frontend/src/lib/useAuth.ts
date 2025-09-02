"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/me', { headers: { Authorization: localStorage.getItem('auth.basic') || '' } });
      if (res.ok) setUser(await res.json()); else setUser(null);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  return { user, loading, refresh };
}


