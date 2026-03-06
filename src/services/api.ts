const BASE_URL = "http://localhost:8000";

export interface ControlResult {
  control: string;
  title: string;
  result: {
    status: "pass" | "fail" | "warning";
    issue: string | null;
  };
}

export interface ManualControl {
  control: string;
  title: string;
  status: string;
}

export interface AuditResponse {
  framework: string;
  automated_results: ControlResult[];
  manual_controls: ManualControl[];
}

export async function runAudit(url: string, framework: string): Promise<AuditResponse> {
  const res = await fetch(
    `${BASE_URL}/audit?url=${encodeURIComponent(url)}&framework=${encodeURIComponent(framework)}`
  );
  if (!res.ok) throw new Error(`Audit failed: ${res.statusText}`);
  return res.json();
}
