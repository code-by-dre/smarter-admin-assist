import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, GenerateWorkspace, inputClass } from "@/components/GenerateWorkspace";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Overload Workday Studio" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in any tone with Overload, an AI productivity dashboard for email, meeting notes, planning, research and chat.",
      },
      { property: "og:title", content: "Smart Email Generator — Overload Workday Studio" },
      {
        property: "og:description",
        content: "Generate tone-matched professional emails from a short brief, then edit before sending.",
      },
    ],
  }),
  component: EmailPage,
});

const EMPTY = { Topic: "", Recipient: "", Tone: "Formal", Length: "Concise", Context: "" };

function EmailPage() {
  const [fields, setFields] = useState(EMPTY);
  const tool = TOOLS[0]!;
  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return (
    <AppShell eyebrow={tool.eyebrow} title={tool.title}>
      <GenerateWorkspace
        tool="email"
        fields={fields}
        outputLabel="Generate email"
        placeholder="Your generated email will appear here, ready to edit."
        promptHint="Your topic, recipient, tone and length are sent as a structured prompt. You stay in control of the final copy."
        chips={[`Tone · ${fields.Tone}`, `Length · ${fields.Length}`]}
        onReset={() => setFields(EMPTY)}
      >
        <div className="col-span-2">
          <Field label="Topic">
            <input
              className={inputClass}
              value={fields.Topic}
              onChange={(e) => set("Topic")(e.target.value)}
              placeholder="Follow-up on the Q3 budget review"
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Recipient">
            <input
              className={inputClass}
              value={fields.Recipient}
              onChange={(e) => set("Recipient")(e.target.value)}
              placeholder="Priya Shah · vendor lead"
            />
          </Field>
        </div>
        <Field label="Tone">
          <select
            className={inputClass}
            value={fields.Tone}
            onChange={(e) => set("Tone")(e.target.value)}
          >
            <option>Formal</option>
            <option>Friendly</option>
            <option>Persuasive</option>
            <option>Apologetic</option>
          </select>
        </Field>
        <Field label="Length">
          <select
            className={inputClass}
            value={fields.Length}
            onChange={(e) => set("Length")(e.target.value)}
          >
            <option>Concise</option>
            <option>Medium</option>
            <option>Detailed</option>
          </select>
        </Field>
        <div className="col-span-2">
          <Field label="Audience & context">
            <textarea
              rows={5}
              className={`${inputClass} resize-none`}
              value={fields.Context}
              onChange={(e) => set("Context")(e.target.value)}
              placeholder="The vendor delivered the analytics module two weeks late. Keep the relationship warm but ask for a revised milestone plan by Friday."
            />
          </Field>
        </div>
      </GenerateWorkspace>
    </AppShell>
  );
}
