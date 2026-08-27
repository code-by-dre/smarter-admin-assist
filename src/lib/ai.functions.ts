import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runGeneration, runChat } from "./ai.server";

const GenerateSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  fields: z.record(z.string()),
});

const ChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      }),
    )
    .min(1),
});

export const generateOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateSchema.parse(input))
  .handler(async ({ data }) => runGeneration(data.tool, data.fields));

export const chatReply = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatSchema.parse(input))
  .handler(async ({ data }) => runChat(data.messages));
