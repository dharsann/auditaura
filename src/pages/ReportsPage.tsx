import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Coming Soon</p>
          <p className="text-sm text-muted-foreground mt-1">
            Exportable compliance reports will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
