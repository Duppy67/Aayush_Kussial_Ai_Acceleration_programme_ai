import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, CalendarCheck, BookOpenCheck, ArrowRight, Zap, ShieldCheck } from "lucide-react";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Dashboard" },
      {
        name: "description",
        content:
          "AI Productivity Hub is a web application that automates workplace tasks for professionals using AI.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant — Dashboard" },
      {
        property: "og:description",
        content:
          "AI Productivity Hub is a web application that automates workplace tasks for professionals using AI.",
      },
    ],
  }),
  component: Overview,
});

const features = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Professional emails in Formal, Friendly or Persuasive tone — fully editable before sending.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    body: "Turn a messy task list into a prioritized daily or weekly schedule with focus recommendations.",
  },
  {
    to: "/research",
    icon: BookOpenCheck,
    title: "AI Research Assistant",
    body: "Summarize an article or topic into key insights, action points and clear recommendations.",
  },
] as const;

function Overview() {
  return (
    <div className="space-y-8">
      <section
        className="rounded-3xl border border-border/70 p-8 shadow-[var(--shadow-panel)]"
        style={{ backgroundImage: "var(--gradient-surface)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Workplace AI
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Automate the everyday work that slows your day down.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Three focused assistants for writing, planning and research — in one clean workspace, with
          output you can edit and copy straight into your tools.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Draft an email <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Plan my week
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.to} to={feature.to} className="group">
            <Card className="h-full border-border/70 shadow-none transition-colors group-hover:border-primary/50">
              <CardHeader>
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="mt-3 font-display text-base">{feature.title}</CardTitle>
                <CardDescription className="leading-relaxed">{feature.body}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-medium text-primary">
                Open
                <ArrowRight className="ml-1 inline size-4 transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Zap className="size-5" />
            </span>
            <CardTitle className="mt-3 font-display text-base">Built for real work</CardTitle>
            <CardDescription className="leading-relaxed">
              Structured prompts behind every feature keep responses specific, professional and
              ready to use — not generic filler.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <CardTitle className="mt-3 font-display text-base">You stay in control</CardTitle>
            <CardDescription className="leading-relaxed">
              Every result is editable and copyable, so a human always makes the final call before
              anything leaves your desk.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <AiDisclaimer />
    </div>
  );
}
