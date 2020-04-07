import React, { useState } from "react";
import * as yup from "yup";
import * as math from "mathjs";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, FormControl, TextField, FormLabel, Typography, Button, styled } from "@material-ui/core";

import IMetric from "./Interfaces/IMetric";
import IProfile from "./Interfaces/IProfile";
import sizes from "../../../Constants/sizes";
import IPrimitive from "./Interfaces/IPrimitive";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { useDataApi } from "../../../Hooks/useDataApi";
import IPrimitiveMeta from "./Interfaces/IPrimitiveMeta";
import { RequirementAPI } from "../../../Api/RequirementAPI";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { IIndex } from "./Interfaces/IIndex";
import { ServerError } from "../../../Api/Errors/ServerError";

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
        .test("coefficient test", "Error", (value) => {
            return true;
        })
}))});

const ProfileBlock = styled(Grid)({
    height: `calc(100vh - ${sizes.headerHeight} - 65px)`,
    marginBottom: "10px",
    overflow: "auto"
});

const getApiByType = (isRequirement: boolean) => {
    if (isRequirement) {
        return new RequirementAPI();
    } else {
        return new ProjectAPI();
    }
}

const Profile = (props: IProfile) => {
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const api = getApiByType(props.isRequirement);
    const { data, error, loading } = useDataApi(() => api.findById(props.match.params.id));

    const checkPrimitives = (primitives: IPrimitive[]) => primitives.some(primitive => Number.isNaN(Number.parseFloat(primitive.value as any)));

    const calculateMetric = (primitive: IPrimitiveMeta): number | null => {
        if (checkPrimitives(primitive.primitives)) {
            return null;
        }
        const variables = primitive.primitives.reduce((obj, item) => Object.assign(obj, { [item.name]: Number.parseFloat(item.value as any) }), {});
        return math.evaluate(primitive.formula, variables);
    }

    const getValueOfMetric = (metric: IMetric): number | null => {
        if (metric.primitive) {
            return calculateMetric(metric.primitive);
        }
        return metric.value;
    }

    const updateProfile = async (values: IIndex[]) => {
        try {
            await api.update(props.match.params.id, values);
        } catch (error) {
            if (error instanceof ServerError) {
                dispatch(showAlert({
                    open: true,
                    message: error.reason
                }));
            }
        }
    }

    if (error) {
        if (error.redirectToLogin) {
            setIsRedirect(true);
        }
        dispatch(showAlert({
            open: true,
            message: error.reason
        }))
    }
    
    if (loading) return <div>Loading...</div>
    
    if (isRedirect) {
        return <Redirect to="/login" />
    }

    return(
        <Formik 
            initialValues={{ indexes: data.profile }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={values => updateProfile(values.indexes)}
            >
            {
                ({ values, handleChange, errors }) => (
                    <Form>
                        <ProfileBlock>
                        {
                           values.indexes.map((item, indexId) => 
                            <Grid key={indexId}>
                                <FormControl>
                                    <FormLabel title={item.nameIndex}>
                                        <Typography>{item.name}</Typography>
                                    </FormLabel>
                                    <Grid container direction="row">
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
                                                            <TextField disabled={!!coefficient.metric.primitive} defaultValue={getValueOfMetric(coefficient.metric)} value={getValueOfMetric(coefficient.metric)} name={`indexes[${indexId}].coefficients[${coeffId}].metric.value`} onChange={handleChange} />
                                                        </FormControl>
                                                        {
                                                            coefficient.metric.primitive && <Grid>
                                                                {
                                                                    coefficient.metric.primitive.primitives.map((primitive, primitiveId) =>
                                                                        <FormControl key={primitiveId}>
                                                                            <FormLabel>
                                                                                <Typography>{primitive.name}</Typography>
                                                                            </FormLabel>
                                                                            <TextField defaultValue={primitive.value} value={primitive.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`} onChange={handleChange} />
                                                                        </FormControl>
                                                                    )
                                                                }
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                }
                                            </FormControl>)
                                    }
                                    </Grid>
                                </FormControl>
                            </Grid>
                           ) 
                        }
                        </ProfileBlock>
                        <Grid container justify="flex-end">
                            <Button variant="contained" size="large" color="primary">Save</Button>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    );
}

export default Profile;