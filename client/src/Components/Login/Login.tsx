import * as yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Link,Redirect } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Grid, Link as LinkComponent, makeStyles, TextField, Button, Typography, FormControl, InputLabel, InputAdornment, IconButton, FormHelperText, OutlinedInput } from "@material-ui/core";

import UserAPI from "../../Api/UserAPI";
import ILogin from "./Interfaces/ILogin";
import background from "../../Images/background-registration.jpg";
import ServerError from "../../Api/Interfaces/ServerError";

const initialValues: ILogin = {
    email: "",
    password: ""
}

const schema = yup.object().shape({
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: yup.string()
        .required("Password is required")
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

const Login = () => {
    
    const classes = useStyles(); 
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
                    const userResponse = await new UserAPI().login(values);
                    sessionStorage["token"] = userResponse.token;
                    setIsRedirect(true);
                } catch (error) {
                    if (error instanceof ServerError) {

                    } else {
                        
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
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email || " "}
                                variant="outlined"
                                color="primary"
                                size="small"
                                className={classes.textFields}
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
                            <Button type="submit" variant="contained" color="primary">
                                <Typography>Sign in</Typography>
                            </Button>
                            <LinkComponent className={classes.link} align="center">
                                <Link to="/registration">Create an account</Link>
                            </LinkComponent>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Login;