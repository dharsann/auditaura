import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ShieldCheck, ShieldX, AlertTriangle, Clock, Activity } from "lucide-react";
import type { AuditResponse } from "@/services/api";

const COLORS = {
  pass: "hsl(142, 71%, 45%)",
  fail: "hsl(0, 72%, 51%)",
  warning: "hsl(38, 92%, 50%)",
};

export default function Dashboard() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [scannedUrl, setScannedUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("auditResults");
    const url = sessionStorage.getItem("auditUrl");
    if (!stored) {
      navigate("/scan");
      return;
    }
    setData(JSON.parse(stored));
    setScannedUrl(url || "");
  }, [navigate]);

  if (!data) return null;

  const counts = { pass: 0, fail: 0, warning: 0 };
  data.automated_results.forEach((r) => {
    counts[r.result.status]++;
  });
  const total = data.automated_results.length;
  const score = total > 0 ? Math.round((counts.pass / total) * 100) : 0;

  const pieData = [
    { name: "Pass", value: counts.pass },
    { name: "Fail", value: counts.fail },
    { name: "Warning", value: counts.warning },
  ].filter((d) => d.value > 0);

  // Group by control prefix for bar chart
  const categoryMap: Record<string, { pass: number; fail: number; warning: number }> = {};
  data.automated_results.forEach((r) => {
    const cat = r.control.split(".").slice(0, 2).join(".");
    if (!categoryMap[cat]) categoryMap[cat] = { pass: 0, fail: 0, warning: 0 };
    categoryMap[cat][r.result.status]++;
  });
  const barData = Object.entries(categoryMap).map(([cat, v]) => ({ category: cat, ...v }));

  const summaryCards = [
    { label: "Compliance Score", value: `${score}%`, icon: Activity, accent: "text-primary" },
    { label: "Pass", value: counts.pass, icon: ShieldCheck, accent: "text-success" },
    { label: "Fail", value: counts.fail, icon: ShieldX, accent: "text-destructive" },
    { label: "Warning", value: counts.warning, icon: AlertTriangle, accent: "text-warning" },
    { label: "Manual Pending", value: data.manual_controls.length, icon: Clock, accent: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Compliance Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {data.framework} — {scannedUrl}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
                <c.icon className={`h-4 w-4 ${c.accent}`} />
              </div>
              <span className="text-2xl font-bold">{c.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Controls by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData}>
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="pass" fill={COLORS.pass} stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="fail" fill={COLORS.fail} stackId="a" />
                <Bar dataKey="warning" fill={COLORS.warning} stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Automated Controls Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Automated Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Control ID</TableHead>
                <TableHead>Control Name</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead>Issue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.automated_results.map((r) => (
                <TableRow key={r.control}>
                  <TableCell className="font-mono text-xs">{r.control}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell><StatusBadge status={r.result.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.result.issue || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Manual Controls Table */}
      {data.manual_controls.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Manual Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Control ID</TableHead>
                  <TableHead>Control Name</TableHead>
                  <TableHead className="w-[160px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.manual_controls.map((c) => (
                  <TableRow key={c.control}>
                    <TableCell className="font-mono text-xs">{c.control}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
