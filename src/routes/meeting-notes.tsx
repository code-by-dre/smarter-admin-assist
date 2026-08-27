import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, GenerateWorkspace, inputClass } from "@/components/GenerateWorkspace";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Overload Workday Studio" },
      {
        name: "description",
        content:
          "Turn long meeting notes or transcripts into a clean summary with decisions, owners, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Overload Workday Studio" },
      {
        property: "og:description",
        content: "Extract decisions, action items and deadlines from raw meeting notes in seconds.",
      },
    ],
  }),
  component: NotesPage,
});

const EMPTY = { Meeting: "", Attendees: "", "Detail level": "Balanced", Notes: "" };

function NotesPage() {
  const [fields, setFields] = useState(EMPTY);
  const tool = TOOLS[1]!;
  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return (
    <AppShell eyebrow={tool.eyebrow} title={tool.title}>
      <GenerateWorkspace
        tool="notes"
        fields={fields}
        outputLabel="Summarise notes"
        placeholder="Summary, decisions, action items and open questions will appear here."
        promptHint="Paste raw notes or a transcript. The model returns a summary plus decisions, owners and deadlines — it will not invent names or dates."
        chips={[`Detail · ${fields["Detail level"]}`, "Sections · 4"]}
        onReset={() => setFields(EMPTY)}
      >
        <div className="col-span-2">
          <Field label="Meeting">
            <input
              className={inputClass}
              value={fields.Meeting}
              onChange={(e) => set("Meeting")(e.target.value)}
              placeholder="Weekly product sync — 12 May"
            />
          </Field>
        </div>
        <Field label="Attendees">
          <input
            className={inputClass}
            value={fields.Attendees}
            onChange={(e) => set("Attendees")(e.target.value)}
            placeholder="Dana, Priya, Sam"
          />
        </Field>
        <Field label="Detail level">
          <select
            className={inputClass}
            value={fields["Detail level"]}
            onChange={(e) => set("Detail level")(e.target.value)}
          >
            <option>Tight</option>
            <option>Balanced</option>
            <option>Thorough</option>
          </select>
        </Field>
        <div className="col-span-2">
          <Field label="Raw notes or transcript">
            <textarea
              rows={10}
              className={`${inputClass} resize-none`}
              value={fields.Notes}
              onChange={(e) => set("Notes")(e.target.value)}
              placeholder="Paste the full notes here…"
            />
          </Field>
        </div>
      </GenerateWorkspace>
    </AppShell>
  );
}
