import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.scss';
import SignUp from './SignUp';
import Logo from '../components/Logo';

const defaultTheme = createTheme();

export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const [isLogin, setIsLogin] = useState(true)
    const [isFlipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!isFlipped);
        setIsLogin(!isLogin)
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={12}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flipper">
                        <div className="front">
                            <div className="wrap-login100" style={!isLogin ? { 'visibility': 'hidden' } : { 'visibility': 'unset' }}>
                                <form className="login100-form validate-form">
                                    <span className="login100-form-title p-b-26">
                                        Sign In <Logo />
                                    </span>
                                    <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                                        <span className="btn-show-pass">
                                            <i className="zmdi zmdi-eye"></i>
                                        </span>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"></div>
                                            <button className="login100-form-btn">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <div className="text-center p-t-115">
                                        <span className="txt1">
                                            {isLogin ? `Don’t have an account?` : 'Already have a account'}
                                        </span>
                                        <span className="txt2" onClick={() => {
                                            handleFlip()
                                        }}>
                                            Sign {isLogin ? 'Up' : 'In'}
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="back">
                            <SignUp handleFlip={handleFlip} />
                        </div>
                    </div>
                </div>

            </Grid>
        </ThemeProvider>
    );
}