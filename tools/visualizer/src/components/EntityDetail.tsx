import React, { useEffect } from "react";
import { Box, Typography, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Entity } from "@iddle-factory/config";

interface EntityDetailProps {
  entities: Entity[];
}

const EntityDetail: React.FC<EntityDetailProps> = ({ entities }) => {
  const { entityId } = useParams();
  const navigate = useNavigate();
  
  // Find the selected entity
  const selectedEntity = entities.find(entity => entity.id === entityId);
  
  // If no entity is found for the ID, redirect to the entities page
  useEffect(() => {
    if (!selectedEntity && entityId) {
      navigate("/entities");
    }
  }, [selectedEntity, entityId, navigate]);

  if (!selectedEntity) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Entity Selected
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select an entity from the list to view its details
          </Typography>
        </Box>
      </Paper>
    );
  }
  return (
    <Card elevation={3} sx={{ height: '100%', position: 'sticky', top: 16 }}>
      <CardContent sx={{ height: '100%', overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
        <Typography variant="h5" gutterBottom>
          {selectedEntity.name}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          <Chip label={`ID: ${selectedEntity.id}`} size="small" color="secondary" />
          <Chip label={`Type: ${selectedEntity.type}`} size="small" color="primary" />
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Crafting Details
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Craft Time: <strong>{selectedEntity.craft_time} seconds</strong>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Craft Amount: <strong>{selectedEntity.craft_amount}</strong>
          </Typography>
          
          {selectedEntity.craft_cost.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Crafting Cost:
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Resource</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedEntity.craft_cost.map((cost, idx) => (
                      <TableRow key={idx}>
                        <TableCell><Link to={"/entities/" + cost.id}>{cost.id}</Link></TableCell>
                        <TableCell align="right">{cost.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {selectedEntity.operation_cost.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Operation Cost:
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Resource Type</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedEntity.operation_cost.map((cost, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{cost.type}</TableCell>
                        <TableCell align="right">{cost.ammount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EntityDetail;
