import { streamText } from "ai";
import { createLovableAiGatewayProvider, CHAT_MODEL } from "./ai-gateway.server";
import { buildSystemPrompt, buildUserPrompt, type GenerateFields, type ToolId } from "./prompts";

function getModel() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this workspace.");
  return createLovableAiGatewayProvider(key)(CHAT_MODEL);
}

export async function runGeneration(tool: ToolId, fields: GenerateFields) {
  const result = streamText({
    model: getModel(),
    system: buildSystemPrompt(tool),
    prompt: buildUserPrompt(tool, fields),
  });
  return { text: await result.text };
}

export async function runChat(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  const result = streamText({
    model: getModel(),
    system: buildSystemPrompt("chat"),
    messages,
  });
  return { text: await result.text };
}
