import * as math from "mathjs";
import { useDispatch } from "react-redux";
import { object, array, number, string } from "yup";
import { Redirect } from "react-router-dom";
import { useVanillaForm } from "vanilla-hooks";
import React, { useState, useEffect } from "react";
import { Grid, FormControl, TextField, FormLabel, Typography, Button, styled, makeStyles, FormHelperText } from "@material-ui/core";

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
import { IProfileResponse } from "../../../Api/ProjectAPI/Interfaces/IProfileResponse";
import { DialogResultIndex, DialogInformationIndex, DialogDiagramIndex } from "./Dialogues";

const schema = object().shape({
    indexes: array(object({
        name: string(),
        coefficients: array(object({
            name: string(),
            value: number()
                .required(),
            metric: object({
                name: string(),
                value: number(),
                primitive: object({
                    primitives: array(object({
                        name: string(),
                        value: number()
                            .required()
                    }))
                })
                .notRequired()
            })
            .notRequired()
        }))
        .test("", "coefficients aren't equal 1", (values: ICoefficient[]) => {
            try {
                const coefficientSum = values.map(val => val.value).reduce((first, second) => math.evaluate((first as any) + (second as any)));
                return Number.parseFloat(math.format(coefficientSum, 14)) === 1;
            } catch {
                return false;
            }
        })
    })
)});

const useStyles = makeStyles({
    profileForm: {
        margin: "10px 10px 0 10px"
    }
});

const ProfileBlock = styled(Grid)({
    height: `calc(100vh - ${sizes.headerHeight} - 65px)`,
    marginBottom: "10px",
    overflow: "auto",
});

const BackButton = styled(Button)((props: { canBeVisible: boolean }) => ({
    visibility: "hidden",
    "@media screen and (max-width: 650px)": {
        visibility: props.canBeVisible ? "visible" : "hidden"
    },
}));

export const Profile = (props: IProfile) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [nameIndex, setNameIndex] = useState("");
    const [nameIndexDiagram, setNameIndexDiagram] = useState("");
    const [informationIndex, setInformationIndex] = useState<IIndex>();
    const [data, setData] = useState<IProfileResponse>();
    const [error, setError] = useState<ServerError>();
    const [loading, setLoading] = useState(false);
    const api = new ProjectAPI();
    const { errors, handleSubmit } = useVanillaForm<any>({
        schema,
        validateChange: true,
        onSubmit: (isValid, values, errors) => {
            if (isValid) {
                console.log("values", values.indexes);
                updateProfile(values.indexes);
            }
            console.log("isValid", isValid);
            console.log("erorrs", errors);
        },
        allFieldsExisted: false
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await api.findById(props.id);
                setData(data);
                if (isValid(data.profile)) {
                    setShowActions(true);
                } else {
                    setShowActions(false);
                }
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

    const isValid = (profile: IIndex[]) => {
        for (const index of profile) {
            for (const coeff of index.coefficients) {
                if (someCoefficientUndefined(coeff)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    const someCoefficientUndefined = (coeff: ICoefficient) => {
        const emptyCoeff = !coeff.value;
        const emptyMetric = coeff.metric && !coeff.metric.value;
        const emptyPrimitives = coeff.metric && coeff.metric.primitive && 
            coeff.metric.primitive.primitives.filter(primitive => !primitive.value).length > 0;
        return emptyCoeff || emptyMetric || emptyPrimitives;
    }

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
            setShowActions(true);
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
            (data && data.profile) ?
            <form className={classes.profileForm} onSubmit={e => { e.preventDefault(); handleSubmit(); }} onInput={() => setShowActions(false)}>
                <ProfileBlock>
                {
                    data.profile.map((item, indexId) => { 
                        return <Grid key={indexId}>
                        <FormControl error={!!errors[`indexes[${indexId}].coefficients`]}>
                            <FormLabel>
                                <Typography>{item.name}</Typography>
                                <input type="hidden" name={`indexes[${indexId}].name`} value={item.name} />
                                <FormHelperText>{typeof error === "string" ? error : " "}</FormHelperText>
                            </FormLabel>
                            <Grid container direction="row">
                            {
                                item.coefficients.map((coefficient, coeffId) => 
                                    <FormControl error={!!errors[`indexes[${indexId}].coefficients[${coeffId}].value`]} key={coeffId}>
                                        <FormLabel>
                                            <Typography>{coefficient.name}</Typography>
                                            <input type="hidden" name={`indexes[${indexId}].coefficients[${coeffId}].name`} value={coefficient.name} />
                                        </FormLabel>
                                        <TextField defaultValue={coefficient.value} name={`indexes[${indexId}].coefficients[${coeffId}].value`} />
                                        {
                                            coefficient.metric && <Grid>
                                                <FormControl error={!!errors[`indexes[${indexId}].coefficients[${coeffId}].metric.value`]}>
                                                    <FormLabel>
                                                        <Typography>{coefficient.metric.name}</Typography>
                                                        <input type="hidden" name={`indexes[${indexId}].coefficients[${coeffId}].metric.name`} value={coefficient.metric.name} />
                                                    </FormLabel>
                                                    <TextField disabled={!!coefficient.metric.primitive} defaultValue={coefficient.metric.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.value`}  />
                                                </FormControl>
                                                {
                                                    coefficient.metric.primitive && <Grid>
                                                        {
                                                            coefficient.metric.primitive.primitives.map((primitive, primitiveId) =>
                                                                <FormControl error={!!errors[`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`]} key={primitiveId}>
                                                                    <FormLabel>
                                                                        <Typography>{primitive.name}</Typography>
                                                                        <input type="hidden" name={`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].name`} value={primitive.name} />
                                                                    </FormLabel>
                                                                    <TextField defaultValue={primitive.value} name={`indexes[${indexId}].coefficients[${coeffId}].metric.primitive.primitives[${primitiveId}].value`} onChange={(e) => {
                                                                        if (coefficient.metric) {
                                                                            coefficient.metric.primitive?.primitives.forEach(p => {
                                                                                if (p.name === primitive.name) {
                                                                                    p.value = Number.parseFloat(e.target.value);
                                                                                }
                                                                            });
                                                                        }
                                                                        (document.querySelector(`[name="indexes[${indexId}].coefficients[${coeffId}].metric.value"]`) as any).value = 1;
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
                            <Grid title={ showActions ? "" : "You need to save project with filled fields" }>
                                <Button disabled={!showActions} color="primary" onClick={() => setNameIndex(item.name)}>Calculate</Button>
                                <Button disabled={!showActions} color="primary" onClick={() => setNameIndexDiagram(item.name)}>Show chart</Button>
                                <Button disabled={!showActions} color="primary" onClick={() => setInformationIndex(item)}>Information</Button>
                            </Grid>
                        </FormControl>
                    </Grid>}
                    ) 
                }
                </ProfileBlock>
                <Grid container justify="space-between">
                    <BackButton canBeVisible={!!props.handleBack} onClick={props.handleBack} type="button" variant="contained" size="large" color="secondary">Back</BackButton>
                    <Button type="submit" variant="contained" size="large" color="primary">Save</Button>
                </Grid>
            </form> : <div>Group doesn't have profile</div>
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