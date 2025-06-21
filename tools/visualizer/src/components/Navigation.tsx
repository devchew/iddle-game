import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentPath} centered>
          <Tab 
            label="Research Tree" 
            value="/" 
            component={Link} 
            to="/" 
          />
          <Tab 
            label="Entities Explorer" 
            value="/entities" 
            component={Link} 
            to="/entities" 
          />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Navigation;
