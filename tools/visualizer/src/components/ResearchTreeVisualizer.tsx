import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Box, Typography, Modal, Paper, Chip, Grid } from "@mui/material";
import type { Entity } from "@iddle-factory/config/types";
import { type TreeNode } from "../utils/dataTransformers";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

interface ResearchTreeVisualizerProps {
	treeData: TreeNode;
}

interface EntityModalProps {
	open: boolean;
	entity: Entity | null;
	onClose: () => void;
}

interface EntityListModalProps {
	open: boolean;
	entities: Entity[];
	onClose: () => void;
	onSelectEntity: (entity: Entity) => void;
}

const EntityListModal: React.FC<EntityListModalProps> = ({
	open,
	entities,
	onClose,
	onSelectEntity,
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyle}>
				<Typography variant="h6" component="h2" gutterBottom>
					Available Entities
				</Typography>
				<Typography variant="body2" sx={{ mb: 2 }}>
					Select an entity to view details:
				</Typography>
				<Box sx={{ maxHeight: "400px", overflow: "auto" }}>
					{entities.map((entity, index) => (
						<Paper
							key={index}
							elevation={2}
							sx={{
								p: 2,
								mb: 2,
								cursor: "pointer",
								"&:hover": { bgcolor: "#f5f5f5" },
							}}
							onClick={() => onSelectEntity(entity)}
						>
							<Typography variant="subtitle1">{entity.name}</Typography>
							<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
								<Chip label={`Type: ${entity.type}`} size="small" />
							</Box>
						</Paper>
					))}
				</Box>
			</Box>
		</Modal>
	);
};

const EntityModal: React.FC<EntityModalProps> = ({ open, entity, onClose }) => {
	if (!entity) return null;

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyle}>
				<Typography variant="h6" component="h2" gutterBottom>
					{entity.name}
				</Typography>
				<Box sx={{ mb: 2 }}>
					<Chip label={`Type: ${entity.type}`} sx={{ mr: 1 }} />
				</Box>
				
				<Typography variant="subtitle1" gutterBottom>
					Craft Time: {entity.craft_time} seconds
				</Typography>
				<Typography variant="subtitle2" gutterBottom>
					Craft Amount: {entity.craft_amount}
				</Typography>

				{entity.operation_cost.length > 0 && (
					<>
						<Typography variant="h6" sx={{ mt: 2 }}>
							Operation Cost
						</Typography>
						<Grid container spacing={1}>
							{entity.operation_cost.map((cost, index) => (
								<Grid item key={index}>
									<Chip
										label={`${cost.type}: ${cost.ammount}`}
										variant="outlined"
										size="small"
									/>
								</Grid>
							))}
						</Grid>
					</>
				)}
				
				{entity.craft_cost.length > 0 && (
					<>
						<Typography variant="h6" sx={{ mt: 2 }}>
							Crafting Cost
						</Typography>
						<Grid container spacing={1}>
							{entity.craft_cost.map((cost, index) => (
								<Grid item key={index}>
									<Chip
										label={`${cost.id}: ${cost.amount}`}
										variant="outlined"
										size="small"
									/>
								</Grid>
							))}
						</Grid>
					</>
				)}
			</Box>
		</Modal>
	);
};

const ResearchTreeVisualizer: React.FC<ResearchTreeVisualizerProps> = ({
	treeData,
}) => {
	const [selectedEntities, setSelectedEntities] = useState<Entity[] | null>(null);
	const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [entityModalOpen, setEntityModalOpen] = useState(false);

	// Custom node to render with entity information
	const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => {
		const hasEntities = nodeDatum.attributes?.hasEntities;
		const nodeStyle = hasEntities
			? { fill: "#4caf50", stroke: "#2e7d32" }
			: {};

		const handleNodeClick = () => {
			if (nodeDatum.entityRefs && nodeDatum.entityRefs.length > 0) {
				setSelectedEntities(nodeDatum.entityRefs);
				setModalOpen(true);
			}
		};

		return (
			<g>
				<circle
					r={hasEntities ? 18 : 15}
					style={nodeStyle}
					onClick={handleNodeClick}
				/>
				<text
					dy=".31em"
					x={25}
					textAnchor="start"
					style={{ fill: "#333", fontSize: "1rem" }}
				>
					{nodeDatum.name}
				</text>
				{hasEntities && (
					<text
						dy=".31em"
						x={-8}
						textAnchor="middle"
						style={{ fill: "white", fontSize: "0.9rem" }}
					>
						{nodeDatum.attributes.entityCount}
					</text>
				)}
			</g>
		);
	};

	const handleEntitySelect = (entity: Entity) => {
		setSelectedEntity(entity);
		setModalOpen(false);
		setEntityModalOpen(true);
	};

	return (
		<Box sx={{ width: "100%", height: "800px", position: "relative" }}>
			<Tree
				data={treeData}
				orientation="horizontal"
				pathFunc="step"
				translate={{ x: 200, y: 400 }}
				renderCustomNodeElement={renderCustomNode}
				separation={{ siblings: 3, nonSiblings: 3 }}
			/>
			{selectedEntities && (
				<EntityListModal
					open={modalOpen}
					entities={selectedEntities}
					onClose={() => setModalOpen(false)}
					onSelectEntity={handleEntitySelect}
				/>
			)}
			<EntityModal
				open={entityModalOpen}
				entity={selectedEntity}
				onClose={() => setEntityModalOpen(false)}
			/>
		</Box>
	);
};

export default ResearchTreeVisualizer;
