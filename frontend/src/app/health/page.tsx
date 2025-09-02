"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Health = { ok: boolean; backend?: { status?: string; timestamp?: string }; error?: string };

export default function HealthPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data: Health = await res.json();
      setHealth(data);
    } catch (e) {
      setHealth({ ok: false, error: String(e) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Backend Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            {health ? (
              health.ok ? (
                <div className="text-green-600">Status: {health.backend?.status} at {health.backend?.timestamp}</div>
              ) : (
                <div className="text-red-600">Error: {health.error}</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <Button onClick={load} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


