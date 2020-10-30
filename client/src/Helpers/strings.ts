export const replaceFrom = (string: string, index: number, regExp: RegExp, replacedString: string): string => {
    let counter = -1;
    return string.replace(regExp, (match) => {
        ++counter;
        return counter === index ? replacedString : match;
    })
};

export const replaceLastWordFrom = (string: string, index: number, regExp: RegExp, replacedString: string): string => {
    let counter = -1;
    return string.replace(regExp, (match) => {
        ++counter;
        if (counter === index) {
            const matchedVariables = string.match(regExp);
            if (matchedVariables) {
                const neededString = matchedVariables[index];
                const clearString = removeExtraSpaces(neededString);
                const splitedString = clearString.split(' ');
                const variable = splitedString[splitedString.length - 1];
                return match.replace(variable, replacedString);
            }
        }
        return match; 
    });
};

export const removeExtraSpaces = (string: string) => string.replace(/\s+/g, ' ').trim();
