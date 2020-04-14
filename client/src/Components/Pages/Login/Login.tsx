import * as yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Grid, Link as LinkComponent, makeStyles, styled, TextField, Button, Typography, FormControl, InputLabel, InputAdornment, IconButton, FormHelperText, OutlinedInput, LinearProgress } from "@material-ui/core";

import { ILogin } from "./Interfaces/ILogin";
import { UserAPI } from "../../../Api/UserAPI/UserAPI";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import background from "../../../Images/background-registration.jpg";
import { ServerError } from "../../../Api/Errors/ServerError/ServerError";

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

export const Loading = styled(LinearProgress)((props: any) => ({
    marginBottom: "10px",
    display: props.loading ? "" : "none"
}));

const Login = () => {
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    if (isRedirect || localStorage["token"]) {
        return <Redirect to="/user/projects" />
    }

    return(
        <Formik 
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async values => {
                try {
                    setLoading(true);
                    const userResponse = await new UserAPI().login(values);
                    localStorage["token"] = userResponse.token;
                    setIsRedirect(true);
                    dispatch(showAlert({
                        open: true,
                        color: "success",
                        message: "You have succefully logged in"
                    }));
                } catch (error) {
                    if (error instanceof ServerError) {
                        dispatch(showAlert({
                            open: true,
                            color: "error",
                            message: error.reason
                        }));
                    }
                } finally {
                    setLoading(false);
                }
            }}
            >
            {
                ({ values, handleChange, errors }) => (
                    <Form className={classes.form}>
                        <Grid className={classes.formContent} alignContent="center" container direction="column">
                            <Typography className={classes.title} align="center">Product Quality Assessment</Typography>
                            <Loading loading={loading} variant="query" />
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
                                <Link to="/registration">
                                    <Typography>Create an account</Typography>
                                </Link>
                            </LinkComponent>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Login;