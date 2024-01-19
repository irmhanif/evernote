import React from 'react'
import './Login.scss';
import Logo from '../components/Logo';
import { useFormik } from 'formik';
import { createValidationSchema } from '../helpers';
import { signUpFields } from '../helpers/config';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function SignUp(props) {
    const { handleFlip } = props

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
        },
        validationSchema: createValidationSchema(signUpFields),
        onSubmit: (values) => {
            const apiUrl = 'http://localhost:5000/auth/register';
            axios.post(apiUrl, values)
                .then(response => {
                    // Handle successful response
                    console.log(response);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        },
    });

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    return (
        <div className="wrap-login100" >
            <form className="signUp-form validate-form" onSubmit={formik.handleSubmit}>
                <span className="login100-form-title p-b-26">
                    Sign Up
                    <Logo />
                </span>
                {signUpFields.map(fields => {
                    return (
                        <div className="wrap-input100 validate-input" >
                            <TextField
                                margin="normal"
                                required={true}
                                fullWidth
                                id={fields.name}
                                label={fields.label}
                                name={fields.name}
                                type={fields.type}
                                autoComplete
                                autoFocus={fields.autoFocus}
                                onChange={handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[fields.name] && Boolean(formik.errors[fields.name])}
                                helperText={formik.touched[fields.name] && formik.errors[fields.name]}
                                value={formik.values?.[fields.name]}
                            />
                        </div>
                    )
                })}

                <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn" type='submit'>
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="text-center p-t-115">
                    <span className="txt1">
                        Already have a account {' '}
                    </span>
                    <span className="txt2 cursor-pointer" onClick={handleFlip}>
                        Sign In
                    </span>
                </div>
            </form>
        </div>
    )
}
