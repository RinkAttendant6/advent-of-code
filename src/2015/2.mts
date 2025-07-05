import rawInput from '#inputs/2015/2.txt' with { type: 'text' };

const input = rawInput.split('\n').map((line) => line.split('x').map(Number));

/**
 * Get the total wrapping paper for a present, including slack
 */
const determineWrappingPaper = (x: number, y: number, z: number): number => {
    const [xy, xz, yz] = [x * y, x * z, y * z];
    const slack = Math.min(xy, xz, yz);
    const paper = 2 * xy + 2 * xz + 2 * yz;

    return paper + slack;
};

/**
 * Get the total ribbon for tying a present, including the bow
 */
const determineRibbon = (x: number, y: number, z: number): number => {
    const [xy, xz, yz] = [x + y, x + z, y + z];
    const ribbon = 2 * Math.min(xy, xz, yz);
    const bow = x * y * z;

    return ribbon + bow;
};

export const part1 = input.reduce(
    (sum, [x, y, z]) => sum + determineWrappingPaper(x, y, z),
    0,
);

export const part2 = input.reduce(
    (sum, [x, y, z]) => sum + determineRibbon(x, y, z),
    0,
);

if (import.meta.main) {
    console.log({ part1, part2 });
}
