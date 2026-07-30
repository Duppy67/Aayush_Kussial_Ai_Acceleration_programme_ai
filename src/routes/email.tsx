import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

import { FeaturePanel } from "@/components/feature-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in a formal, friendly or persuasive tone, then edit and copy the result.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI" },
      {
        property: "og:description",
        content: "Draft professional emails with tone control and fully editable output.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Formal", "Friendly", "Persuasive"] as const;
const LENGTHS = ["Short", "Medium", "Detailed"] as const;

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Formal");
  const [length, setLength] = useState<(typeof LENGTHS)[number]>("Medium");
  const [context, setContext] = useState("");

  return (
    <FeaturePanel
      title="Smart Email Generator"
      description="Professional emails with tone control, ready to edit and send."
      icon={<Mail className="size-5" />}
      submitLabel="Generate email"
      outputLabel="Generated email"
      outputPlaceholder="Your generated email will appear here — edit it freely before sending."
      canSubmit={context.trim().length > 3}
      inputs={
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Head of Operations"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject / purpose</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Project timeline update"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Length</Label>
              <Select value={length} onValueChange={(v) => setLength(v as typeof length)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LENGTHS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Key points to include</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Explain what happened, what you need, deadlines, any constraints…"
              className="min-h-[180px] resize-y"
            />
          </div>
        </>
      }
      buildRequest={() => ({
        system:
          "You are an expert business communication assistant writing on behalf of a professional. " +
          "Write clear, concise, well-structured workplace emails. Never invent facts, names, figures or commitments " +
          "that were not provided; use neutral placeholders in square brackets instead. " +
          "Return only the email: a subject line, greeting, body paragraphs, and a sign-off. No commentary or markdown fences.",
        prompt: [
          `Tone: ${tone}`,
          `Length: ${length} (Short = under 100 words, Medium = 120-180 words, Detailed = 200-300 words)`,
          `Recipient: ${recipient || "not specified — use a neutral greeting"}`,
          `Subject or purpose: ${subject || "infer from the key points"}`,
          "",
          "Key points to convey:",
          context,
          "",
          "Write the email now. Start with 'Subject: '.",
        ].join("\n"),
      })}
    />
  );
}
