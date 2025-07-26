import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-6.txt', 'ascii');

const startOfMarker = (uniqueness) => {
    for (let i = 0; i < input.length - uniqueness; ++i)
        if (new Set(input.substring(i, i + uniqueness)).size === uniqueness)
            return i + uniqueness;
};

const part1 = startOfMarker(4);
const part2 = startOfMarker(14);

console.log({ part1, part2 });
