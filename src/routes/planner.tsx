import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck } from "lucide-react";

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

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      {
        name: "description",
        content:
          "Turn a task list into a prioritized daily or weekly schedule with AI productivity recommendations.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI" },
      {
        property: "og:description",
        content: "Prioritize tasks and build a realistic daily or weekly schedule with AI.",
      },
    ],
  }),
  component: PlannerPage,
});

const HORIZONS = ["Daily plan", "Weekly plan"] as const;
const STYLES = ["Balanced", "Deep-focus first", "Quick wins first"] as const;

function PlannerPage() {
  const [horizon, setHorizon] = useState<(typeof HORIZONS)[number]>("Daily plan");
  const [style, setStyle] = useState<(typeof STYLES)[number]>("Balanced");
  const [hours, setHours] = useState("8");
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState("");

  return (
    <FeaturePanel
      title="AI Task Planner"
      description="Prioritized schedules and productivity recommendations from a raw task list."
      icon={<CalendarCheck className="size-5" />}
      submitLabel="Build my plan"
      outputLabel="Your plan"
      outputPlaceholder="Your prioritized schedule will appear here — adjust it to fit your day."
      canSubmit={tasks.trim().length > 3}
      inputs={
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Plan type</Label>
              <Select value={horizon} onValueChange={(v) => setHorizon(v as typeof horizon)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HORIZONS.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Working style</Label>
              <Select value={style} onValueChange={(v) => setStyle(v as typeof style)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hours">Available hours per day</Label>
              <Input
                id="hours"
                inputMode="numeric"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your role (optional)</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Product Manager"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tasks">Tasks, deadlines and meetings</Label>
            <Textarea
              id="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={"One per line, e.g.\nFinish Q3 report (due Thursday)\nClient call 11:00\nReview 3 design specs"}
              className="min-h-[180px] resize-y"
            />
          </div>
        </>
      }
      buildRequest={() => ({
        system:
          "You are a pragmatic productivity coach and planning assistant for busy professionals. " +
          "You build realistic, time-boxed schedules that respect the stated available hours, include short breaks, " +
          "and never over-commit the user. Use plain text with clear headings, time blocks and bullet points. " +
          "Do not invent deadlines or meetings that were not provided.",
        prompt: [
          `Plan type: ${horizon}`,
          `Working style preference: ${style}`,
          `Available hours per day: ${hours || "8"}`,
          `Role: ${role || "not specified"}`,
          "",
          "Tasks and commitments:",
          tasks,
          "",
          "Produce, in this order:",
          "1. PRIORITIES — rank the tasks as High / Medium / Low with a one-line reason each.",
          `2. SCHEDULE — time-blocked ${horizon === "Weekly plan" ? "day-by-day weekly" : "hour-by-hour daily"} plan that fits the available hours.`,
          "3. PRODUCTIVITY RECOMMENDATIONS — 3-5 specific, actionable suggestions based on this workload.",
          "4. RISKS — anything that looks unrealistic, at risk of slipping, or worth delegating.",
        ].join("\n"),
      })}
    />
  );
}
