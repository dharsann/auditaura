import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";

const config: Record<string, { className: string; icon: typeof CheckCircle2; label: string }> = {
  pass: { className: "bg-success/15 text-success border-success/30 hover:bg-success/20", icon: CheckCircle2, label: "Pass" },
  fail: { className: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20", icon: XCircle, label: "Fail" },
  warning: { className: "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20", icon: AlertTriangle, label: "Warning" },
  pending_evidence: { className: "bg-muted text-muted-foreground border-border hover:bg-muted", icon: Clock, label: "Pending Evidence" },
};

export function StatusBadge({ status }: { status: string }) {
  const c = config[status] || config.pending_evidence;
  const Icon = c.icon;
  return (
    <Badge variant="outline" className={`gap-1 font-medium ${c.className}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </Badge>
  );
}
