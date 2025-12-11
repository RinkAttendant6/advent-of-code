const normalizeInput = (rawInput: string): string[][] =>
    rawInput.trim().split('\n').map((line) => line.split(''));

export const part1 = (rawInput: string) => {
    const grid = normalizeInput(rawInput);

    // start
    const startX = grid[0].indexOf('S');
    grid[1][startX] = '|';

    let splits = 0;

    for (let y = 2; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            if (grid[y - 1][x] === '|') {
                if (grid[y][x] === '^') {
                    ++splits;
                    grid[y][x - 1] = '|';
                    grid[y][x + 1] = '|';
                } else {
                    grid[y][x] = '|';
                }
            }
        }
    }

    return splits;
};

export const part2 = (rawInput: string) => undefined;

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/7.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
