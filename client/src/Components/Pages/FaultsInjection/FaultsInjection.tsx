import { nanoid } from "nanoid";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { makeStyles, TextField, Button, RadioGroup, Radio, FormControlLabel, styled, Typography } from "@material-ui/core";

import sizes from "../../../Constants/sizes";
import mockText from "../../../Helpers/mockText";
import { isStringNumber } from "../../../Helpers/regExpressions";

interface IFaultsInjectionsForm {
    programmingLanguage: string;
    mathOperations: number;
    logicalOperations: number;
    valueConstants: number;
    nameVariables: number;
};

interface IMockedString {
    id: string;
    codeNumber: number;
    mockedString: string;
    previousString: string;
}

const useStyles = makeStyles({
    mainPage: {
        display: "flex",
        margin: 20
    },
    wrapperButton: {
        marginRight: 10,
    },
    leftBlock: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        marginRight: "20px",
    },
    rightBlock: {
        display: "flex",
        flexDirection: "column",
        width: "60%"
    },
    block: {
        marginBottom: 20,
        padding: 10,
        border: "2px dashed #3f51b5",
    },
    reportContainer: {
        padding: 10,
        border: "2px dashed #3f51b5",
        height: `calc(100vh - ${sizes.headerHeight} - 40px)`
    },
    languagesContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end"
    }
});

const Title = styled(Typography)({
    marginBottom: 9
});

const initialValues: IFaultsInjectionsForm = {
    programmingLanguage: "",
    mathOperations: 0,
    logicalOperations: 0,
    valueConstants: 0,
    nameVariables: 0,
};

const FaultsInjection = () => {
    const classes = useStyles();
    const fileRef = useRef<HTMLInputElement>(null);
    const [nameFile, setNameFile] = useState("");
    const [contentFile, setContentFile] = useState("");
    const [mockedContentFile, setMockedContentFile] = useState("");
    const [mockedStrings, setMockedStrings] = useState<IMockedString[]>([]);
    const formik = useFormik({
        initialValues,
        onSubmit: (values: IFaultsInjectionsForm) => {
            setMockedStrings([]);
            const mockedContent = mockText(contentFile, values, (codeNumber: number, mockedString: string, previousString: string) => {
                setMockedStrings((previousState) => [...previousState, { id: nanoid(), codeNumber, mockedString, previousString }]);
            });
            setMockedContentFile(mockedContent);
        }
    });

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            
            const reader = new FileReader();
            reader.readAsText(file);
    
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setNameFile(file.name);
                    setContentFile(reader.result);
                }
            }
        }
    }

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        if (isStringNumber(number)) {
            formik.handleChange(e);
        }
    }

    return (
        <div className={classes.mainPage}>
            <div className={classes.leftBlock}>
                <div className={classes.block}>
                    <Title>Select input file:</Title>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input ref={fileRef} type="file" onChange={getFile} style={{ display: "none" }} />
                        <Button className={classes.wrapperButton} onClick={() => fileRef?.current?.click()} variant="contained" color="primary">Select file</Button>
                        <Typography>{nameFile || "Name file..."}</Typography>
                    </div>
                </div>
                <div className={classes.block}>
                    <Typography>Select programming language:</Typography>
                    <RadioGroup className={classes.languagesContainer} name="programmingLanguage" value={formik.values.programmingLanguage} onChange={formik.handleChange}>
                        <FormControlLabel 
                            value="c++"
                            control={<Radio color="primary" />}
                            label="C++"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="java"
                            control={<Radio color="primary" />}
                            label="Java"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="python"
                            control={<Radio color="primary" />}
                            label="Python"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="php"
                            control={<Radio color="primary" />}
                            label="Php"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="sql"
                            control={<Radio color="primary" />}
                            label="SQL"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </div>
                <div className={classes.block}>
                    <Title>Select type of faults and their amount:</Title>
                    <div>
                        <div>
                            <Typography>Math operations</Typography>
                            <TextField 
                                type="number"
                                name="mathOperations"
                                value={formik.values.mathOperations}
                                onChange={handleChangeNumber}
                            />
                        </div>
                        <div>
                            <Typography>Logical operations</Typography>
                            <TextField
                                type="number"
                                name="logicalOperations"
                                value={formik.values.logicalOperations}
                                onChange={handleChangeNumber}
                            />
                        </div>
                        <div>
                            <Typography>Value of constants</Typography>
                            <TextField
                                type="number"
                                name="valueConstants"
                                value={formik.values.valueConstants}
                                onChange={handleChangeNumber}
                            />
                        </div>
                        <div>
                            <Typography>Replacing of names of variables</Typography>
                            <TextField
                                type="number"
                                name="nameVariables"
                                value={formik.values.nameVariables}
                                onChange={handleChangeNumber}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button disabled={!mockedContentFile || !mockedStrings.length} className={classes.wrapperButton} variant="contained">Save injected file</Button>
                    <Button disabled={!contentFile} onClick={() => formik.handleSubmit()} variant="contained" color="primary">Inject faults and show a report</Button>
                </div>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.reportContainer}>
                    <ul>
                        {
                            mockedStrings.map((mockedString) => (
                                <li key={mockedString.id}>
                                    <p>{mockedString.previousString}</p>
                                    <p>{mockedString.mockedString}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FaultsInjection;
