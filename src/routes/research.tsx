import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, GenerateWorkspace, inputClass } from "@/components/GenerateWorkspace";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Overload Workday Studio" },
      {
        name: "description",
        content:
          "Summarise a topic or pasted article and get key points, insights, recommended next steps and what to fact-check.",
      },
      { property: "og:title", content: "AI Research Assistant — Overload Workday Studio" },
      {
        property: "og:description",
        content: "Topic and article summaries with insights, recommendations and verification notes.",
      },
    ],
  }),
  component: ResearchPage,
});

const EMPTY = { Topic: "", Audience: "", Depth: "Briefing", "Source text": "" };

function ResearchPage() {
  const [fields, setFields] = useState(EMPTY);
  const tool = TOOLS[3]!;
  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return (
    <AppShell eyebrow={tool.eyebrow} title={tool.title}>
      <GenerateWorkspace
        tool="research"
        fields={fields}
        outputLabel="Research topic"
        placeholder="Overview, key points, insights and next steps will appear here."
        promptHint="Paste an article to summarise it, or leave it blank to work from the topic alone. The assistant has no live web access, so it flags what to verify."
        chips={[`Depth · ${fields.Depth}`, "No live web access"]}
        onReset={() => setFields(EMPTY)}
      >
        <div className="col-span-2">
          <Field label="Topic or question">
            <input
              className={inputClass}
              value={fields.Topic}
              onChange={(e) => set("Topic")(e.target.value)}
              placeholder="How are mid-size SaaS teams adopting AI workflows?"
            />
          </Field>
        </div>
        <Field label="Audience">
          <input
            className={inputClass}
            value={fields.Audience}
            onChange={(e) => set("Audience")(e.target.value)}
            placeholder="Exec leadership"
          />
        </Field>
        <Field label="Depth">
          <select
            className={inputClass}
            value={fields.Depth}
            onChange={(e) => set("Depth")(e.target.value)}
          >
            <option>Quick scan</option>
            <option>Briefing</option>
            <option>Deep dive</option>
          </select>
        </Field>
        <div className="col-span-2">
          <Field label="Article or source text (optional)">
            <textarea
              rows={8}
              className={`${inputClass} resize-none`}
              value={fields["Source text"]}
              onChange={(e) => set("Source text")(e.target.value)}
              placeholder="Paste the article you want summarised…"
            />
          </Field>
        </div>
      </GenerateWorkspace>
    </AppShell>
  );
}
