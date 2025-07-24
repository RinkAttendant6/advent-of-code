const isAbba = (str: string): boolean => /(.)(?!\1)(.)\2\1/.test(str);

export const part1 = (input: string) =>
    input.split('\n').map((line) => line.split(/\[|\]/)).filter((lineParts) => {
        const partsOutside = lineParts.filter((_, k) => k % 2 === 0);
        const partsInside = lineParts.filter((_, k) => k % 2 === 1);

        return partsOutside.some(isAbba) && !partsInside.some(isAbba);
    }).length;

export const part2 = (input: string) => undefined;

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/7.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
