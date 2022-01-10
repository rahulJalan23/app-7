import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Transaction Manager
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
