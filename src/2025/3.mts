const normalizeInput = (rawInput: string): number[][] =>
    rawInput.trim().split('\n').map((line) => line.split('').map(Number));

const determineJoltage = (rawInput: string, numberOfDigits: number): number => {
    return normalizeInput(rawInput).reduce((sum, line) => {
        const digits: number[] = [];
        const digitIdx: number[] = [];

        for (let i = 0; i < numberOfDigits; ++i) {
            const startIdx = i === 0 ? 0 : digitIdx[i - 1] + 1;
            const endIdx = line.length + 1 - numberOfDigits + i;

            digits[i] = Math.max(...line.slice(startIdx, endIdx));
            digitIdx[i] = line.indexOf(digits[i], startIdx);
        }

        const joltage = Number(digits.join(''));

        return sum + joltage;
    }, 0);
};

export const part1 = (rawInput: string) => determineJoltage(rawInput, 2);
export const part2 = (rawInput: string) => determineJoltage(rawInput, 12);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/3.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
