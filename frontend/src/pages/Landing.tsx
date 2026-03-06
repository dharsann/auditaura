import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  "Automated security scanning",
  "Multi-framework compliance (ISO 27001, GDPR, HIPAA, SOC2, PCI DSS)",
  "AI-powered control assessment",
  "Real-time compliance dashboards",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            AI Compliance Agent
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Automatically scan your web applications and evaluate compliance against
            regulatory frameworks — powered by AI.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 mx-auto w-fit">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <Button size="lg" onClick={() => navigate("/scan")} className="gap-2 text-base px-8">
          Start Compliance Scan
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
