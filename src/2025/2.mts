const normalizeInput = (rawInput: string): [number, number][] =>
    rawInput.trim().split(',').map((range) =>
        range.split('-').map(Number) as [number, number]
    );

const sumInvalidIds = (rawInput: string, rex: RegExp): number => {
    const input = normalizeInput(rawInput);
    let sum = 0;

    for (const [start, end] of input) {
        for (let i = start; i <= end; ++i) {
            if (rex.test(String(i))) {
                sum += i;
            }
        }
    }

    return sum;
};

export const part1 = (rawInput: string) => sumInvalidIds(rawInput, /^(\d+)\1$/);

export const part2 = (rawInput: string) =>
    sumInvalidIds(rawInput, /^(\d+)\1+$/);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/2.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
