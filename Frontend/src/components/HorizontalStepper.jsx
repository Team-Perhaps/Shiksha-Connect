import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FileUpload from "./FileUpload";
import { Routes, Route, useLocation } from "react-router-dom";
import DevelopCurriculum from "./ResourcePage";
import TextEditor from "./TextEditor";
import { tokens } from "../theme";

const HorizontalStepper = ({ steps }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [semOpt1, setSemOpt1] = useState();
  const [semOpt2, setSemOpt2] = useState();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (selectedOption2 === "Option X") {
      setSemOpt1("1");
      setSemOpt2("2");
    }
    if (selectedOption2 === "Option Y") {
      setSemOpt1("3");
      setSemOpt2("4");
    }
    if (selectedOption2 === "Option Z") {
      setSemOpt1("5");
      setSemOpt2("6");
    }
    if (selectedOption2 === "Option W") {
      setSemOpt1("7");
      setSemOpt2("8");
    }
  }, [selectedOption2]);

  return (
    <Box>
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        sx={{ backgroundColor: "transparent", marginBottom: "40px" }}
      >
        {steps.map((step, index) => (
          <Step key={index}
          sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: colors.new[500], // circle color (COMPLETED)
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
              {
                color: 'grey.500', // Just text label (COMPLETED)
              },
            '& .MuiStepLabel-root .Mui-active': {
              color: colors.new[300], // circle color (ACTIVE)
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
              {
                color: 'common.white', // Just text label (ACTIVE)
              },
            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              fill: 'black', // circle's number (ACTIVE)
            },
          }}>
            <StepLabel>
              <Typography variant="h4" fontSize="24px" fontWeight="bold">
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel
              shrink={selectedOption1 !== ""}
              // style={{
              //   transform: selectedOption1 ? "translate(0, -18px) scale(0.75)" : "none",
              // }}
            >
              Select Degree
            </InputLabel>
            <Select
              value={selectedOption1}
              onChange={(e) => setSelectedOption1(e.target.value)}
            >
              <MenuItem value="B.Tech">B.Tech</MenuItem>
              <MenuItem value="B.Sc">B.Sc</MenuItem>
              <MenuItem value="BCA">BCA</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel
              shrink={selectedOption2 !== ""}
              // style={{
              //   transform: selectedOption2 !== ""? "translate(0, -18px) scale(0.75)" : "none",
              // }}
            >
              Select Branch
            </InputLabel>
            <Select
              value={selectedOption2}
              onChange={(e) => setSelectedOption2(e.target.value)}
            >
              <MenuItem value="Comps">Computer Engineering</MenuItem>
              <MenuItem value="IT">Information Technology</MenuItem>
              <MenuItem value="Electronics">Electronics Engineering</MenuItem>
              <MenuItem value="Mechanical">Mechanical Engineering</MenuItem>
              <MenuItem value="Chemical">Chemical Engineering</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel
              shrink={selectedOption3 !== ""}
              // style={{
              //   transform: selectedOption3 ? "translate(0, -18px) scale(0.75)" : "none",
              // }}
            >
              Select Year
            </InputLabel>
            <Select
              value={selectedOption3}
              onChange={(e) => setSelectedOption3(e.target.value)}
              required
            >
              <MenuItem value="First Year">First Year</MenuItem>
              <MenuItem value="Second Year">Second Year</MenuItem>
              <MenuItem value="Third Year">Third Year</MenuItem>
              <MenuItem value="Fourth Year">Fourth Year</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel
              shrink={selectedOption4 !== ""}
              // style={{
              //   transform: selectedOption4 ? "translate(0, -18px) scale(0.75)" : "none",
              // }}
            >
              Select Course
            </InputLabel>
            <Select
              value={selectedOption4}
              onChange={(e) => setSelectedOption4(e.target.value)}
              required
            >
              <MenuItem value="Vector Calculus">Vector Calculus</MenuItem>
              <MenuItem value="Data Structures">Data Structures</MenuItem>
              <MenuItem value="Discrete Mathematics">Discrete Mathematics</MenuItem>
              <MenuItem value="Analysis of Algorithms">Analysis of Algorithms</MenuItem>
              <MenuItem value="Computer Organisation And Architecture">Computer Organisation And Architecture</MenuItem>
              <MenuItem value="Probability">Probability</MenuItem>

            </Select>
          </FormControl>
        </Box>
      )}
      {activeStep === 1 &&
        location.pathname == "/resources" && <FileUpload degree={selectedOption1} 
        branch={selectedOption2}
        year={selectedOption3}
        subject={selectedOption4}/>
      }
      {activeStep === 1 &&
        location.pathname === "/develop" && <TextEditor />}
      <Box mt={3} sx={{ display: "flex" }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            backgroundColor: theme.palette.common.white,
            color: colors.new[300],
            fontSize: "18px",
            fontWeight: "bold",
            padding: "12px 24px",
            marginRight: "10px",
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          sx={{
            backgroundColor: colors.blueAccent[100],
            color: colors.new[100],
            fontSize: "18px",
            fontWeight: "bold",
            padding: "5px 36px",
          }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default HorizontalStepper;
