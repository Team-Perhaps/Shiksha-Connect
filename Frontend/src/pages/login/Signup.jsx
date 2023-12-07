import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert, Box, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { getFirestore, collection, setDoc, addDoc} from "firebase/firestore";
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { db } from "../../config/firebase"
import Typography from '@mui/material/Typography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Newlogo from '../../assets/Logo.svg';
 
const Signup = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const [role, setRole] = useState('teacher')
    const dbRef = collection(db, "verify")
    const handleCreateNewItem = (e) => {
        e.preventDefault();
        setRole(e.target.value)
      };


    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    const{openSnackBar, setOpenSnackBar, message, setMessage} = props;

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
      setSnackbarOpen(true);
    };

    const validateInputs = () => {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setError('Passwords do not match');
        return false;
      }
  
      const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  
      if (!passwordPattern.test(passwordRef.current.value)) {
        setError('Password must have at least one uppercase letter, one number, and one special character');
        return false; 
      }
  
      setError('');
      return true;
    };
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      if (!validateInputs()) {
        return;
      }
  
      const data = {
        role: role,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
  
      await addDoc(dbRef, data)
        .then((docRef) => {
          console.log('Document has been added successfully');
          setMessage('Your Account is Awaiting Verification');
          setOpenSnackBar(true);
          history('/login');
        })
        .catch((error) => {
          console.log(error);
        });
  
      setLoading(false);
    }  
 
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100vh)',
                  width: '100vw',
                  position: 'relative',
                  backgroundColor: '#ff9900',
                }}
              >
                <Box
                  m={2}
                  p={3}
                  bgcolor="background.paper"
                  boxShadow={3}
                  borderRadius={8}
                  textAlign="center"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <img
                    src={Newlogo}
                    alt="Brand Logo"
                    style={{ width: '150px', marginBottom: '10px' }}
                  />
                  <Typography variant="h4" component="h1" gutterBottom>
                    Register
                  </Typography>
                  {error && <Alert severity="error"
                    style={{ marginBottom: '1rem' }}>{error}</Alert>}
                  <form onSubmit={handleSubmit} action={<Link to="/register" />}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      sx={{ mb: 4 }}
                    >
                      <TextField
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="First Name"
                        inputRef={firstNameRef}
                        required
                        sx={{ width: '48%' }} // 50% width
                      />
                      <TextField
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Last Name"
                        inputRef={lastNameRef}
                        required
                        sx={{ width: '48%' }} // 50% width
                      />
                    </Box>
                    <TextField
                      type="email"
                      variant="filled"
                      color="secondary"
                      label="Email"
                      inputRef={emailRef}
                      fullWidth
                      required
                      sx={{ mb: 4 }}
                    />
                    <TextField
                      type="password"
                      variant="filled"
                      color="secondary"
                      label="Password"
                      inputRef={passwordRef}
                      required
                      fullWidth
                      sx={{ mb: 4 }}
                    />
                    <TextField
                      type="password"
                      variant="filled"
                      color="secondary"
                      label="Password Confirmation"
                      inputRef={passwordConfirmRef}
                      required
                      fullWidth
                      sx={{ mb: 4 }}
                    />
                    <div>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        onChange={handleCreateNewItem}
                      >
                        <MenuItem value={'teacher'}>Teacher</MenuItem>
                        <MenuItem value={'localadmin'}>Local Admin</MenuItem>
                        <MenuItem value={'currdev'}>Curriculum Developer</MenuItem>
                      </Select>
                    </div>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Register
                    </Button>
                  </form>
                  <big>
                    Already have an account? <Link to="/login">Login Here</Link>
                  </big>
                </Box>
              </Box>
            </React.Fragment>
          </AuthProvider>\
        </ThemeProvider>
      );
    };
    
    export default Signup;