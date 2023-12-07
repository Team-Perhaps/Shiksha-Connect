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
      label: "Generate Syllabus",
      content: <div>Generate Syllabus</div>,
    }
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </Box>

      {/* Render the VerticalStepper */}
      <HorizontalStepper steps={steps} />
    </Box>
  );
};

export default DevelopCurriculum;
