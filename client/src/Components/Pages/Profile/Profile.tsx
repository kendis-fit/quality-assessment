import React, { useState } from "react";
import * as yup from "yup";
import * as math from "mathjs";
import { Formik, Form, getIn } from "formik";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, FormControl, TextField, FormLabel, Typography, Button, styled, FormHelperText } from "@material-ui/core";

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
import ICoefficient from "./Interfaces/ICoefficient";
import { DialogResultIndex, DialogInformationIndex, DialogDiagramIndex } from "./Dialogues";

const schema = yup.object().shape({
    indexes: yup.array(yup.object({
        coefficients: yup.array(yup.object({
            value: yup.number()
                .required(),
            metric: yup.object({
                value: yup.number(),
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
        .test("", "coefficients aren't equal 1", (values: ICoefficient[]) => {
            return Number.parseInt(values.map(val => val.value).reduce((first, second) => (first as any) + (second as any)) as any) === 1;
        })
    })
)});

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
    const [nameIndex, setNameIndex] = useState("");
    const [nameIndexDiagram, setNameIndexDiagram] = useState("");
    const [informationIndex, setInformationIndex] = useState<IIndex>();
    const api = new ProjectAPI();
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
            dispatch(showAlert({
                open: true,
                message: "Project was succefully updated",
                color: "success"
            }));
        } catch (error) {
            showError(error);
        }
    }

    const closeResultModal = () => {
        setNameIndex("");
    }

    const closeDiagramModal = () => {
        setNameIndexDiagram("");
    }

    const closeInformationModal = () => {
        setInformationIndex(undefined);
    }

    const showError = (error: ServerError) => {
        if (error.redirectToLogin) {
            setIsRedirect(true);
        }
        dispatch(showAlert({
            open: true,
            message: error.reason
        }));
    }

    if (error) {
        showError(error);
    }
    
    if (loading) return <div>Loading...</div>
    
    if (isRedirect) {
        return <Redirect to="/login" />
    }

    return(
        <>
        <Formik 
            initialValues={{ indexes: data.profile }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={values => updateProfile(values.indexes)}
            >
            {
                ({ values, handleChange, errors, setFieldValue }) => (
                    <Form>
                        <ProfileBlock>
                        {
                           values.indexes.map((item, indexId) => { 
                                const error = getIn(errors, `indexes[${indexId}].coefficients`);
                                return <Grid key={indexId}>
                                <FormControl error={!!error}>
                                    <FormLabel>
                                        <Typography>{item.name}</Typography>
                                    </FormLabel>
                                    <Grid container direction="row">
                                    {
                                        item.coefficients.map((coefficient, coeffId) => 
                                            <FormControl error={!!getIn(errors, `indexes[${indexId}].coefficients[${coeffId}].value`)} key={coeffId}>
                                                <FormLabel>
                                                    <Typography>{coefficient.name}</Typography>
                                                </FormLabel>
                                                <TextField value={coefficient.value} name={`indexes[${indexId}].coefficients[${coeffId}].value`} onChange={handleChange} />
                                                {
                                                    coefficient.metric && <Grid>
                                                        <FormControl error={!!getIn(errors, `indexes[${indexId}].coefficients[${coeffId}].metric.value`)}>
                                                            <FormLabel>
                                                                <Typography>{coefficient.metric.name}</Typography>
                                                            </FormLabel>
                                                            <TextField disabled={!!coefficient.metric.primitive} value={coefficient.metric.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.value`} onChange={handleChange} />
                                                        </FormControl>
                                                        {
                                                            coefficient.metric.primitive && <Grid>
                                                                {
                                                                    coefficient.metric.primitive.primitives.map((primitive, primitiveId) =>
                                                                        <FormControl error={!!getIn(errors, `indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`)} key={primitiveId}>
                                                                            <FormLabel>
                                                                                <Typography>{primitive.name}</Typography>
                                                                            </FormLabel>
                                                                            <TextField value={primitive.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`} onChange={(e) => {
                                                                                handleChange(e);
                                                                                if (coefficient.metric) {
                                                                                    coefficient.metric.primitive?.primitives.forEach(p => {
                                                                                        if (p.name === primitive.name) {
                                                                                            p.value = Number.parseFloat(e.target.value);
                                                                                        }
                                                                                    });
                                                                                    setFieldValue(`indexes[${indexId}].coefficients[${coeffId}].metric.value`, getValueOfMetric(coefficient.metric));
                                                                                }
                                                                            }} />
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
                                    <Grid>
                                        <Button color="primary" onClick={() => setNameIndex(item.name)}>Calculate</Button>
                                        <Button color="primary" onClick={() => setNameIndexDiagram(item.name)}>Show chart</Button>
                                        <Button color="primary" onClick={() => setInformationIndex(item)}>Information</Button>
                                    </Grid>
                                    <FormHelperText>{typeof error === "string" ? error : " "}</FormHelperText>
                                </FormControl>
                            </Grid>}
                           ) 
                        }
                        </ProfileBlock>
                        <Grid container justify="flex-end">
                            <Button type="submit" variant="contained" size="large" color="primary">Save</Button>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
        {
            nameIndex && <DialogResultIndex id={props.match.params.id} nameIndex={nameIndex} handleClose={closeResultModal} />
        }
        {
            nameIndexDiagram && <DialogDiagramIndex id={props.match.params.id} nameIndex={nameIndexDiagram} handleClose={closeDiagramModal} />
        }
        {
            informationIndex && <DialogInformationIndex index={informationIndex} handleClose={closeInformationModal} />
        }
        </>
    );
}

export default Profile;