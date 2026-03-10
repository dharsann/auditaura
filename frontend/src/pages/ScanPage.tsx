import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Scan } from "lucide-react";
import { runAudit, type AuditResponse } from "@/services/api";
import { saveScan } from "@/lib/scanHistory";
import { useToast } from "@/hooks/use-toast";

const frameworks = [
  { value: "iso27001", label: "ISO 27001" },
  { value: "gdpr", label: "GDPR" },
  { value: "hipaa", label: "HIPAA" },
  { value: "soc2", label: "SOC2" },
  { value: "pcidss", label: "PCI DSS" },
];

export default function ScanPage() {
  const [url, setUrl] = useState("");
  const [framework, setFramework] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScan = async () => {
    if (!url || !framework) {
      toast({ title: "Missing fields", description: "Please provide a URL and select a framework.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const data = await runAudit(url, framework);
      // Save to history
      saveScan(url, data);
      // Store results and navigate
      sessionStorage.setItem("auditResults", JSON.stringify(data));
      sessionStorage.setItem("auditUrl", url);
      navigate("/dashboard");
    } catch (e: any) {
      toast({ title: "Scan failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary" />
            New Compliance Scan
          </CardTitle>
          <CardDescription>
            Enter the URL of your application and select a compliance framework.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="url">Application URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Compliance Framework</Label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleScan} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scan className="h-4 w-4" />}
            {loading ? "Scanning..." : "Run Scan"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
