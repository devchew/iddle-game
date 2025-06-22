export type EntityType = 'building' | 'research' | 'fuel' | 'resource';

export type Entity = {
	// Unique identifier for the entity
	id: string;
	// Name of the entity
	name: string;

	// type of the entity
	type: EntityType;
	// Time in seconds to craft this entity
	craft_time: number; 
	
	// Amount of this entity produced per craft
	craft_amount: number; 

	// cost of creation
	craft_cost: {
		id: string; // ID of the entity
		amount: number; // Amount of the entity required for this entity
	}[];
	// cost of operation
	operation_cost: {
		type: EntityType;
		ammount: number; // Amount of the entity required for this operation
	}[];
}

export type Entities = {
	entities: Entity[];
}

export type Upgrade = {
	id: string;
	name: string;
	effects: {
		id: string; // ID of the entity or research this upgrade affects
		element: string; // The element to modify (e.g., 'craft_time', 'craft_amount')
		amount: number; // The amount to modify the element by
	}[]
}

export type Upgrades = {
	upgrades: Upgrade[];
}

export type Research = {
	// Unique identifier for the research
	id: string;
	// Name of the research
	name: string;
	/**
	 * The requirement for this research to be completed
	 */
	requirement: {
		id: string; // ID of the entity or research this research depends on
		ammount: number; // Optional amount for entities
	}[];
	// ids of entities that this research unlocks
	unlocks?: {
		id: string; // ID of the entity to unlock
	}[];
	// ids of upgrades that this research unlocks
	upgrade?: {
		id: string; // ID of the upgrade to apply
	}
	
}

export type ResearchTree = {
	tiers: Research[];
}

export type Config = ResearchTree & Entities & Upgrades;