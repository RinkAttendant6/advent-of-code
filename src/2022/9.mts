import { Dir } from 'node:fs';

type Direction = 'L' | 'R' | 'U' | 'D';

const normalizeInput = (rawInput: string): [Direction, string][] =>
    rawInput
        .split('\n')
        .map((line) => line.split(` `) as [Direction, string]);

const follow = (data: [Direction, string][], tailSegments: number) => {
    const movement: Record<Direction, [number, number]> = {
        L: [-1, 0],
        R: [1, 0],
        U: [0, 1],
        D: [0, -1],
    };

    const rope = Array(1 + tailSegments).fill([0, 0]);
    const visits = new Set();

    for (const [direction, steps] of data) {
        for (let i = 0; i < Number(steps); ++i) {
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

export const part1 = (input: string) => follow(normalizeInput(input), 1);
export const part2 = (input: string) => follow(normalizeInput(input), 9);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/9.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
