import React, { useEffect, useState } from 'react';
import { LinearProgress, CircularProgress, Checkbox, FormControlLabel, Typography, Box, Container, Grid, Snackbar } from '@mui/material';
  import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ConfettiSuccess from '../../components/Connfetti/ConfettiSuccess';
import Timer from '../../components/Timer.jsx';
import ConfettiInfinite from '../../components/Connfetti/ConfettiInfinite';
import MuiAlert from '@mui/material/Alert';

const initialSubjects = [
  { name: 'Data Structures', modules: [false, false, false, false, false, false] },
  { name: 'Computer Organization', modules: [false, false, false, false, false, false] },
  { name: 'Discrete Mathematics', modules: [false, false, false, false, false, false] },
  { name: 'Database Management', modules: [false, false, false, false, false, false] },
  { name: 'Digital Systems', modules: [false, false, false, false, false, false] },
  { name: 'Data Science', modules: [false, false, false, false, false, false] },
];

function Stats() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleModuleCheck = (subjectIndex, moduleIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].modules[moduleIndex] = !updatedSubjects[subjectIndex].modules[moduleIndex];
    setSubjects(updatedSubjects);
  };

  const calculateSubjectProgress = (subject) => {
    const completedModules = subject.modules.filter((module) => module).length;
    return (completedModules / subject.modules.length) * 100;
  };
  
  const mainProgress = (subjects.reduce((acc, subject) => acc + calculateSubjectProgress(subject), 0) / (subjects.length * 100)) * 100;

  useEffect(() => {
    if(mainProgress === 100) {
      setSnackbarOpen(true);
    }
  }, [mainProgress]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  

  // const styles = {
  //   waveAnimation: {
  //     '@keyframes wave': {
  //       '0%': {
  //         backgroundPosition: '0% 50%',
  //       },
  //       '50%': {
  //         backgroundPosition: '100% 50%',
  //       },
  //       '100%': {
  //         backgroundPosition: '0% 50%',
  //       },
  //     },
  //     animation: 'wave 1s linear', // Increased duration to 4s
  //     background: 'linear-gradient(90deg, #94e2cd, #e0e0e0)',
  //     backgroundSize: '50% 50%',
  //   },
  // };

  return (
    <Container p={3}>
      <Typography variant="h1" gutterBottom fontWeight={"bold"}>
        PROGRESS TRACKER
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <LinearProgress
        variant="determinate"
        value={mainProgress}
        sx={{ flex: 1, marginBottom: 2, height: '12px', backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: 'green' },  }}    
      />
      {mainProgress === 100 ? (
        <div>
        <CheckCircleRoundedIcon
        style={{
        marginLeft : '10px',
        marginBottom: '20px',
        fontSize: '2rem',
        color: "green" , // Change the color to your desired color
        }}
        />
        <ConfettiInfinite />
        </div>
        ):("")}
      
        
      </div>
      
      <Grid container spacing={4}>
        {subjects.map((subject, subjectIndex) => (
          <Grid key={subjectIndex} item xs={12} md={6}>
            <Box mb={3} p={2} border={1} display="flex" alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" fontWeight={"bold"}>
                  {subject.name}:
                </Typography>
                <ul style={{ listStyle: 'none', marginLeft: '20px', paddingLeft: '0' }}>
                  {subject.modules.map((module, moduleIndex) => (
                    <li key={moduleIndex}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={module}
                            onChange={() => handleModuleCheck(subjectIndex, moduleIndex)}
                            sx={{
                              color: "#000000" ,
                              '&.Mui-checked': {
                                color: "#007eb9",
                              }}}
                          />
                        }
                        
                        label={`Module ${moduleIndex + 1}`}
                      />
                      
                    </li>
                  ))}
                </ul>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress
                  variant="determinate"
                  value={calculateSubjectProgress(subject)}
                  style={{ color: '#0B409C' }}
                  size="6rem"
                  thickness={4}
                />
                {Math.round(calculateSubjectProgress(subject)) === 100 ? (
                <CheckCircleRoundedIcon
                style={{
                position: 'absolute',
                fontSize: '7.6rem',
                color: "#007eb9" , // Change the color to your desired color
               }}
              />
                ) : (
               <Typography variant="h4" position = "absolute">
                  {Math.round(calculateSubjectProgress(subject))}%
                </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          variant='filled'
          elevation={6}
          // sx={{ width: '100%' }}
        >
          Congratulations, You have finished the syllabus.
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Stats;
