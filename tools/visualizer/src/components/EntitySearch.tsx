import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  Paper
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import type { Entity } from "@iddle-factory/config";

interface EntitySearchProps {
  entities: Entity[];
}

const EntitySearch: React.FC<EntitySearchProps> = ({ entities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { entityId } = useParams();

  const entityTypes = useMemo(() => {
    return [...new Set(entities.map((entity) => entity.type))];
  }, [entities]);
  
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  
  const handleEntitySelect = (entity: Entity) => {
    navigate(`/entities/${entity.id}`);
  };

  const handleTypeFilter = (type: string) => {
    if (activeTypeFilter === type) {
      setActiveTypeFilter(null);
    } else {
      setActiveTypeFilter(type);
      setSearchTerm("");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveTypeFilter(null);
  };

  const typeFiltered = useMemo(() => {
    if (activeTypeFilter === null) return entities;
    return entities.filter((entity) => entity.type === activeTypeFilter);
  }, [entities, activeTypeFilter]);

  const finalFilteredEntities = useMemo(() => {
    if (!searchTerm) return typeFiltered;

    return typeFiltered.filter(
      (entity) =>
        entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [typeFiltered, searchTerm]);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4, bgcolor: "#f9f9f9" }}>
        <TextField
          fullWidth
          label="Search entities"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          margin="normal"
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Filter by type:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {entityTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                onClick={() => handleTypeFilter(type)}
                clickable
                color={activeTypeFilter === type ? "primary" : "default"}
              />
            ))}
          </Box>
        </Box>

        {(searchTerm || activeTypeFilter) && (
          <Chip
            label="Clear filters"
            onClick={clearFilters}
            sx={{ mb: 2 }}
            color="secondary"
          />
        )}

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Showing {finalFilteredEntities.length} of {entities.length} entities
        </Typography>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
        {finalFilteredEntities.map((entity) => (
          <Box key={entity.id}>
            <Card 
              elevation={entityId === entity.id ? 4 : 1}
              onClick={() => handleEntitySelect(entity)}
              sx={{ 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                bgcolor: entityId === entity.id ? '#f0f7ff' : 'white',
                '&:hover': { 
                  transform: 'translateY(-2px)', 
                  boxShadow: 4 
                } 
              }}
            >
              <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" noWrap>
                    {entity.name}
                  </Typography>
                  <Chip label={entity.type} color="primary" size="small" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EntitySearch;
