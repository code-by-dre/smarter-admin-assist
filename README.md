# Smart Admin Assist — AI Workplace Productivity

A focused AI productivity dashboard built with **TanStack Start**, **React**, and **Tailwind CSS**. Smart Admin Assist bundles five workplace tools — email drafting, meeting notes summarisation, task planning, research briefing, and a general assistant chat — behind a single, calm, editorial-style UI.

## Live Demo

- Preview: `https://preview--smarter-admin-assist.lovable.app/`
- Published: `https://smarter-admin-assist.lovable.app`

## Features

- **Smart Email Generator** — Draft tone-matched professional emails from a topic, recipient, tone, length, and short context brief.
- **Meeting Notes Summarizer** — Turn raw notes or a transcript into a summary with decisions, owners, action items, and deadlines — without inventing names or dates.
- **AI Task Planner** — Convert a messy task list into a prioritised (P1–P3), time-blocked schedule that respects working hours, energy patterns, and fixed commitments.
- **AI Research Assistant** — Summarise a topic or pasted article into key points, insights, next steps, and what to fact-check (no live web access, and the UI says so).
- **Assistant Chat** — Freeform chat for drafting help, prioritisation, and quick workplace questions, with suggested starter prompts.
- **Consistent Generate Workspace** — Shared `GenerateWorkspace` component gives every tool the same input → prompt → output pattern, with chips summarising the current settings.
- **Resilient by design** — Server-function calls are wrapped in try/catch with toast notifications on failure, so a flaky AI response never breaks the page.
- **Responsive shell** — Shared `AppShell` layout with eyebrow/title headers keeps navigation and framing consistent across tools.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| UI Library | React |
| Styling | Tailwind CSS |
| Routing | TanStack Router (file-based) |
| Data/Server | TanStack Query + TanStack Start server functions |
| Notifications | Sonner |
| Icons / UI primitives | shadcn/ui-style components |

## Project Structure

src/
├── components/

│ ├── AppShell.tsx # Shared page shell (eyebrow, title, layout)

│ ├── GenerateWorkspace.tsx # Shared input → prompt → output pattern

│ └── ui/ # UI primitives (e.g. sonner Toaster)

├── lib/

│ ├── ai.functions.ts # Server functions (chatReply, etc.)

│ ├── tools.ts # Tool metadata (eyebrow, title) per route

│ └── lovable-error-reporting.ts

├── routes/ # TanStack file-based routes

│ ├── __root.tsx # Root layout, error/not-found boundaries

│ ├── index.tsx # Smart Email Generator

│ ├── meeting-notes.tsx # Meeting Notes Summarizer

│ ├── task-planner.tsx # AI Task Planner

│ ├── research.tsx # AI Research Assistant

│ └── chatbot.tsx # Assistant Chat

└── styles.css # Global theme & Tailwind config


## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- Bun or npm

### Install Dependencies

```sh
bun install
# or
npm install
```

### Run Development Server

```sh
bun run dev
# or
npm run dev
```

Open `http://localhost:8080` in your browser.

### Build for Production

```sh
bun run build
# or
npm run build
```

## Deployment

This project is configured for Lovable Cloud / edge deployment. Connect your GitHub repository in the Lovable editor to enable automatic deployments on every push.

## Customization

- **Tools**: Add or edit entries in `src/lib/tools.ts` to change the eyebrow/title shown per route.
- **Prompts & fields**: Each tool route (`index.tsx`, `meeting-notes.tsx`, `task-planner.tsx`, `research.tsx`) defines its own `EMPTY` field state and form layout — edit these to change inputs.
- **AI logic**: Server-side generation logic lives in `src/lib/ai.functions.ts`.
- **Theme**: Adjust design tokens and colors in `src/styles.css`.
- **Routes**: Add new pages under `src/routes/` using TanStack Router file-based conventions.

## Disclaimer

AI-generated responses can be wrong or outdated. Verify anything important before acting on it, and keep confidential data out of prompts.

## License

MIT — feel free to fork, remix, and ship your own version.

---

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
