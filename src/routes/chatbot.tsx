import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { chatReply } from "@/lib/ai.functions";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — Smart Admin Assist" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant for quick answers, drafting help, planning advice and next steps on any task.",
      },
      { property: "og:title", content: "AI Workplace Chatbot — Smart Admin Assist" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace questions and drafting help.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Rewrite this update so it sounds more confident",
  "What should I prioritise with 3 hours left today?",
  "Give me 5 agenda items for a project kickoff",
];

function ChatPage() {
  const tool = TOOLS[4]!;
  const send = useServerFn(chatReply);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await send({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: result.text }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The assistant is unavailable right now.");
    } finally {
      setLoading(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <AppShell eyebrow={tool.eyebrow} title={tool.title}>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {messages.length === 0 ? (
              <div className="rounded-xl bg-surface p-5 ring-1 ring-line">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">Assistant</p>
                <p className="mt-2 text-[14px] font-medium">
                  Ask about drafting, prioritising, summarising or planning your work.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => void submit(suggestion)}
                      className="rounded-full bg-paper px-3 py-1.5 text-left text-[12px] text-muted ring-1 ring-line hover:text-ink"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={index} className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl bg-brand px-4 py-2.5 text-[13px] leading-relaxed text-paper">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div key={index} className="max-w-[90%]">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Smart Admin Assist
                  </p>
                  <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink">
                    {message.content}
                  </div>
                </div>
              ),
            )}

            {loading ? (
              <p className="flex items-center gap-2 text-[12px] text-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-teal" />
                Thinking…
              </p>
            ) : null}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-line bg-surface px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void submit(input);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                rows={2}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void submit(input);
                  }
                }}
                placeholder="Ask the workplace assistant…"
                className="w-full resize-none rounded-lg border-0 bg-paper px-3 py-2.5 text-[13px] ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-lg bg-brand px-4 py-2.5 text-[13px] font-medium text-paper disabled:opacity-60"
              >
                Send
              </button>
            </form>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              AI-generated responses can be wrong or outdated. Verify anything important before
              acting on it, and keep confidential data out of your prompts.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
