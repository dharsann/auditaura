import type { AuditResponse } from "@/services/api";

export interface ScanHistoryEntry {
  id: string;
  url: string;
  websiteName: string;
  framework: string;
  date: string;
  score: number;
  data: AuditResponse;
}

const STORAGE_KEY = "auditaura_scan_history";

function extractWebsiteName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function saveScan(url: string, data: AuditResponse): ScanHistoryEntry {
  const history = getHistory();
  const counts = { pass: 0, total: 0 };
  data.automated_results.forEach((r) => {
    counts.total++;
    if (r.result.status === "pass") counts.pass++;
  });
  const score = counts.total > 0 ? Math.round((counts.pass / counts.total) * 100) : 0;

  const entry: ScanHistoryEntry = {
    id: crypto.randomUUID(),
    url,
    websiteName: extractWebsiteName(url),
    framework: data.framework,
    date: new Date().toISOString(),
    score,
    data,
  };

  history.unshift(entry);
  // Keep last 50 scans
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return entry;
}

export function getHistory(): ScanHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getScanById(id: string): ScanHistoryEntry | undefined {
  return getHistory().find((e) => e.id === id);
}

export function deleteScan(id: string) {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
