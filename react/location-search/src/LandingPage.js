import React from 'react';
import axios from "axios";
import {Button, IconButton, InputAdornment, Stack, Typography, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './LandingPageStyles.css';
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const [values, setValues] = React.useState({
        login: true,
        username: '',
        password: '',
        showPassword: false,
        loginValid: true,
        usernameError: "",
        passwordError: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUserType = (event) => {
        setValues({
            ...values,
            login: !values.login
        })
    }

    const navigate = useNavigate();

    const navigateToLandingPageLogin = () => {
        localStorage.setItem("token", "true");
        navigate("./user");
        window.location.reload(false);
    }

    const handleLogin = () => {
        if (values.username.length > 0 && values.password.length > 0) {
            axios.get(`http://localhost:8080/api/users/${values.username}`)
                .then(function (response) {
                    if (response.data.length > 0) { // username exists
                        axios.get(`http://localhost:8080/api/match/?username=${values.username}&password=${values.password}`)
                            .then(function (response) {
                                if (response.data) { // password matches
                                    setValues({
                                        ...values,
                                        loginValid: true
                                    });
                                    navigateToLandingPageLogin()
                                } else {
                                    setValues({
                                        ...values,
                                        loginValid: false,
                                        usernameError: undefined,
                                        passwordError: "Incorrect password"
                                    });
                                }
                            })
                    } else {
                        setValues({
                            ...values,
                            loginValid: false,
                            usernameError: "Username does not exist",
                            passwordError: undefined
                        });
                    }
                });
        } else {
            setValues({
                ...values,
                loginValid: false,
                usernameError: (values.username.length === 0) ? "Empty username" : undefined,
                passwordError: (values.password.length === 0) ? "Empty password" : undefined
            });
        }
        localStorage.setItem("token", null);
    }

    const handleSignUp = () => {
        if (values.username.length > 0 && values.password.length > 0) {
            axios.get(`https://location-search-361515.ue.r.appspot.com/users/${values.username}`)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.length === 0) { // username does not exist
                        axios.post(`https://location-search-361515.ue.r.appspot.com/create/?username=${values.username}&password=${values.password}`)
                            .then(function (response) {
                                console.log(response.data);
                                setValues({
                                    ...values,
                                    loginValid: true
                                });
                                localStorage.setItem("token", "true");
                                navigateToLandingPageLogin();
                            })
                    } else {
                        setValues({
                            ...values,
                            loginValid: false,
                            usernameError: "Username already exists",
                            passwordError: undefined
                        });
                    }
                });
        } else {
            setValues({
                ...values,
                loginValid: false,
                usernameError: (values.username.length === 0) ? "Empty username" : undefined,
                passwordError: (values.password.length === 0) ? "Empty password" : undefined
            });
        }
        localStorage.setItem("token", null);
    }

    return (
        <div className="landing-page-div">
            <Stack spacing={2}>
                <Typography variant="h4">Location Search</Typography>
                <Typography>This app returns all locations of interest
                    near a specified coordinate</Typography>
                <TextField
                    id="outlined-adornment-username"
                    type={'text'}
                    value={values.username}
                    onChange={handleChange('username')}
                    placeholder={"Username"}
                    error={!values.loginValid}
                    helperText={values.loginValid ? undefined : values.usernameError}
                />
                <TextField
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    placeholder={"Password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={!values.loginValid}
                    helperText={values.loginValid ? undefined : values.passwordError}
                />
                <Stack direction={"row"} spacing={2}>
                    <Button variant={"contained"} onClick={values.login ? handleLogin : handleSignUp}>
                        {values.login ? "Login" : "Sign Up"}
                    </Button>
                    <Button variant={"outlined"} onClick={handleUserType}>
                        {values.login ? "Not a user?" : "Already a user?"}
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
}

export default LandingPage;
