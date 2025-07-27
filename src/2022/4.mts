const normalizeInput = (rawInput: string): [number, number][][] =>
    rawInput
        .split('\n')
        .map((line) =>
            line.split(`,`).map((p) =>
                p.split('-').map(Number) as [number, number]
            )
        );

export const part1 = (input: string) =>
    normalizeInput(input).filter((line) => {
        const [p1, p2] = line;
        const [a, b] = p1;
        const [c, d] = p2;

        return (a <= c && b >= d) || (c <= a && d >= b);
    }).length;

export const part2 = (input: string) =>
    normalizeInput(input).filter((line) => {
        const [p1, p2] = line;
        const [a, b] = p1;
        const [c, d] = p2;

        return !(b < c || a > d);
    }).length;

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/4.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
