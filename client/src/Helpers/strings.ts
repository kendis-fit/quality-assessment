export const replaceFrom = (string: string, index: number, regExp: RegExp, replacedString: string) => {
    let counter = -1;
    return string.replace(regExp, (match) => {
        ++counter;
        return counter === index ? replacedString : match;
    })
};
