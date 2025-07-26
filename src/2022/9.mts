import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-9.txt', 'ascii');

const data = input
    .trim()
    .split('\n')
    .map((line) => line.split(` `));

const follow = (tailSegments) => {
    const movement = {
        L: [-1, 0],
        R: [1, 0],
        U: [0, 1],
        D: [0, -1],
    };

    const rope = Array(1 + tailSegments).fill([0, 0]);
    const visits = new Set();

    for (const [direction, steps] of data) {
        for (let i = 0; i < steps; ++i) {
            rope[0][0] += movement[direction][0];
            rope[0][1] += movement[direction][1];

            for (let j = 1; j < rope.length; ++j) {
                const [bx, by] = rope[j - 1];
                let [tx, ty] = rope[j];

                while (Math.abs(tx - bx) > 1 || Math.abs(ty - by) > 1) {
                    tx += Math.sign(bx - tx);
                    ty += Math.sign(by - ty);
                }

                rope[j] = [tx, ty];
            }

            visits.add(rope[rope.length - 1].join(' '));
        }
    }

    return visits.size;
};

const part1 = follow(1);
const part2 = follow(9);

console.log({ part1, part2 });
