import React, { useState, useEffect } from "react";
import * as yup from "yup";
import * as math from "mathjs";
import { Formik, Form, getIn } from "formik";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, FormControl, TextField, FormLabel, Typography, Button, styled, FormHelperText } from "@material-ui/core";

import sizes from "../../../Constants/sizes";
import { IIndex } from "./Interfaces/IIndex";
import { IMetric } from "./Interfaces/IMetric";
import { IProfile } from "./Interfaces/IProfile";
import { IPrimitive } from "./Interfaces/IPrimitive";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { ICoefficient } from "./Interfaces/ICoefficient";
import { IPrimitiveMeta } from "./Interfaces/IPrimitiveMeta";
import { ServerError } from "../../../Api/Errors/ServerError";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { DialogResultIndex, DialogInformationIndex, DialogDiagramIndex } from "./Dialogues";
import { IProfileResponse } from "../../../Api/ProjectAPI/Interfaces/IProfileResponse";

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
            try {
                return Number.parseInt(values.map(val => val.value).reduce((first, second) => (first as any) + (second as any)) as any) === 1;
            } catch {
                return false;
            }
        })
    })
)});

const ProfileForm = styled(Form)({
    margin: "10px 10px 0 10px"
});

const ProfileBlock = styled(Grid)({
    height: `calc(100vh - ${sizes.headerHeight} - 65px)`,
    marginBottom: "10px",
    overflow: "auto",
});

const BackButton = styled(Button)({
    visibility: "hidden",
    "@media screen and (max-width: 650px)": {
        visibility: "visible"
    }
});

export const Profile = (props: IProfile) => {
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const [nameIndex, setNameIndex] = useState("");
    const [nameIndexDiagram, setNameIndexDiagram] = useState("");
    const [informationIndex, setInformationIndex] = useState<IIndex>();
    const [data, setData] = useState<IProfileResponse>();
    const [error, setError] = useState<ServerError>();
    const [loading, setLoading] = useState(false);
    const api = new ProjectAPI();

    useEffect(() => {
        const getData = async () => {
            try {
                setData(await api.findById(props.id));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        setLoading(true);
        getData();
        // eslint-disable-next-line
    }, [props.id]); 

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
            await api.update(props.id, values);
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
            message: error.reason,
            color: "error"
        }));
    }

    if (isRedirect) {
        return <Redirect to="/login" />
    }

    if (error) {
        showError(error);
    }
    
    if (loading) return <div>Loading...</div>
    
    return(
        <>
        {
            (data && data.profile) ? <Formik 
            initialValues={{ indexes: data.profile }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={values => updateProfile(values.indexes)}
            >
            {
                ({ values, handleChange, errors, setFieldValue }) => (
                    <ProfileForm>
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
                        <Grid container justify="space-between">
                            <BackButton onClick={props.handleBack} type="button" variant="contained" size="large" color="secondary">Back</BackButton>
                            <Button type="submit" variant="contained" size="large" color="primary">Save</Button>
                        </Grid>
                    </ProfileForm>
                )
            }
        </Formik> : <div>Group doesn't have profile</div>
        }
        {
            nameIndex && <DialogResultIndex id={props.id} nameIndex={nameIndex} handleClose={closeResultModal} />
        }
        {
            nameIndexDiagram && <DialogDiagramIndex id={props.id} nameIndex={nameIndexDiagram} handleClose={closeDiagramModal} />
        }
        {
            informationIndex && <DialogInformationIndex index={informationIndex} handleClose={closeInformationModal} />
        }
        </>
    );
}