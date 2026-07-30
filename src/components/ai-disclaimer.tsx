import { AlertTriangle } from "lucide-react";

export function AiDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-border bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground ${className}`}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>
        <span className="font-semibold text-foreground">Responsible AI notice:</span> AI-generated
        content may contain inaccuracies, outdated information, or omissions. Always review, verify
        and edit output before using it in a professional context. Do not enter confidential or
        personal data you are not permitted to share.
      </p>
    </div>
  );
}
