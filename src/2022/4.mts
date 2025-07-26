import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-4.txt', 'ascii');

const data = input
    .trim()
    .split('\n')
    .map((line) => line.split(`,`).map((p) => p.split('-').map(Number)));

const part1 = data.filter((line) => {
    const [p1, p2] = line;
    const [a, b] = p1;
    const [c, d] = p2;

    return (a <= c && b >= d) || (c <= a && d >= b);
}).length;

const part2 = data.filter((line) => {
    const [p1, p2] = line;
    const [a, b] = p1;
    const [c, d] = p2;

    return !(b < c || a > d);
}).length;

console.log({ part1, part2 });
