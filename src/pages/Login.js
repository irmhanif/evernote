import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.scss';
import SignUp from './SignUp';
import Logo from '../components/Logo';
import { useFormik } from 'formik';
import { checkLoginStatus, createValidationSchema } from '../helpers';
import axios from 'axios';
import { loginFields } from '../helpers/config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [isFlipped, setFlipped] = useState(false);
    const [loggedIn, setLoggedIn] = useState(checkLoginStatus())
    const navigate = useNavigate();

    const handleFlip = () => {
        setFlipped(!isFlipped);
        setIsLogin(!isLogin)
    };

    // After successful login API call
    const saveTokenToCookie = async (token) => {
        // Set an expiration date for the cookie (e.g., expires in 30 days)
        await Cookies.set('token', token, { expires: 30 });
        setLoggedIn(true)
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/projects/featherNotes/notes');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    // To retrieve the token later

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: createValidationSchema(loginFields),
        onSubmit: (values) => {
            const apiUrl = 'http://localhost:5000/auth/login';
            axios.post(apiUrl, values)
                .then(response => {
                    // Handle successful response
                    console.log(response);
                    saveTokenToCookie(response?.data.token)
                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        },
    });

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
                            <div className="wrap-login100" style={!isLogin ? { 'display': 'none' } : { 'visibility': 'unset' }}>
                                <form className="login100-form validate-form" onSubmit={formik.handleSubmit}>
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
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            value={formik.values?.email}
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
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            value={formik.values?.password}
                                        />
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"></div>
                                            <button className="login100-form-btn" type='submit'>
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
                                        <span className="txt2 cursor-pointer" onClick={() => {
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