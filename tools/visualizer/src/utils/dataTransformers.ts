import type {
	ResearchTree,
	Entities,
	Entity,
} from "@iddle-factory/config/types";

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

	researchTree.tiers.forEach((tier) => {
		// Process upgrades
		tier.upgrades.forEach((upgrade) => {
			const id = upgrade.id;
			const requirement = upgrade.requirement;

			if (requirement) {
				if (!map.has(requirement)) {
					map.set(requirement, []);
				}
				map.get(requirement)?.push(id);
			}
		});

		// Process unlocks
		tier.unlocks.forEach((unlock) => {
			const id = unlock.id;
			const requirement = unlock.requirement;

			if (requirement) {
				if (!map.has(requirement)) {
					map.set(requirement, []);
				}
				map.get(requirement)?.push(id);
			}
		});
	});

	return map;
};

// Collect all research items (upgrades and unlocks)
const collectAllResearchItems = (researchTree: ResearchTree) => {
	const items = new Map<
		string,
		{
			type: "upgrade" | "unlock";
			tier: number;
			data: any;
			processed: boolean;
		}
	>();

	researchTree.tiers.forEach((tier) => {
		// Process upgrades
		tier.upgrades.forEach((upgrade) => {
			items.set(upgrade.id, {
				type: "upgrade",
				tier: tier.tier,
				data: upgrade,
				processed: false,
			});
		});

		// Process unlocks
		tier.unlocks.forEach((unlock) => {
			items.set(unlock.id, {
				type: "unlock",
				tier: tier.tier,
				data: unlock,
				processed: false,
			});
		});
	});

	return items;
};

// Transform the research tree to a format suitable for visualization
export const transformResearchTree = (researchTree: ResearchTree): TreeNode => {
	const root: TreeNode = {
		name: "Research Tree",
		children: [],
	};

	// Get all research dependencies
	const requirementMap = createRequirementMap(researchTree);
	const allResearchItems = collectAllResearchItems(researchTree);

	// Find starting research items (those without requirements or with nonexistent requirements)
	const startingItems: string[] = [];
	allResearchItems.forEach((item, name) => {
		const requirement =
			item.type === "upgrade" ? item.data.requirement : item.data.requirement;

		if (!requirement || !allResearchItems.has(requirement)) {
			startingItems.push(name);
		}
	});

	// Process each starting item and build the tree
	startingItems.forEach((itemId) => {
		const processItem = (id: string): TreeNode | undefined => {
			const item = allResearchItems.get(id);
			if (!item || item.processed) return undefined;

			// Mark as processed to avoid circular dependencies
			item.processed = true;

			const node: TreeNode = {
				name: item.data.name,
				attributes: {
					id: id,
					type: item.type,
					tier: item.tier,
					...item.data,
				},
				children: [],
			};

			// Process dependencies
			const dependencies = requirementMap.get(id) || [];
			dependencies.forEach((dependentId) => {
				const childNode = processItem(dependentId);
				if (childNode) {
					node.children?.push(childNode);
				}
			});

			return node;
		};
		const itemNode = processItem(itemId);
		if (itemNode) {
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
	// Helper function to recursively process nodes
	const processNode = (node: TreeNode): TreeNode => {
		const newNode = { ...node };

		// Find entities with tech requirements matching this node's id attribute
		const nodeId = node.attributes?.id as string;
		const relatedEntities = entities.entities.filter(
			(entity) => entity.tech_requirement === nodeId,
		);

		if (relatedEntities.length > 0) {
			newNode.entityRefs = relatedEntities;
			newNode.attributes = {
				...newNode.attributes,
				hasEntities: true,
				entityCount: relatedEntities.length,
			};
		}

		// Process children recursively
		if (newNode.children && newNode.children.length > 0) {
			newNode.children = newNode.children.map((child) => processNode(child));
		}

		return newNode;
	};

	return processNode(newTreeData);
};
