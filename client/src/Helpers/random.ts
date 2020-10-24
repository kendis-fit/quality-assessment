export const generateRandom = (): number => Number(String(Math.random()).slice(2));

export const rand = (begin: number, end: number) => {
    const random = generateRandom();
    return begin + random % end;
}