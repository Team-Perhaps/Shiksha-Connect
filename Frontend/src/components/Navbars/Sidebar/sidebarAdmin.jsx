import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Logo from "../../../assets/Logo-2.svg";
import { Routes, Route, useLocation } from "react-router-dom";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
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

const SidebarAdmin = () => {
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
    >
      <Box
      sx={{
        height: "100vh",
        width: "100%",
        "& .pro-sidebar-inner": {
          background: `${colors.blueAccent[100]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color: `${colors.primary[800]} !important`,
        },
        "& .pro-inner-item:hover": {
          color: "#ff7d05 !important",
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
          position: "fixed",
          height: "100vh",
          zIndex: 1,
          background : "#0B409C",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 0px 0",
              color: colors.grey[100],
            }}
          >

            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img src={Logo} alt="Logo" width="100px" height="100px" />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.blueAccent[900]}
                // Team Perhaps KJSCE
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography variant="h5" color={colors.primary[800]}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Forum"
              to="/forum"
              icon={<ForumOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.blueAccent[900]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Curriculum"}
            </Typography>
            <Item
              title="Develop Curriculum"
              to="/develop"
              icon={<BorderColorOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Curriculums"
              to="/view"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.blueAccent[900]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Resources"}
            </Typography>
            <Item
              title="Access Resources"
              to="/resources"
              icon={<CollectionsBookmarkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.blueAccent[900]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Moderation"}
            </Typography>
            <Item
              title="User Moderation"
              to="/verify"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Typography
                variant="h6"
                color={colors.blueAccent[900]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                {!isCollapsed && "Stats"}
              </Typography>
              <Item
                title="Statistics"
                to="/stats"
                icon={<BarChartOutlinedIcon />}
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

export default SidebarAdmin;
