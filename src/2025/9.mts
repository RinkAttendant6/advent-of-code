const normalizeInput = (rawInput: string): [number, number][] =>
    rawInput.trim().split('\n').map((line) =>
        line.split(',').map(Number) as [number, number]
    );

export const part1 = (rawInput: string) => {
    const input = normalizeInput(rawInput);

    let maxArea = 0;

    for (let i = 0; i < input.length - 1; ++i) {
        const [x1, y1] = input[i];
        for (let j = i + 1; j < input.length; ++j) {
            const [x2, y2] = input[j];

            const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
};

export const part2 = (rawInput: string) => undefined;

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/9.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
