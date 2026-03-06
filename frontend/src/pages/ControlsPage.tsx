import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import type { AuditResponse } from "@/services/api";

export default function ControlsPage() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("auditResults");
    if (!stored) { navigate("/scan"); return; }
    setData(JSON.parse(stored));
  }, [navigate]);

  if (!data) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Controls — {data.framework}</h2>
      <Tabs defaultValue="automated">
        <TabsList>
          <TabsTrigger value="automated">Automated ({data.automated_results.length})</TabsTrigger>
          <TabsTrigger value="manual">Manual ({data.manual_controls.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="automated">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Control ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.automated_results.map((r) => (
                    <TableRow key={r.control}>
                      <TableCell className="font-mono text-xs">{r.control}</TableCell>
                      <TableCell>{r.title}</TableCell>
                      <TableCell><StatusBadge status={r.result.status} /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.result.issue || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manual">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Control ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
