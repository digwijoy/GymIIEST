import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('All fields are required');

        try {
            const res = await fetch(`https://deploy-mern-app-1-api.vercel.app/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const { success, message, token, user, error } = await res.json();

            if (success) {
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', user.name);
                handleSuccess(message);
                setTimeout(() => navigate('/'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: 'url("/gme.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
        }}>
            <Paper elevation={6} sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: 4,
                borderRadius: 3,
                width: 380,
                color: '#fff',
            }}>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Login to gymIIEST
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Gmail"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#fff' } }}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Password"
                        name="password"
                        type="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#fff' } }}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            background: 'linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))',
                            fontWeight: 'bold',
                            mb: 2,
                        }}
                    >
                        LOGIN
                    </Button>
                </form>

                <Button
                    onClick={handleLogin}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mt: 1,
                        borderColor: "#fff",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <img
                        src="google-icon.svg"
                        alt="Google"
                        style={{ width: 20, height: 20 }}
                    />
                    Login with Google
                </Button>

                <Typography align="center" fontSize="14px">
                    New here?{" "}
                    <Button component={Link} to="/signup" sx={{ color: '#90caf9', fontWeight: 'bold', textTransform: 'none' }}>
                        Register First
                    </Button>
                </Typography>

                <ToastContainer />
            </Paper>
        </Box>
    );
};

export default Login;
