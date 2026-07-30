import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpenCheck } from "lucide-react";

import { FeaturePanel } from "@/components/feature-panel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      {
        name: "description",
        content:
          "Summarize articles or topics into key insights, action points and recommendations you can act on.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "Turn long articles or broad topics into concise insights and action points.",
      },
    ],
  }),
  component: ResearchPage,
});

const MODES = ["Summarize pasted text", "Explore a topic"] as const;
const DEPTHS = ["Executive brief", "Standard", "In-depth"] as const;

function ResearchPage() {
  const [mode, setMode] = useState<(typeof MODES)[number]>("Summarize pasted text");
  const [depth, setDepth] = useState<(typeof DEPTHS)[number]>("Standard");
  const [content, setContent] = useState("");

  return (
    <FeaturePanel
      title="AI Research Assistant"
      description="Key insights, action points and recommendations from any article or topic."
      icon={<BookOpenCheck className="size-5" />}
      submitLabel="Summarize"
      outputLabel="Research brief"
      outputPlaceholder="Your research brief will appear here — verify facts before sharing."
      canSubmit={content.trim().length > 3}
      inputs={
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={(v) => setDepth(v as typeof depth)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPTHS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              {mode === "Explore a topic" ? "Topic or question" : "Article text"}
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                mode === "Explore a topic"
                  ? "e.g. How are mid-size firms adopting AI in customer support?"
                  : "Paste the article or report text here…"
              }
              className="min-h-[260px] resize-y"
            />
          </div>
        </>
      }
      buildRequest={() => ({
        system:
          "You are a rigorous research analyst supporting business decision-makers. " +
          "Be precise and neutral. When summarizing supplied text, use only that text. When exploring a topic from general " +
          "knowledge, clearly flag uncertainty and state that claims should be verified against primary sources. " +
          "Never fabricate statistics, citations or sources. Use plain text with clear headings and bullet points.",
        prompt: [
          `Mode: ${mode}`,
          `Depth: ${depth} (Executive brief = ~150 words, Standard = ~350 words, In-depth = ~600 words)`,
          "",
          mode === "Explore a topic" ? "Topic:" : "Source text:",
          content,
          "",
          "Produce, in this order:",
          "1. SUMMARY — a concise overview.",
          "2. KEY INSIGHTS — 4-6 bullet points with the most decision-relevant findings.",
          "3. ACTION POINTS — concrete next steps a professional could take this week.",
          "4. RECOMMENDATIONS — your considered guidance, with trade-offs.",
          "5. VERIFY — what should be independently checked before relying on this.",
        ].join("\n"),
      })}
    />
  );
}
