import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Logo from "../../../assets/Logo-2.svg";
import { Routes, Route, useLocation } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useAuth } from "../../../contexts/AuthContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `${colors.redAccent[800]} important`,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarForum = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(
    location.pathname == "/editor"
  );
  const [selected, setSelected] = useState("Dashboard");
  const { firstName, lastName } = useAuth();



  return (
    <div
      style={{
        display: "flex",
      }}
      // className="sidebar"
    >
      <Box
      sx={{
        height: "100vh",
        width: "100%",
        "& .pro-sidebar-inner": {
          background: `${colors.blueAccent[900]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color: `${colors.primary[800]} !important`,
        },
        "& .pro-inner-item:hover": {
          color: "#f48023 !important",
        },
        "& .pro-menu-item.active": {
          color: `${colors.redAccent[800]} `,
        },
      }}
    >

      {/* Fixed Sidebar */}
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed", // Fixed position
          height: "100vh", // Full height
          zIndex: 1, // Place it above other elements
          background : "#ffffff",
        }}
        // color : '${colors.blueAccent[100]} !important'
        
      >
        <Menu iconShape="square">

          <Box mt={"30px"} paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Search"
              to="/"
              icon={<SearchOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "MENU"}
            </Typography>
            <Item
              title="Questions"
              to="/forum"
              icon={<FormatListBulletedOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tags"
              to="/forum"
              icon={<LocalOfferOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            { <Item
              title="Ranking"
              to="/forum/latest"
              icon={<WorkspacePremiumOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> }
            <Typography
              variant="h6"
              color={colors.grey[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "PERSONAL NAVIGATOR"}
            </Typography>
            <Item
              title="Your questions"
              to="/forum"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your answers"
              to="/forum"
              icon={<MapsUgcOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your likes and votes"
              to="/forum"
              icon={<FavoriteBorderOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
      </Box>
         {/* Main Content */}
         <div
         style={{
           marginLeft: isCollapsed ? "80px" : "250px",
           padding: "20px",
           flexGrow: 1, 
         }}
       >  
       </div>
 
    </div>
  );
};

export default SidebarForum;
