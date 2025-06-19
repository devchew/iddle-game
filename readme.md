# Idlle-Fatory

A mobile/web idle game inspired by Factorio, focused on factory automation, research, and planetary expansion. The project is structured as a TypeScript monorepo and targets modern browsers with offline progress and PWA support.

## Features
- Build and automate factories across multiple planets
- Idle and offline resource generation
- Technology research tree unlocking new machines and upgrades
- Planetary conquest and interplanetary logistics
- Responsive UI for mobile and desktop (PWA-ready)
- Social features: leaderboards, blueprint sharing, community events

## Tech Stack
- **TypeScript** (monorepo, workspaces)
- **Vite** (bundler)
- **Phaser 3** or **PixiJS** (2D rendering)
- **React** (UI, optional)
- **IndexedDB** (persistent game state)
- **Service Workers** (offline/PWA)
- **Jest/Vitest** (testing)

## Project Structure
- `apps/` – main game and related apps (currently empty)
- `libraries/` – shared code and logic (currently empty)
- `tools/` – build and dev tools (currently empty)
- `config/` – game entities and research tree definitions (YAML)
- `docs/` – design, architecture, and gameplay documentation

## Getting Started
This repo uses [pnpm](https://pnpm.io/) and [turborepo](https://turbo.build/) for monorepo management.

```bash
pnpm install
# See package.json/scripts for available commands
```

## Documentation
- Game design: `docs/design.md`
- Architecture: `docs/architecture.md`
- Entities: `docs/entities.md`
- Research tree: `docs/research-tree.md`

---
For roadmap, milestones, and backlog, see `docs/design.md` (section 5).
