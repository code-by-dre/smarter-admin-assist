import { useServerFn } from "@tanstack/react-start";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { generateOutput } from "@/lib/ai.functions";
import type { GenerateFields } from "@/lib/prompts";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border-0 bg-surface px-3 py-2.5 text-[13px] ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-teal";

export function GenerateWorkspace({
  tool,
  fields,
  outputLabel,
  placeholder,
  promptHint,
  chips,
  children,
  onReset,
}: {
  tool: "email" | "notes" | "planner" | "research";
  fields: GenerateFields;
  outputLabel: string;
  placeholder: string;
  promptHint: string;
  chips: string[];
  children: ReactNode;
  onReset: () => void;
}) {
  const generate = useServerFn(generateOutput);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    const filled = Object.values(fields).some((value) => value.trim().length > 0);
    if (!filled) {
      toast.error("Add some context before generating.");
      return;
    }
    setLoading(true);
    try {
      const result = await generate({ data: { tool, fields } });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid flex-1 grid-cols-1 divide-y divide-line xl:grid-cols-2 xl:divide-x xl:divide-y-0">
      <section className="px-4 py-5 sm:px-6 xl:py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">Prompt</h2>
          <span className="text-[11px] text-muted">Structured</span>
        </div>

        <div className="grid grid-cols-2 gap-3">{children}</div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={run}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-brand py-2 pl-3 pr-4 text-[13px] font-medium text-paper ring-1 ring-brand/40 disabled:opacity-60"
          >
            <span className={`size-1.5 shrink-0 rounded-full bg-teal ${loading ? "animate-pulse" : ""}`} />
            {loading ? "Generating…" : outputLabel}
          </button>
          <button
            onClick={() => {
              onReset();
              setOutput("");
            }}
            className="rounded-lg px-3 py-2 text-[13px] font-medium text-muted ring-1 ring-line hover:bg-paper"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-teal" />
          <p>{promptHint}</p>
        </div>
      </section>

      <section className="bg-paper px-4 py-5 sm:px-6 xl:py-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">Output</h2>
            <span className="rounded-full bg-tealsoft px-2 py-0.5 text-[11px] font-medium text-teal">
              Editable
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (!output) return;
                void navigator.clipboard.writeText(output);
                toast.success("Copied to clipboard");
              }}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 ring-line hover:bg-surface"
            >
              Copy
            </button>
            <button
              onClick={run}
              disabled={loading}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 ring-line hover:bg-surface disabled:opacity-60"
            >
              Regenerate
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5">
          <textarea
            value={output}
            onChange={(event) => setOutput(event.target.value)}
            rows={16}
            placeholder={loading ? "Working on it…" : placeholder}
            className="w-full resize-none bg-transparent text-[13px] leading-relaxed text-ink focus:outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-surface px-2 py-1 text-[11px] text-muted ring-1 ring-line"
            >
              {chip}
            </span>
          ))}
          {output ? (
            <span className="rounded-full bg-surface px-2 py-1 text-[11px] text-muted ring-1 ring-line">
              {output.trim().split(/\s+/).length} words
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-tealsoft/60 p-3 ring-1 ring-teal/15">
          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-teal text-[9px] font-semibold text-paper">
            i
          </span>
          <p className="text-pretty text-[11px] leading-relaxed text-ink/70">
            AI-generated and editable. Always review accuracy, tone and facts before using or
            sending. Smart Admin Assist never acts on your behalf — you own the final output.
          </p>
        </div>
      </section>
    </div>
  );
}
