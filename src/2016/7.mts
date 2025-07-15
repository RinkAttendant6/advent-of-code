import rawInput from '#inputs/2016/7.txt' with { type: 'text' };

const input = rawInput.split('\n');

const isAbba = (str: string): boolean => /(.)(?!\1)(.)\2\1/.test(str);

export const part1 =
    input.map((line) => line.split(/\[|\]/)).filter((lineParts) => {
        const partsOutside = lineParts.filter((_, k) => k % 2 === 0);
        const partsInside = lineParts.filter((_, k) => k % 2 === 1);

        return partsOutside.some(isAbba) && !partsInside.some(isAbba);
    }).length;

if (import.meta.main) {
    console.log({ part1 });
}
