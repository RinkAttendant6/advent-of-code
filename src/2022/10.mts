type Operation = 'noop' | 'addx';

const normalizeInput = (rawInput: string): [Operation, string][] =>
    rawInput.split('\n').map((line) => line.split(' ') as [Operation, string]);

const OPERATION_CYCLES = { noop: 1, addx: 2 };

export const part1 = (input: string) => {
    let result = 0;
    let x = 1;
    let cycles = 0;

    const data = normalizeInput(input);

    for (const [operation, value] of data) {
        for (let c = 0; c < OPERATION_CYCLES[operation]; ++c) {
            cycles++;

            if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
                result += x * cycles;
            }
        }

        x += Number(value ?? 0);
    }

    return result;
};

export const part2 = (input: string) => {
    const width = 40;
    let x = 1;
    let cycles = 0;
    let sprite = 0;
    let posInLine = 0;
    let result = '';

    const data = normalizeInput(input);

    for (const [operation, value] of data) {
        for (let c = 0; c < OPERATION_CYCLES[operation]; ++c) {
            cycles++;

            if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
                result += x * cycles;
            }

            result += [sprite, sprite + 1, sprite + 2].includes(posInLine)
                ? '#'
                : '.';

            posInLine++;

            if (posInLine === width) {
                result += '\n';
                posInLine = 0;
            }
        }

        x += Number(value ?? 0);
        sprite = x - 1;
    }

    return result;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/10.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
