import React from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ListIcon from "@mui/icons-material/List";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ForumSidebar = () => {
    return (
    <Box 
    
    style={{ backgroundColor: "#fff" }}
    sx=
    {{  
        backgroundColor: '',
        height: '100vh',
        paddingTop: '24px',
        paddingLeft: '18px',
        width: '240',
        // bgcolor : '',        
        }}>

    
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItem> */}
                    <Typography variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
            Menu
          </Typography>

          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
          </ListItem>
        </List>
        <List>
          <Typography variant="subtitle2" sx={{ ml: 2, mt: 2 }}>
            Personal Navigator
          </Typography>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Your Questions" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Your Answers" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Your Likes & Votes" />
          </ListItem>
        </List>
      </Box>
    );
};
  
export default ForumSidebar;