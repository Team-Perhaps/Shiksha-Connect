import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Container, Stack, Alert, Box, Snackbar } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { signIn } from '../../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import Newlogo from '../../assets/Logo.svg';

const Login = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const emailRef = useRef();
    const passwordRef = useRef();
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, currentUser } = useAuth();
    const history = useNavigate();

    const { openSnackBar, setOpenSnackBar, message, setMessage } = props;

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            setMessage('Welcome to Shiksha Connect!');
            setOpenSnackBar(true);
            history('/');
        } catch (err) {
            setError('Failed to log in. Please check your username and password.');
        }
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
                            opacity: '0.9',
                            
                            // filter: 'blur(8px)',
                        }}
                    >
                        <Box
                            m={2}
                            p={10}
                            bgcolor="background.paper"
                            boxShadow={8}
                            borderRadius={8}
                            textAlign="center"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <img src={Newlogo} alt='Brand Logo' style={{ width: '150px', marginBottom: '10px' }} />
                            <Typography variant="h4" component="h1" gutterBottom>
                                Log In
                            </Typography>
                            {error && <Alert severity="error" style={{ marginBottom:'10px' }}>{error}</Alert>}
                            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                                <TextField
                                    type="email"
                                    variant='filled'
                                    color='secondary'
                                    label="Email"
                                    inputRef={emailRef}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    type="password"
                                    variant='filled'
                                    color='secondary'
                                    label="Password"
                                    inputRef={passwordRef}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button disabled={loading} variant="contained" color="secondary" type="submit">Log In</Button>
                            </form>
                            <big>Need an account? <Link to="/register">Register Here</Link></big>
                        </Box>
                    </Box>
                </React.Fragment>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default Login;
