import { rand } from "./random";
import { replaceFrom } from "./strings";

interface IMockOptions {
    mathOperations: number,
    logicalOperations: number,
    valueConstants: number,
    nameVariables: number,
}

interface IMockStringResult {
    count: number;
    modifiedMockedString: string;
}

type GetMockedStringCallback = (codeNumber: number, mockedString: string, previousString: string) => void;

const mockString = (
    string: string,
    modifiedString: string,
    maxMockingRate: number,
    regExp: RegExp,
    replacedSelection: string[],
    codeNumber?: number,
    getMockedStringCallback?: GetMockedStringCallback
): IMockStringResult => {
    let mockedString = string;
    let modifiedMockedString = modifiedString;
    let counterOfMockedSymbols = 0;
    const countMatchedSymbols = string.match(regExp)?.length || 0;
    if (countMatchedSymbols === 0) {
        return {
            modifiedMockedString: modifiedString,
            count: 0,
        }
    }
    do {
        const randIndex = rand(0, replacedSelection.length);
        mockedString = replaceFrom(string, counterOfMockedSymbols, regExp, replacedSelection[randIndex]);
        modifiedMockedString = replaceFrom(modifiedMockedString, counterOfMockedSymbols, regExp, replacedSelection[randIndex]);
        if (mockedString !== string) {
            ++counterOfMockedSymbols;
            getMockedStringCallback?.(codeNumber as number, mockedString, string);
            if (counterOfMockedSymbols === maxMockingRate) {
                break;
            }
        }
    } while (mockedString === string || counterOfMockedSymbols < countMatchedSymbols);
    return {
        modifiedMockedString,
        count: counterOfMockedSymbols,
    };
}

const mockText = (text: string, options: IMockOptions, getMockedStringCallback?: GetMockedStringCallback): string => {
    const logicalOperations = ["!", "||", "&&"];
    const mathOperations = ["+", "/", "*", "-"];

    let mathOperationCount = 0;
    let logicalOperationCount = 0;
    let valueConstantsCount = 0;

    const splitedText = text.split('\n');
    const mockedText = splitedText.map((string, codeNumber) => {
        let mockedString = string;
        if (mathOperationCount < options.mathOperations) {
            const result = mockString(string, mockedString, options.mathOperations - mathOperationCount, /[+-/*]/g, mathOperations, codeNumber + 1, getMockedStringCallback);
            mockedString = result.modifiedMockedString;
            mathOperationCount += result.count;
        }
        if (logicalOperationCount < options.logicalOperations) {
            const result = mockString(string, mockedString, options.logicalOperations - logicalOperationCount, /(!|(\s&{2}\s)|(\s\|{2}\s))/g, logicalOperations, codeNumber + 1, getMockedStringCallback);
            mockedString = result.modifiedMockedString;
            logicalOperationCount += result.count;
        }
        // if (valueConstantsCount !== options.valueConstants) {
        //     const result = mockString(string, mockedString, options.valueConstants, /const\s(unsigned|signed|short)?\s+(int|string|bool|char|long|double|float)\s+\w+\s*=\s*(("|').*("|')|false|true|-?\d*\.?\d*);/g, ['test'], codeNumber + 1, getMockedStringCallback);
        // }
        return mockedString;
    });

    return mockedText.join('\n');
}

export default mockText;
