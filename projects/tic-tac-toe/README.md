# Tic Tac Toe

A simple Tic Tac Toe game built with React, TypeScript, Vite, and Tailwind CSS.

The app lets two players take turns as `X` and `O`, detects a winner across rows, columns, and diagonals, handles draw games, and includes a reset button to start over.

## Features

- Two-player Tic Tac Toe gameplay
- Turn indicator for `X` and `O`
- Winner detection
- Draw detection
- Reset game button
- Responsive centered layout
- Styled with Tailwind CSS

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Run linting:

```bash
pnpm lint
```

## Project Structure

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    Board.tsx
```

## How It Works

The main game logic lives in `src/components/Board.tsx`.

- The board is stored as an array of 9 cells.
- `isXTurn` tracks the current player.
- `calculateWinner` checks all winning patterns.
- A draw is detected when every cell is filled and there is no winner.
- `resetGame` clears the board and gives the first turn back to `X`.
