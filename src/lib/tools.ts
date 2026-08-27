export type ToolNavItem = {
  to: string;
  label: string;
  short: string;
  eyebrow: string;
  title: string;
};

export const TOOLS: ToolNavItem[] = [
  {
    to: "/",
    label: "Smart Email",
    short: "Email",
    eyebrow: "Smart Email",
    title: "Draft a professional email",
  },
  {
    to: "/meeting-notes",
    label: "Meeting Notes",
    short: "Notes",
    eyebrow: "Meeting Notes",
    title: "Summarise notes into decisions & actions",
  },
  {
    to: "/task-planner",
    label: "Task Planner",
    short: "Planner",
    eyebrow: "Task Planner",
    title: "Build a prioritised schedule",
  },
  {
    to: "/research",
    label: "Research Assistant",
    short: "Research",
    eyebrow: "Research Assistant",
    title: "Summarise a topic and get insights",
  },
  {
    to: "/chatbot",
    label: "Chatbot",
    short: "Chat",
    eyebrow: "Chatbot",
    title: "Ask the workplace assistant",
  },
];
