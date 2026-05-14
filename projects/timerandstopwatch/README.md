# Timer and Stopwatch

A simple React app with two time tools:

- Timer with minute and second inputs
- Stopwatch with minutes, seconds, and milliseconds
- Start, pause, resume, and reset controls
- Clean responsive UI built with Tailwind CSS

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Remix Icon React

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

Run lint checks:

```bash
pnpm run lint
```

Preview the production build:

```bash
pnpm run preview
```

## Project Structure

```text
timerandstopwatch/
├── public/
├── src/
│   ├── components/
│   │   ├── Stopwatch.tsx
│   │   └── Timer.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## Features

### Timer

Enter minutes and seconds, then start the countdown. The timer can be paused, resumed, or reset. When the countdown reaches zero, the app shows a "Time's up" alert.

### Stopwatch

Start the stopwatch to count upward in milliseconds. It includes pause and reset controls.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm run dev` | Runs the app in development mode |
| `pnpm run build` | Creates a production build |
| `pnpm run lint` | Runs ESLint checks |
| `pnpm run preview` | Previews the production build locally |

## Author

Built as part of the Chai Code Cohort.
