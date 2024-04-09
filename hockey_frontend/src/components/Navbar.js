// import React from 'react';

// const NavBar = () => {
//   const navStyle = {
//     backgroundColor: 'navy', // This should be the color of your navbar background
//     color: 'white', // This is the text color
//     display: 'flex',
//     justifyContent: 'space-evenly', // This spreads out the nav items evenly
//     alignItems: 'center',
//     padding: '10px', // Adjust padding as needed
//     listStyle: 'none', // This removes bullet points from the list items
//     height: '50px', // Adjust height as needed
//   };

//   const linkStyle = {
//     textDecoration: 'none', // This removes underline from links
//     color: 'white', // This sets the link text color
//     fontSize: '18px', // Adjust font size as needed
//   };

//   return (
//     <nav style={navStyle}>
//       <a href="/" style={linkStyle}>Home</a>
//       <a href="/premium" style={linkStyle}>Teams</a>
//       <a href="/playerStatsAll" style={linkStyle}>Players</a>
//     </nav>
//   );
// };

// export default NavBar;



import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'Players', 'Statitics'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to={`${item}`} className="link-style"> 
            <ListItemText primary={item} />
            </Link>
             
             
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="relative" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button 
               key={item} 
               sx={{ color: '#fff' }} 
               onClick={() => navigate(`/${item}`)}
               >
                {/* <Link to={`/playerStatsAll`} className="link-style" style={none}>  */}
                {item}
                {/* </Link> */}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
