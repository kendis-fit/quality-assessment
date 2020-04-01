import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";

const initialValues = {
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

const Registration = () => {
    return(
        <Formik 
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => console.log(values)}
            >
            {
                ({ values, handleChange, errors }) => (
                    <Form>

                    </Form>
                )
            }
        </Formik>
    )
}

export default Registration;