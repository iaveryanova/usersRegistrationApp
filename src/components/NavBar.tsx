import * as React from 'react';
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
import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom";

import {useContext, useEffect} from 'react'
import {UserContext} from "../App";
import https from "../https";
import Cookies from 'js-cookie';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Users'];


const NavBar = (props: Props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
        MENU
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;

    const navigate = useNavigate();
    const goToAuthPage = () => {
      navigate('/'); 
    }

    const goToUsersPage = () => {
      navigate('/users'); 
    }

    const context = useContext(UserContext);


    const logout = async() => {
      try{
        const res = await https.post('/logout', [], {withCredentials: true});
      }
      catch (err){
        console.log(err);
      }

      const initToken = Cookies.get('token');
      context?.setToken(initToken ? initToken : '');
  
        navigate('/'); 
    }

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav" position="fixed">
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
          MENU
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

        {context?.token ?
            <Button 
            sx={{ color: '#fff' }}
            onClick={logout}>
                LogOut
            </Button>
            :
            <Button 
            sx={{ color: '#fff' }}
            onClick={goToAuthPage}
            disabled={true}>
                Users
            </Button>
        }
        
        </Box>
      </Toolbar>
    </AppBar>
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  </Box>
  )
}

export default NavBar