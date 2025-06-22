// Create TypeScript interfaces for our config data structures
export interface Entity {
	id: string;
	name: string;
	tier: number;
	type: string;
	cost: Array<{ itemId: string; qty: number }>;
	function: string;
	operation_cost: string | number;
	tech_requirement: string;
}

export interface Entities {
	entities: Entity[];
}

export interface SciencePacks {
	[key: string]: number;
}

export interface Upgrade {
	id: string;
	name: string;
	requirement?: string;
	science_packs: SciencePacks;
	effect: string;
}

export interface Unlock {
	id: string;
	name: string;
	requirement: string;
	science_packs: SciencePacks;
	function: string;
}

export interface Tier {
	tier: number;
	upgrades: Upgrade[];
	unlocks: Unlock[];
}

export interface ResearchTree {
	tiers: Tier[];
}
