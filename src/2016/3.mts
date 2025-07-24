const normalizeInput = (rawInput: string): [number, number, number][] =>
    rawInput.split('\n').map((line) =>
        line.trim().split(/\s+/).map(Number)
    ) as [number, number, number][];

/**
 * Determine if three lengths are a valid triangle
 */
const isTriangle = (x: number, y: number, z: number): boolean => {
    const nums = [x, y, z].toSorted((a, b) => a - b);
    return nums[2] < nums[0] + nums[1];
};

export const part1 = (rawInput: string) =>
    normalizeInput(rawInput).filter((line) => isTriangle(...line)).length;

export const part2 = (rawInput: string) => {
    const input = normalizeInput(rawInput);
    let result = 0;

    for (let row = 0; row < input.length; row += 3) {
        for (let col = 0; col < 3; ++col) {
            if (
                isTriangle(
                    input[row][col],
                    input[row + 1][col],
                    input[row + 2][col],
                )
            ) {
                ++result;
            }
        }
    }

    return result;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/3.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
