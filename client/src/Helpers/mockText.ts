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
    let modifiedMockedString = string;
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
        modifiedString = replaceFrom(modifiedString, counterOfMockedSymbols, regExp, replacedSelection[randIndex]);
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

    const splitedText = text.split('\n');
    const mockedText = splitedText.map((string, codeNumber) => {
        let mockedString = string;
        if (mathOperationCount !== options.mathOperations) {
            const result = mockString(string, mockedString, options.mathOperations, /[+-/*]/g, mathOperations, codeNumber + 1, getMockedStringCallback);
            mockedString = result.modifiedMockedString;
            mathOperationCount += result.count;
        }
        if (logicalOperationCount !== options.logicalOperations) {
            const result = mockString(string, mockedString, options.logicalOperations, /!/g, logicalOperations, codeNumber + 1, getMockedStringCallback);
            mockedString = result.modifiedMockedString;
            logicalOperationCount += result.count;
        }
        return mockedString;
    });

    return mockedText.join('\n');
}

export default mockText;
