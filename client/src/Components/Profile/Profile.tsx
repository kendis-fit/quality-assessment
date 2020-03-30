import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Grid, FormControl, Button, TextField, FormLabel, Typography } from "@material-ui/core";

import IIndex from "./Interfaces/IIndex";
import IProfile from "./Interfaces/IProfile";
import useDataApi from "../../Hooks/useDataApi";
import RequirementAPI from "../../Api/RequirementAPI";
import UniversalProjectAPI from "../../Api/UniversalProjectAPI";

const schema = yup.object().shape({
    indexes: yup.array(yup.object({
        coefficients: yup.array(yup.object({
            value: yup.number()
                .required(),
            metric: yup.object({
                value: yup.number()
                    .required(),
                primitive: yup.object({
                    primitives: yup.array(yup.object({
                        value: yup.number()
                            .required()
                    }))
                })
                .notRequired()
            })
            .notRequired()
        }))
}))});

const getApiByType = (typeProfile: string, id: number) => {
    switch (typeProfile) {
        case "PROFILE":
            return () => RequirementAPI.GetProjectById(id);
        default:
            return () => UniversalProjectAPI.GetProjectById(id);
    }
}

const Profile = (props: IProfile) => {

    const { data, setData, error, loading } = useDataApi<IIndex[]>(getApiByType(props.typeProfile, props.match.params.id));

    if (loading) return <div>Loading...</div>
    if (error) return <div>An error has occured</div>

    return(
        <Formik 
            initialValues={{ indexes: data }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={values => console.log(values)}
            >
            {
                ({ values, handleChange, errors }) => (
                    <Form>
                        {
                           values.indexes.map((item, indexId) => 
                            <Grid key={indexId}>
                                <FormControl>
                                    <FormLabel title={item.nameIndex}>
                                        <Typography>{item.name}</Typography>
                                    </FormLabel>
                                    {
                                        item.coefficients.map((coefficient, coeffId) => 
                                            <FormControl key={coeffId}>
                                                <FormLabel>
                                                    <Typography>{coefficient.name}</Typography>
                                                </FormLabel>
                                                <TextField defaultValue={coefficient.value} value={coefficient.value} name={`indexes[${indexId}].coefficients[${coeffId}].value`} onChange={handleChange} />
                                                {
                                                    coefficient.metric && <Grid>
                                                        <FormControl>
                                                            <FormLabel>
                                                                <Typography>{coefficient.metric.name}</Typography>
                                                            </FormLabel>
                                                            <TextField disabled={!!coefficient.metric.primitive} defaultValue={coefficient.metric.value} value={coefficient.metric.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.value`} onChange={handleChange} />
                                                        </FormControl>
                                                        {
                                                            coefficient.metric.primitive && <Grid>
                                                                {
                                                                    coefficient.metric.primitive.primitives.map((primitive, primitiveId) => {
                                                                        <FormControl key={primitiveId}>
                                                                            <FormLabel>
                                                                                <Typography>{primitive.name}</Typography>
                                                                            </FormLabel>
                                                                            <TextField defaultValue={primitive.value} value={primitive.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`} onChange={handleChange} />
                                                                        </FormControl>
                                                                    })
                                                                }
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                }
                                            </FormControl>)
                                    }
                                </FormControl>
                            </Grid>
                           ) 
                        }
                    </Form>
                )
            }
        </Formik>
    );
}

export default Profile;