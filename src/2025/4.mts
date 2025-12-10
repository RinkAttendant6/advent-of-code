const normalizeInput = (rawInput: string): string[][] =>
    rawInput.trim().split('\n').map((line) => line.split(''));

const findAccessible = (grid: string[][]): [number, number][] => {
    const accessible: [number, number][] = [];

    grid.forEach((row, y) =>
        row.forEach((cell, x) => {
            if (cell === '@') {
                let adjacent = 0;
                for (let dy = -1; dy <= 1; ++dy) {
                    for (let dx = -1; dx <= 1; ++dx) {
                        const cy = y + dy;
                        const cx = x + dx;

                        if (!(cy === y && cx === x) && grid[cy]?.[cx] === '@') {
                            ++adjacent;
                        }
                    }
                }

                if (adjacent < 4) {
                    accessible.push([x, y]);
                }
            }
        })
    );

    return accessible;
};

export const part1 = (rawInput: string) => {
    const grid = normalizeInput(rawInput);
    return findAccessible(grid).length;
};

export const part2 = (rawInput: string) => {
    const grid = normalizeInput(rawInput);
    let removed = 0;

    do {
        const accessibleRolls = findAccessible(grid);

        if (accessibleRolls.length === 0) {
            break;
        }

        for (const [x, y] of accessibleRolls) {
            grid[y][x] = '.';
            ++removed;
        }
    } while (true);

    return removed;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/4.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
