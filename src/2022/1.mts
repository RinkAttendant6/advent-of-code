import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-1.txt', 'ascii');

const totals = input
    .split('\n\n')
    .map((group) => group.split('\n').reduce((acc, x) => acc + Number(x), 0));

const part1 = Math.max(...totals);
const part2 = totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, x) => acc + x);

console.log({ part1, part2 });
