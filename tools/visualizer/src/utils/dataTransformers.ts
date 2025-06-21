import type { ResearchTree, Entities, Entity } from "@iddle-factory/config/types";

// For react-d3-tree
export interface TreeNode {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children?: TreeNode[];
  entityRefs?: Entity[];
}

// Helper to create a map of requirements to their respective nodes
const createRequirementMap = (researchTree: ResearchTree) => {
  const map = new Map<string, string[]>();
  
  researchTree.tiers.forEach(tier => {
    // Process upgrades
    tier.upgrades.forEach(upgrade => {
      const name = upgrade.name;
      const requirement = upgrade.requirement;
      
      if (requirement) {
        if (!map.has(requirement)) {
          map.set(requirement, []);
        }
        map.get(requirement)?.push(name);
      }
    });
    
    // Process unlocks
    tier.unlocks.forEach(unlock => {
      const name = unlock.name;
      const requirement = unlock.requirement;
      
      if (requirement) {
        if (!map.has(requirement)) {
          map.set(requirement, []);
        }
        map.get(requirement)?.push(name);
      }
    });
  });
  
  return map;
};

// Collect all research items (upgrades and unlocks)
const collectAllResearchItems = (researchTree: ResearchTree) => {
  const items = new Map<string, { 
    type: 'upgrade' | 'unlock', 
    tier: number, 
    data: any,
    processed: boolean
  }>();
  
  researchTree.tiers.forEach(tier => {
    // Process upgrades
    tier.upgrades.forEach(upgrade => {
      items.set(upgrade.name, { 
        type: 'upgrade', 
        tier: tier.tier, 
        data: upgrade,
        processed: false
      });
    });
    
    // Process unlocks
    tier.unlocks.forEach(unlock => {
      items.set(unlock.name, { 
        type: 'unlock', 
        tier: tier.tier, 
        data: unlock,
        processed: false
      });
    });
  });
  
  return items;
};

// Transform the research tree to a format suitable for visualization
export const transformResearchTree = (researchTree: ResearchTree): TreeNode => {
  const root: TreeNode = {
    name: "Research Tree",
    children: []
  };
  
  // Get all research dependencies
  const requirementMap = createRequirementMap(researchTree);
  const allResearchItems = collectAllResearchItems(researchTree);
  
  // Find starting research items (those without requirements or with nonexistent requirements)
  const startingItems: string[] = [];
  allResearchItems.forEach((item, name) => {
    const requirement = item.type === 'upgrade' 
      ? item.data.requirement 
      : item.data.requirement;
      
    if (!requirement || !allResearchItems.has(requirement)) {
      startingItems.push(name);
    }
  });
  
  // Process each starting item and build the tree
  startingItems.forEach(itemName => {
    const processItem = (name: string): TreeNode | undefined => {
      const item = allResearchItems.get(name);
      if (!item || item.processed) return undefined;
      
      // Mark as processed to avoid circular dependencies
      item.processed = true;
      
      const node: TreeNode = {
        name: name,
        attributes: {
          type: item.type,
          tier: item.tier,
          ...item.data
        },
        children: []
      };
      
      // Process dependencies
      const dependencies = requirementMap.get(name) || [];
      dependencies.forEach(dependentName => {
        const childNode = processItem(dependentName);
        if (childNode) {
          node.children?.push(childNode);
        }
      });
      
      return node;
    };
    
    const itemNode = processItem(itemName);
    if (itemNode) {
      root.children?.push(itemNode);
    }
  });

  return root;
};

// Connect entities to research tree nodes
export const connectEntitiesToResearchTree = (
  treeData: TreeNode,
  entities: Entities
): TreeNode => {
  const newTreeData = { ...treeData };

  // Helper function to recursively process nodes
  const processNode = (node: TreeNode): TreeNode => {
    const newNode = { ...node };
    
    // Find entities with tech requirements matching this node's name
    const relatedEntities = entities.entities.filter(
      entity => entity.tech_requirement === node.name
    );
    
    if (relatedEntities.length > 0) {
      newNode.entityRefs = relatedEntities;
      newNode.attributes = {
        ...newNode.attributes,
        hasEntities: true,
        entityCount: relatedEntities.length
      };
    }
    
    // Process children recursively
    if (newNode.children && newNode.children.length > 0) {
      newNode.children = newNode.children.map(child => processNode(child));
    }
    
    return newNode;
  };

  return processNode(newTreeData);
};
