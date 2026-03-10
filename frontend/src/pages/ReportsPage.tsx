import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import type { AuditResponse } from "@/services/api";
import { downloadReport, printReport } from "@/lib/reportGenerator";

export default function ReportsPage() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("auditResults");
    const storedUrl = sessionStorage.getItem("auditUrl");
    if (stored) {
      setData(JSON.parse(stored));
      setUrl(storedUrl || "");
    }
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No scan data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Run a compliance scan first to generate reports.
            </p>
            <Button className="mt-4" onClick={() => navigate("/scan")}>
              Start a Scan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const counts = { pass: 0, fail: 0, warning: 0 };
  data.automated_results.forEach((r) => counts[r.result.status]++);
  const total = data.automated_results.length;
  const score = total > 0 ? Math.round((counts.pass / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Reports</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Compliance Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{score}%</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10">
              <p className="text-2xl font-bold text-success">{counts.pass}</p>
              <p className="text-xs text-muted-foreground">Passed</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10">
              <p className="text-2xl font-bold text-destructive">{counts.fail}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10">
              <p className="text-2xl font-bold text-warning">{counts.warning}</p>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={() => downloadReport(data, url)} className="gap-2 flex-1">
              <Download className="h-4 w-4" />
              Download HTML Report
            </Button>
            <Button variant="outline" onClick={() => printReport(data, url)} className="gap-2 flex-1">
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Framework: {data.framework} &nbsp;|&nbsp; Target: {url} &nbsp;|&nbsp; Controls: {total} automated + {data.manual_controls.length} manual
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
