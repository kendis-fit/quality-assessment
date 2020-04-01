import React from "react";
import * as yup from "yup";
import math from "mathjs";
import { Formik, Form } from "formik";
import { Grid, FormControl, Button, TextField, FormLabel, Typography } from "@material-ui/core";

import IIndex from "./Interfaces/IIndex";
import IProfile from "./Interfaces/IProfile";
import useDataApi from "../../Hooks/useDataApi";
import RequirementAPI from "../../Api/RequirementAPI";
import UniversalProjectAPI from "../../Api/UniversalProjectAPI";
import IPrimitiveMeta from "./Interfaces/IPrimitiveMeta";
import IPrimitive from "./Interfaces/IPrimitive";
import IMetric from "./Interfaces/IMetric";

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

const getApiByType = (isRequirement: boolean, id: number) => {
    if (isRequirement) {
        return () => new RequirementAPI("").GetProjectById(id);
    } else {
        return () => new UniversalProjectAPI("").GetProjectById(id);
    }
}

const Profile = (props: IProfile) => {

    const { data, error, loading } = useDataApi<IIndex[]>(getApiByType(props.isRequirement, props.match.params.id));

    const CheckPrimitives = (primivies: IPrimitive[]) => primivies.some(primitive => !primitive.value);

    const CalculateMetric = (primitive: IPrimitiveMeta): number | null => {
        const somePrimitiveNull = CheckPrimitives(primitive.primitives);
        if (somePrimitiveNull) {
            return null;
        }
        const variables = primitive.primitives.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {});
        return math.evaluate(primitive.formula, variables);
    }

    const GetValueOfMetric = (metric: IMetric): number | null => {
        if (metric.primitive) {
            return CalculateMetric(metric.primitive);
        }
        return metric.value;
    }

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
                                                            <TextField disabled={!!coefficient.metric.primitive} defaultValue={GetValueOfMetric(coefficient.metric)} value={GetValueOfMetric(coefficient.metric)} name={`indexes[${indexId}].coefficients[${coeffId}].metric.value`} onChange={handleChange} />
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