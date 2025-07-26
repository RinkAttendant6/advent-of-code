import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-10.txt', 'ascii');

const data = input
    .trim()
    .split('\n')
    .map((line) => line.split` `);

let part1 = 0;
let x = 1;
let cycles = 0;

const width = 40;
let part2 = '';
let sprite = 0;
let posInLine = 0;

const OPERATION_CYCLES = {
    noop: 1,
    addx: 2,
};

for (const [operation, value] of data) {
    for (let c = 0; c < OPERATION_CYCLES[operation]; ++c) {
        // part 1
        cycles++;

        if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
            part1 += x * cycles;
        }

        // part 2
        part2 += [sprite, sprite + 1, sprite + 2].includes(posInLine)
            ? '#'
            : '.';

        posInLine++;

        if (posInLine === width) {
            part2 += '\n';
            posInLine = 0;
        }
    }

    x += Number(value ?? 0);
    sprite = x - 1;
}

console.log({ part1, part2 });
