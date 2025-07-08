import rawInput from '#inputs/2016/3.txt' with { type: 'text' };

const input = rawInput.split('\n').map((line) =>
    line.trim().split(/\s+/).map(Number)
) as [number, number, number][];

/**
 * Determine if three lengths are a valid triangle
 */
const isTriangle = (x: number, y: number, z: number): boolean => {
    const nums = [x, y, z].toSorted((a, b) => a - b);
    return nums[2] < nums[0] + nums[1];
};

export const part1 = input.filter((line) => isTriangle(...line)).length;

export const part2 = ((input) => {
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
})(input);

if (import.meta.main) {
    console.log({ part1, part2 });
}
