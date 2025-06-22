import type {
	ResearchTree,
	Entities,
	Entity,
	Research,
} from "@iddle-factory/config";

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

	if (!researchTree.tiers || !Array.isArray(researchTree.tiers)) {
		console.error("Invalid research tree structure:", researchTree);
		return map;
	}

	researchTree.tiers.forEach((research) => {
		const id = research.id;
		
		// Check if this research unlocks other research through requirements
		researchTree.tiers.forEach((potentialDependency) => {
			// Skip if the requirement is missing or not an array
			if (!potentialDependency.requirement || !Array.isArray(potentialDependency.requirement)) {
				return;
			}
			
			potentialDependency.requirement.forEach(req => {
				if (req && req.id === id) {
					if (!map.has(id)) {
						map.set(id, []);
					}
					map.get(id)?.push(potentialDependency.id);
				}
			});
		});
	});

	return map;
};

// Transform the research tree to a format suitable for visualization
export const transformResearchTree = (researchTree: ResearchTree): TreeNode => {
	console.log("Transforming research tree:", researchTree);

	// Safety check for null/undefined researchTree
	if (!researchTree) {
		console.error("Research tree is null or undefined");
		return { name: "Research Tree (Error)", children: [] };
	}
	
	const root: TreeNode = {
		name: "Research Tree",
		children: [],
	};

	// Get all research dependencies
	const requirementMap = createRequirementMap(researchTree);
	
	// Find starting research items (those with "initial" requirement or no requirements)
	const startingItems: Research[] = (researchTree.tiers || []).filter((research) => 
		research?.requirement && Array.isArray(research.requirement) ?
			research.requirement.some(req => req?.id === "initial") :
			true // If no requirements, consider it a starting item
	);

	// Create a map for quick look-up
	const researchMap = new Map<string, Research>();
	(researchTree.tiers || []).forEach(research => {
		if (research && research.id) {
			researchMap.set(research.id, research);
		}
	});

	// Process each starting item and build the tree
	const processedNodes = new Set<string>();
	
	startingItems.forEach((startingItem) => {
		const processItem = (research: Research): TreeNode => {
			// Ensure the research object is valid
			if (!research) {
				console.error("Invalid research object:", research);
				return { name: "Unknown Research", children: [] };
			}
			
			const node: TreeNode = {
				name: research.name || "Unnamed Research",
				attributes: {
					id: research.id || "",
					type: research.upgrade ? "upgrade" : (research.unlocks ? "unlock" : "research"),
					hasUpgrade: !!research.upgrade,
					unlockCount: research.unlocks ? research.unlocks.length : 0,
				},
				children: [],
			};

			// Process dependencies
			const dependencies = requirementMap.get(research.id) || [];
			dependencies.forEach((dependentId) => {
				if (!processedNodes.has(dependentId)) {
					processedNodes.add(dependentId);
					const dependentResearch = researchMap.get(dependentId);
					if (dependentResearch) {
						const childNode = processItem(dependentResearch);
						node.children?.push(childNode);
					}
				}
			});

			return node;
		};
		
		const itemNode = processItem(startingItem);
		if (!processedNodes.has(startingItem.id)) {
			processedNodes.add(startingItem.id);
			root.children?.push(itemNode);
		}
	});

	return root;
};

// Connect entities to research tree nodes
export const connectEntitiesToResearchTree = (
	treeData: TreeNode,
	entities: Entities,
): TreeNode => {
	const newTreeData = { ...treeData };
	
	// Handle case where entities is null or undefined
	if (!entities || !entities.entities || !Array.isArray(entities.entities)) {
		console.error("Invalid entities structure:", entities);
		return newTreeData;
	}
	
	// Helper function to recursively process nodes
	const processNode = (node: TreeNode): TreeNode => {
		// Handle case where node is null or undefined
		if (!node) {
			return { name: "Unknown Node", children: [] };
		}
		
		const newNode = { ...node };

		// Find entities that are unlocked by this research
		const nodeId = node.attributes?.id as string;
		
		if (nodeId) {
			try {
				// Find related entities that could be unlocked by this research
				const relatedEntities = entities.entities.filter((entity) => {
					// Safety check for entity
					if (!entity) return false;
					
					// Check if this research unlocks the entity directly
					// For now, just check if entity ID matches research ID
					return entity.id === nodeId; 
				});

				if (relatedEntities && relatedEntities.length > 0) {
					newNode.entityRefs = relatedEntities;
					newNode.attributes = {
						...newNode.attributes,
						hasEntities: true,
						entityCount: relatedEntities.length,
					};
				}
			} catch (error) {
				console.error("Error filtering entities:", error);
			}
		}

		// Process children recursively
		if (newNode.children && newNode.children.length > 0) {
			newNode.children = newNode.children.map((child) => processNode(child));
		}

		return newNode;
	};

	return processNode(newTreeData);
};
