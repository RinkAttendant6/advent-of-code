const normalizeInput = (rawInput: string): string[][] =>
    rawInput.trim().split('\n').map((line) => line.trim().split(/\s+/g));

export const part1 = (rawInput: string) => {
    const input = normalizeInput(rawInput);

    const operators = input.at(-1)!;
    const operands = input.slice(0, -1).map((line) => line.map(Number));

    let grandTotal = 0;

    for (let i = 0; i < operators.length; ++i) {
        let total = operands[0][i];

        for (let j = 1; j < operands.length; ++j) {
            if (operators[i] === '+') {
                total += operands[j][i];
            } else if (operators[i] === '*') {
                total *= operands[j][i];
            }
        }

        grandTotal += total;
    }

    return grandTotal;
};

export const part2 = (rawInput: string) => {
    const lines = rawInput.split('\n');
    const operators = lines.at(-1)!;

    let grandTotal = 0;

    for (let i = 0; i < operators.length;) {
        let startIdx, endIdx, operator;
        const operands = [];

        if (operators[i] !== ' ') {
            operator = operators[i];
            startIdx = i;
            for (let j = i + 1; j < operators.length; ++j) {
                if (operators[j] !== ' ') {
                    endIdx = j - 1;
                    break;
                }
            }
            endIdx ??= operators.length;
        }

        for (let x = startIdx!; x < endIdx!; ++x) {
            const num = Number(
                lines.slice(0, -1).map((char) => char[x]).join('').trim(),
            );
            operands.push(num);
        }

        const total = operands.reduce((acc, val) =>
            operator! === '+' ? acc + val : acc * val
        );

        grandTotal += total;

        // move to next group
        i = endIdx! + 1;
    }

    return grandTotal;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/6.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
