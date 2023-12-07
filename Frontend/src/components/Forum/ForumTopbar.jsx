import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,  
    Avatar,
    Link,
} from '@mui/material';
import { useTheme } from "@emotion/react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../../assets/Logo.svg';


const ForumTopbar = () => {
    const theme = useTheme();

    const [anchodEl, setAnchorEl]  = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#fff', zIndex: 999 }}>
          <Toolbar sx= {{gap : 3}}>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#000" }}>
                <img src={Logo} alt="logo" style={{ height: "70px", width: "70px" }} />
            </Typography>
            <Link href="/forum/questions">
            <Button variant="contained" style={{ backgroundColor: "#f48023"}}>
              Ask a Question
            </Button>
            </Link>
            <IconButton color="#000">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              edge="end"
            >
              <Avatar alt="User" src="your-avatar-image-url.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchodEl}
              open={Boolean(anchodEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
    );
};
    
export default ForumTopbar;