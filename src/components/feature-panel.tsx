import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Copy, Check, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { generateAiText } from "@/lib/ai.functions";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type FeaturePanelProps = {
  title: string;
  description: string;
  icon: ReactNode;
  inputs: ReactNode;
  outputLabel: string;
  outputPlaceholder: string;
  canSubmit: boolean;
  buildRequest: () => { system: string; prompt: string };
  submitLabel: string;
};

export function FeaturePanel({
  title,
  description,
  icon,
  inputs,
  outputLabel,
  outputPlaceholder,
  canSubmit,
  buildRequest,
  submitLabel,
}: FeaturePanelProps) {
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const generate = useServerFn(generateAiText);

  const mutation = useMutation({
    mutationFn: async () => generate({ data: buildRequest() }),
    onSuccess: (result) => {
      setOutput(result.text || "The assistant returned no text. Try refining your input.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong generating the response.");
    },
  });

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            {icon}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <CardTitle className="font-display text-base">Input</CardTitle>
            <CardDescription>Give the assistant the details it needs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputs}
            <Button
              className="w-full"
              disabled={!canSubmit || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> {submitLabel}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-none">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <CardTitle className="font-display text-base">{outputLabel}</CardTitle>
              <CardDescription>Editable — refine before you use it.</CardDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={copy} disabled={!output}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOutput("")}
                disabled={!output || mutation.isPending}
              >
                <RotateCcw className="size-4" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(event) => setOutput(event.target.value)}
              placeholder={outputPlaceholder}
              className="min-h-[420px] resize-y font-sans text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>

      <AiDisclaimer />
    </div>
  );
}
