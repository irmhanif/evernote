import React, { useState } from 'react'
import './Login.scss';
import Logo from '../components/Logo';
import InputField from '../components/TextField';

export default function SignUp(props) {
    const { handleFlip } = props
    const [FormData, setFormData] = useState({})
    const [showError, setShowError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = FormData;
        setShowError(true)
        console.log({
            email: data.email,
            password: data.password,
            cpassword: data.cpassword,
            name: data.name,
        });

    }

    const handleChange = (value, id) => {
        setFormData({ ...FormData, [id]: value });

    }

    const getError = (id) => {
        return FormData[id] === '' && showError
    }
    return (
        <div className="wrap-login100" >
            <form className="signUp-form validate-form" onSubmit={handleSubmit}>
                <span className="login100-form-title p-b-26">
                    Sign Up
                    <Logo />
                </span>
                <div className="wrap-input100 validate-input" data-validate="Valid Name is: abc">
                    <InputField
                        margin="normal"
                        required={true}
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        handleChange={handleChange}
                        error={getError('name')}
                    />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                    <InputField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        handleChange={handleChange}
                    />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <span className="btn-show-pass">
                        <i className="zmdi zmdi-eye"></i>
                    </span>
                    <InputField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        handleChange={handleChange}
                    />
                </div><div className="wrap-input100 validate-input" data-validate="Enter password">
                    <span className="btn-show-pass">
                        <i className="zmdi zmdi-eye"></i>
                    </span>
                    <InputField
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        autoComplete="current-password"
                        handleChange={handleChange}
                    />
                </div>
                <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn" onClick={handleSubmit}>
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
