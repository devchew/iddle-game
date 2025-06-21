import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { Box, Typography, Modal, Paper, Chip } from '@mui/material';
import type { Entity } from '@iddle-factory/config/types';
import { type TreeNode } from '../utils/dataTransformers';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
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

const EntityListModal: React.FC<EntityListModalProps> = ({ open, entities, onClose, onSelectEntity }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Available Entities
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Select an entity to view details:
        </Typography>
        <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
          {entities.map((entity, index) => (
            <Paper 
              key={index} 
              elevation={2} 
              sx={{ 
                p: 2, 
                mb: 2, 
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
              onClick={() => onSelectEntity(entity)}
            >
              <Typography variant="subtitle1">{entity.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={`Type: ${entity.type}`} size="small" />
                <Chip label={`Tier: ${entity.tier}`} size="small" />
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
          <Chip label={`Tier: ${entity.tier}`} />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Function: {entity.function}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Operation Cost: {entity.operation_cost}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Tech Requirement: {entity.tech_requirement}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Cost</Typography>
        <ul>
          {entity.cost.map((cost, index) => (
            <li key={index}>
              {cost.item}: {cost.qty}
            </li>
          ))}
        </ul>
      </Box>
    </Modal>
  );
};

const ResearchTreeVisualizer: React.FC<ResearchTreeVisualizerProps> = ({ treeData }) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [entityListOpen, setEntityListOpen] = useState(false);
  const [entityList, setEntityList] = useState<Entity[]>([]);

  const handleNodeClick = (nodeData: any) => {
    if (nodeData.data.entityRefs && nodeData.data.entityRefs.length > 0) {
      // If there's only one entity, show it directly
      if (nodeData.data.entityRefs.length === 1) {
        setSelectedEntity(nodeData.data.entityRefs[0]);
        setModalOpen(true);
      } else {
        // For multiple entities, show entity selection list
        setEntityList(nodeData.data.entityRefs);
        setEntityListOpen(true);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEntity(null);
  };

  // Custom node renderer to show different styles based on node type
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => {
    const hasEntities = nodeDatum.attributes?.hasEntities;
    const nodeType = nodeDatum.attributes?.type;
    
    return (
      <g onClick={toggleNode}>
        <circle 
          r={hasEntities ? 15 : 10} 
          fill={
            hasEntities 
              ? "#4CAF50" 
              : nodeType === "upgrade" 
                ? "#2196F3" 
                : nodeType === "unlock" 
                  ? "#FF9800" 
                  : "#9E9E9E"
          }
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick({ data: nodeDatum });
          }}
        />
        <text 
          fill="black" 
          strokeWidth="0.5" 
          x={20} 
          style={{ fontSize: '12px' }}
          dy=".35em"
          textAnchor="start"
        >
          {nodeDatum.name}
          {hasEntities && ` (${nodeDatum.attributes.entityCount} entities)`}
        </text>
      </g>
    );
  };
  const closeEntityList = () => {
    setEntityListOpen(false);
  };

  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setEntityListOpen(false);
    setModalOpen(true);
  };

  return (
    <Box sx={{ width: '100%', height: '80vh', position: 'relative' }}>
      <Box sx={{ 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        zIndex: 10, 
        p: 2, 
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 1
      }}>
        <Typography variant="subtitle2" gutterBottom>Legend:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#9E9E9E', mr: 1 }} />
          <Typography variant="body2">Research Tier</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#2196F3', mr: 1 }} />
          <Typography variant="body2">Upgrade</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#FF9800', mr: 1 }} />
          <Typography variant="body2">Unlock</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#4CAF50', mr: 1 }} />
          <Typography variant="body2">Has Entities (clickable)</Typography>
        </Box>
      </Box>
      
      <Box sx={{ width: '100%', height: '100%', border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: window.innerWidth / 2, y: 100 }}
          renderCustomNodeElement={renderCustomNodeElement}
          pathFunc="step"
          separation={{ siblings: 2, nonSiblings: 2 }}
          zoom={0.8}
        />
      </Box>
      
      <EntityModal
        open={modalOpen}
        entity={selectedEntity}
        onClose={closeModal}
      />
      
      <EntityListModal
        open={entityListOpen}
        entities={entityList}
        onClose={closeEntityList}
        onSelectEntity={handleSelectEntity}
      />
    </Box>
  );
};

export default ResearchTreeVisualizer;
