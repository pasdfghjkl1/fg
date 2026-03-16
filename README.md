# Financial Life Game (MVP Foundation)

A desktop-first, local hot-seat, turn-based multiplayer financial life-sim board game for **2–6 players**.

This repository currently contains the **stage-1 foundation**:
- project scaffolding (React + TypeScript + Vite),
- a minimal app shell,
- placeholder screens,
- simple in-app screen navigation,
- architecture and development guidelines for future stages.

## Tech Stack
- React
- TypeScript
- Vite
- Plain CSS (simple, no additional UI framework)

## Getting Started

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Current Folder Structure

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   ├── components
│   │   └── ScreenLayout.tsx
│   ├── screens
│   │   ├── EndgameSummaryScreen.tsx
│   │   ├── GameScreen.tsx
│   │   ├── GameSetupScreen.tsx
│   │   └── MainMenuScreen.tsx
│   └── types
│       └── navigation.ts
└── README.md
```

## Minimal MVP Architecture (Scalable, but Simple)

### 1) Screen-driven app shell
`App.tsx` is the shell that decides which screen to render.
- It stores the current screen using local React state.
- It passes simple callbacks (`onNavigate`) to child screens.
- No routing library is used yet (intentionally minimal).

### 2) Feature isolation by folder
- `src/screens`: one file per major game phase/screen.
- `src/components`: shared UI building blocks.
- `src/types`: shared TypeScript domain/system types.

This keeps growth manageable as game complexity increases.

### 3) State strategy for early stages
- Keep state local to screen/shell unless shared state becomes necessary.
- Prefer React state/context.
- Do not introduce Redux/Zustand during MVP unless genuinely required.

## Current Placeholder Screens
- **Main Menu**
- **Game Setup**
- **Game Screen**
- **Endgame Summary**

These are intentionally placeholders without real game rules yet.

## Architecture Principles for Future Stages
1. **Keep it local-first and backend-free** (single shared screen, hot-seat play).
2. **Add features incrementally** (avoid full-system rewrites).
3. **Separate UI flow from game logic**:
   - screen transitions in shell/navigation layer,
   - game logic in dedicated modules when introduced.
4. **Prefer explicit TypeScript types** for game entities and turn/state transitions.
5. **Avoid overengineering**:
   - no heavy state library unless truly needed,
   - no network/auth/account layers.

## Development Rules (Future Stages)
- Keep changes focused to current stage.
- Do not refactor unrelated files.
- Keep app runnable at all times.
- Use existing styling approach (plain CSS unless project evolves intentionally).
- Maintain desktop-first UX priorities.
- Build reusable primitives only when there is a clear second use case.

## What’s Ready Now
- Project scaffolding is in place.
- A minimal, maintainable folder structure is established.
- Placeholder screens and navigation flow exist.
- Repository is ready for stage-2 game state modeling.

## Suggested Next Stage
1. Define core game domain types:
   - Player,
   - Turn,
   - Age/round progression,
   - Money/account model,
   - Win-condition scoring categories.
2. Add a basic game session state container.
3. Wire setup screen inputs into a created game session.
4. Render session/player summary on game screen using mocked progression.
