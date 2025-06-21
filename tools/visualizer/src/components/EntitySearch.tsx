import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Entity } from '@iddle-factory/config/types';

interface EntitySearchProps {
  entities: Entity[];
}

const EntitySearch: React.FC<EntitySearchProps> = ({ entities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // This function is replaced by finalFilteredEntities with tier filtering

  const entityTypes = useMemo(() => {
    return [...new Set(entities.map(entity => entity.type))];
  }, [entities]);
  const [activeTierFilter, setActiveTierFilter] = useState<number | null>(null);

  const handleTierFilter = (tier: number) => {
    if (activeTierFilter === tier) {
      setActiveTierFilter(null);
    } else {
      setActiveTierFilter(tier);
      setSearchTerm('');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveTierFilter(null);
  };

  const tierFiltered = useMemo(() => {
    if (activeTierFilter === null) return entities;
    return entities.filter(entity => entity.tier === activeTierFilter);
  }, [entities, activeTierFilter]);

  const finalFilteredEntities = useMemo(() => {
    if (!searchTerm) return tierFiltered;
    
    return tierFiltered.filter(entity => 
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.tech_requirement.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tierFiltered, searchTerm]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Entities Explorer
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#f9f9f9' }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {entityTypes.map(type => (
              <Chip 
                key={type} 
                label={type} 
                onClick={() => setSearchTerm(type)}
                clickable
                color={searchTerm === type ? "primary" : "default"}
              />
            ))}
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Filter by tier:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[...new Set(entities.map(e => e.tier))].sort((a, b) => a - b).map(tier => (
              <Chip 
                key={tier} 
                label={`Tier ${tier}`} 
                onClick={() => handleTierFilter(tier)}
                clickable
                color={activeTierFilter === tier ? "primary" : "default"}
              />
            ))}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {finalFilteredEntities.length} Entities Found
          </Typography>
          
          {(searchTerm || activeTierFilter !== null) && (
            <Chip 
              label="Clear Filters" 
              color="secondary" 
              onClick={clearFilters}
            />
          )}
        </Box>
      </Paper>      <Grid container spacing={3}>
        {finalFilteredEntities.map(entity => (
          <Grid item xs={12} md={6} lg={4} key={entity.name}>
            <Card elevation={3} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {entity.name}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`Type: ${entity.type}`} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                  <Chip 
                    label={`Tier: ${entity.tier}`} 
                    size="small"
                    color="secondary"
                  />
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Function:</strong> {entity.function}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Operation Cost:</strong> {entity.operation_cost}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Tech Requirement:</strong> {entity.tech_requirement || "None"}
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Cost Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entity.cost.map((cost, index) => (
                            <TableRow key={index}>
                              <TableCell>{cost.item}</TableCell>
                              <TableCell align="right">{cost.qty}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {finalFilteredEntities.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No entities found matching your search criteria
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EntitySearch;
