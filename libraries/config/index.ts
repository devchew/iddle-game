// Shared config library entry point
export * from './entities';
export * from './research-tree';
export * from './types';

// Re-export entities and research tree with nicer names
import { entities } from './entities';
import { researchTree } from './research-tree';

export {
  entities,
  researchTree
};
