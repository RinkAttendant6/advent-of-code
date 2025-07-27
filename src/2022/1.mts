const totals = (input: string): number[] =>
    input.split('\n\n').map((group) =>
        group.split('\n').reduce((acc, x) => acc + Number(x), 0)
    );

export const part1 = (input: string) => Math.max(...totals(input));
export const part2 = (input: string) =>
    totals(input)
        .toSorted((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, x) => acc + x);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/1.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
