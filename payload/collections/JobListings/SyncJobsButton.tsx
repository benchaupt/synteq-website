"use client";

import { useState } from "react";

export function SyncJobsButton() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSync() {
    setSyncing(true);
    setResult(null);

    try {
      const res = await fetch("/api/sync-jobs", { method: "POST" });
      const data: Record<string, unknown> = await res.json();
      if (res.ok) {
        setResult(`Synced: ${data.created} created, ${data.updated} updated, ${data.deleted} deleted (${data.total} total)`);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setResult(`Error: ${String(data.error || res.statusText)}`);
      }
    } catch (err) {
      setResult(`Error: ${String(err)}`);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={handleSync}
        disabled={syncing}
        style={{
          padding: "8px 16px",
          backgroundColor: syncing ? "#666" : "#333",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: syncing ? "not-allowed" : "pointer",
          fontSize: "14px",
        }}
      >
        {syncing ? "Syncing from Rippling..." : "Sync Jobs from Rippling"}
      </button>
      {result && (
        <p style={{ marginTop: "8px", fontSize: "13px", color: result.startsWith("Error") ? "#e53e3e" : "#38a169" }}>
          {result}
        </p>
      )}
    </div>
  );
}
