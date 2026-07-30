# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate everyday workplace tasks using AI. Everything lives in one integrated, SaaS-style dashboard with sidebar navigation and clear input/output sections for each tool.

Live repository: https://github.com/Duppy67/ai-productivity-hub

---

## Project Overview

The AI Workplace Productivity Assistant is a single-page dashboard application designed for a real workplace environment. It brings three AI-powered assistants together behind one consistent interface, so a user can draft communication, plan their work, and research a topic without switching tools.

Every AI response is returned into an editable text area that can be revised, copied to the clipboard, or cleared and regenerated. A responsible-AI disclaimer is shown throughout the app, reminding users that AI-generated content should be reviewed before use and may contain inaccuracies.

---

## Features Implemented

### 1. Smart Email Generator
- Generates professional emails from a short description of intent.
- Tone selection: **Formal**, **Friendly**, **Persuasive**.
- Length control for short/standard/detailed messages.
- Output is fully editable and copyable.

### 2. AI Task Planner
- Builds **daily** or **weekly** schedules from a list of tasks and goals.
- Prioritises tasks and suggests time blocking.
- Produces productivity recommendations and highlights risks/overload.

### 3. AI Research Assistant
- **Summarize** mode: condenses pasted articles or notes into key points.
- **Explore** mode: researches a topic and returns key insights.
- Returns action points and practical recommendations.

### Application-wide
- Professional dashboard layout with a persistent sidebar.
- Dashboard overview page with feature cards.
- Fully responsive across desktop, tablet, and mobile.
- Consistent design system (semantic colour tokens, typography scale).
- Editable + copy-to-clipboard output on every tool.
- Carefully structured system prompts per feature for accurate, on-task AI responses.
- Loading states, error handling, and toast notifications.
- Responsible AI disclaimer component reused across all features.

---

## Technologies and Tools Used

| Area | Technology |
| --- | --- |
| Framework | React 19 + TanStack Start (full-stack, SSR-capable) |
| Routing | TanStack Router (file-based routes in `src/routes`) |
| Build tool | Vite 7 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (theme tokens in `src/styles.css`) |
| UI components | shadcn/ui + Radix UI primitives |
| Icons | lucide-react |
| Notifications | sonner |
| Fonts | Sora (display) + Manrope (body) |
| Server logic | TanStack `createServerFn` server functions |
| AI | Lovable AI Gateway (streaming chat completions) |
| Package manager | Bun |
| Deployment | Lovable hosting (edge runtime) |

### Key files

```
src/
├── routes/
│   ├── __root.tsx        # Root layout, sidebar provider, fonts, toaster
│   ├── index.tsx         # Dashboard overview
│   ├── email.tsx         # Smart Email Generator
│   ├── planner.tsx       # AI Task Planner
│   └── research.tsx      # AI Research Assistant
├── components/
│   ├── app-sidebar.tsx   # Sidebar navigation
│   ├── feature-panel.tsx # Reusable input/output panel
│   ├── ai-disclaimer.tsx # Responsible AI notice
│   └── ui/               # shadcn/ui components
├── lib/
│   └── ai.functions.ts   # Server function calling the AI Gateway
└── styles.css            # Design tokens & theme
```

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) 20+ or [Bun](https://bun.sh/) 1.1+
- A `LOVABLE_API_KEY` for the AI Gateway (automatically provided when running inside Lovable)

### 1. Clone the repository

```bash
git clone https://github.com/Duppy67/ai-productivity-hub.git
cd ai-productivity-hub
```

### 2. Install dependencies

```bash
bun install
# or: npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
LOVABLE_API_KEY=your_api_key_here
```

> This key is read **server-side only**, inside the server function in `src/lib/ai.functions.ts`. It is never exposed to the browser.

### 4. Start the development server

```bash
bun run dev
# or: npm run dev
```

The app runs at **http://localhost:8080**.

### 5. Build for production

```bash
bun run build
bun run preview
```

---

## Responsible AI Notice

This application uses generative AI. AI-generated content may contain inaccuracies, outdated information, or unintended bias. **Always review and verify AI output before sending, publishing, or acting on it**, especially for business communication, scheduling commitments, or research conclusions. Do not enter confidential or personally identifiable information into the input fields.

---

## Licence

Created for educational/submission purposes.
