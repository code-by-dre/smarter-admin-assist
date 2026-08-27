import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, GenerateWorkspace, inputClass } from "@/components/GenerateWorkspace";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Overload Workday Studio" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised daily or weekly schedule with time blocks, buffers and deferred work.",
      },
      { property: "og:title", content: "AI Task Planner — Overload Workday Studio" },
      {
        property: "og:description",
        content: "Prioritise tasks and generate a realistic time-blocked schedule you can edit.",
      },
    ],
  }),
  component: PlannerPage,
});

const EMPTY = {
  Horizon: "Today",
  "Working hours": "09:00–17:00",
  "Energy pattern": "Sharpest in the morning",
  Tasks: "",
  Constraints: "",
};

function PlannerPage() {
  const [fields, setFields] = useState(EMPTY);
  const tool = TOOLS[2]!;
  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return (
    <AppShell eyebrow={tool.eyebrow} title={tool.title}>
      <GenerateWorkspace
        tool="planner"
        fields={fields}
        outputLabel="Build schedule"
        placeholder="Your prioritised plan and time blocks will appear here."
        promptHint="Tasks are ranked P1–P3 with reasons, then time-boxed inside your working hours with breaks and a buffer."
        chips={[`Horizon · ${fields.Horizon}`, `Hours · ${fields["Working hours"]}`]}
        onReset={() => setFields(EMPTY)}
      >
        <Field label="Horizon">
          <select
            className={inputClass}
            value={fields.Horizon}
            onChange={(e) => set("Horizon")(e.target.value)}
          >
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This week</option>
          </select>
        </Field>
        <Field label="Working hours">
          <input
            className={inputClass}
            value={fields["Working hours"]}
            onChange={(e) => set("Working hours")(e.target.value)}
          />
        </Field>
        <div className="col-span-2">
          <Field label="Energy pattern">
            <select
              className={inputClass}
              value={fields["Energy pattern"]}
              onChange={(e) => set("Energy pattern")(e.target.value)}
            >
              <option>Sharpest in the morning</option>
              <option>Sharpest after lunch</option>
              <option>Late-day focus</option>
            </select>
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Tasks (one per line, add deadlines if known)">
            <textarea
              rows={8}
              className={`${inputClass} resize-none`}
              value={fields.Tasks}
              onChange={(e) => set("Tasks")(e.target.value)}
              placeholder={"Finish pricing deck — due Friday\nReview 3 PRs\nInterview debrief notes"}
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Fixed commitments & constraints">
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={fields.Constraints}
              onChange={(e) => set("Constraints")(e.target.value)}
              placeholder="Standup 09:15, client call 14:00–15:00, school pickup at 16:30"
            />
          </Field>
        </div>
      </GenerateWorkspace>
    </AppShell>
  );
}
