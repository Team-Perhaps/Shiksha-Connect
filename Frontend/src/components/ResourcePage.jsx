import React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import HorizontalStepper from "../components/HorizontalStepper";
import SidebarDev from "../components/Navbars/Sidebar/sidebarDev";
import { useLocation } from "react-router-dom";

const DevelopCurriculum = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const steps = [
    {
      label: "Enter Information",
      content: <div>Enter Information</div>,
    },
    {
      label: "Add/Retrieve Resources",
      content: <div>Add/Retrieve Resources</div>,
    }
  ];

  return (
    <Box m="20px" >
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
        </Box>
      </Box>

      {/* Render the VerticalStepper */}
      <HorizontalStepper steps={steps} />
    </Box>
  );
};

export default DevelopCurriculum;
