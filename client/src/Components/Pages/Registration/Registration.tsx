import * as yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Grid, Link as LinkComponent, makeStyles, TextField, Button, Typography, FormControl, InputLabel, InputAdornment, IconButton, FormHelperText, OutlinedInput } from "@material-ui/core";

import UserAPI from "../../../Api/UserAPI";
import IRegistration from "./Interfaces/IRegistration";
import ServerError from "../../../Api/Interfaces/ServerError";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import background from "../../../Images/background-registration.jpg";

const initialValues: IRegistration = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: yup.string()
        .required("Password is required")
        .min(8, "Password has to have length more or equal 8"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .test("password-match", "Passwords must match", function(value: string) {
            return this.parent.password === value;
        })
});

const useStyles = makeStyles({
    title: {
        fontSize: "24px",
        marginTop: "75px",
        marginBottom: "20px"
    },
    form: {
        background: `url(${background}) no-repeat`,
        backgroundSize: "cover",
        width: "100",
        height: "100vh"
    },
    formContent: {
        background: "rgba(255, 255, 255, 1)",
        width: "500px",
        height: "100vh"
    },
    textFields: {
        width: "400px"
    },
    link: {
        marginTop: "20px"
    }
});

const Registration = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    if (isRedirect || sessionStorage["token"]) {
        return <Redirect to="/projects" />
    }

    return(
        <Formik 
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async values => {
                try {
                    const userResponse = await new UserAPI().registration(values);
                    sessionStorage["token"] = userResponse.token;
                    setIsRedirect(true);
                } catch(error) {
                    if (error instanceof ServerError) {
                        dispatch(showAlert({
                            open: true,
                            color: "error",
                            message: error.reason
                        }));
                    } else {
                        dispatch(showAlert({
                            open: true,
                            color: "error",
                            message: "Service doesn't work. Try to repeate later"
                        }));
                    }
                }
            }}
            >
            {
                ({ values, handleChange, errors }) => (
                    <Form className={classes.form}>
                        <Grid className={classes.formContent} alignContent="center" container direction="column">
                            <Typography className={classes.title} align="center">Product Quality Assessment</Typography>
                            <TextField 
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name || " "}
                                variant="outlined"
                                color="primary"
                                size="small"
                                className={classes.textFields}
                                />
                            <TextField 
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email || " "}
                                variant="outlined"
                                color="primary"
                                size="small"
                                />
                            <FormControl error={!!errors.password} variant="outlined" size="small">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    color="primary"
                                    labelWidth={80}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                <FormHelperText>{errors.password || " "}</FormHelperText>
                            </FormControl>
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showPassword ? "text" : "password"}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword || " "}
                                variant="outlined"
                                color="primary"
                                size="small"
                                />
                            <Button type="submit" variant="contained" color="primary">
                                <Typography>Sign up</Typography>
                            </Button>
                            <LinkComponent className={classes.link} align="center">
                                <Link to="/login">Login</Link>
                            </LinkComponent>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Registration;