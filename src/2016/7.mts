const isAbba = (str: string): boolean => /(.)(?!\1)(.)\2\1/.test(str);

export const part1 = (input: string) =>
    input.split('\n').map((line) => line.split(/\[|\]/)).filter((lineParts) => {
        const partsOutside = lineParts.filter((_, k) => k % 2 === 0);
        const partsInside = lineParts.filter((_, k) => k % 2 === 1);

        return partsOutside.some(isAbba) && !partsInside.some(isAbba);
    }).length;

if (import.meta.main) {
    const input = await Deno.readTextFile(
        Deno.args[0] ?? new URL('../../inputs/2016/7.txt', import.meta.url),
    );
    console.log({ part1: part1(input) });
}
