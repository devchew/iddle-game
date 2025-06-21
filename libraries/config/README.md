# Config Library

This library provides access to shared configuration for the IdleFactory project. The configuration is stored in YAML files and converted to JSON at build time.

## Usage

```typescript
import { entities, researchTree } from "@iddle-factory/config";

// Access entities configuration directly
console.log(entities.entities[0].name); // "Podstawowa kopalnia"

// Access research tree configuration directly
console.log(researchTree.tiers[0].upgrades[0].name); // "Efektywne górnictwo"
```

## TypeScript Types

This library exports the following TypeScript interfaces:

- `Entity` - A single entity in the game
- `Entities` - The complete list of entities
- `SciencePacks` - The science packs required for research
- `Upgrade` - A research upgrade
- `Unlock` - A research unlock
- `Tier` - A tier in the research tree
- `ResearchTree` - The complete research tree
