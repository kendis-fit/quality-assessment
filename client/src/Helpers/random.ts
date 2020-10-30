export const generateRandom = (): number => Number(String(Math.random()).slice(2));

export const rand = (begin: number = 0, end: number = 1) => {
    const random = generateRandom();
    return begin + random % end;
};

export const randArray = (length: number) => {
    const array: number[] = [];
    for (let i = 1; i < length; ++i) {
        array.push(rand());
    }
    return array;
};
