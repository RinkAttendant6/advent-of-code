import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-8.txt', 'ascii');

const data = input
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));

let part1 = 0,
    part2 = 0;

for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
        const isEdge =
            i === 0 ||
            i === data.length - 1 ||
            j === 0 ||
            j === data[i].length - 1;

        const currentTree = data[i][j];

        const left = data[i].slice(0, j).reverse();
        const right = data[i].slice(j + 1);
        const up = data
            .map((row) => row[j])
            .slice(0, i)
            .reverse();
        const down = data.map((row) => row[j]).slice(i + 1);

        const leftVisible =
            left.findIndex((x) => x >= currentTree) + 1 || left.length;
        const rightVisible =
            right.findIndex((x) => x >= currentTree) + 1 || right.length;
        const upVisible =
            up.findIndex((x) => x >= currentTree) + 1 || up.length;
        const downVisible =
            down.findIndex((x) => x >= currentTree) + 1 || down.length;

        const score = leftVisible * rightVisible * upVisible * downVisible;

        part1 +=
            isEdge ||
            [left, right, up, down].some((trees) =>
                trees.every((tree) => tree < currentTree)
            );

        part2 = Math.max(part2, score);
    }
}

console.log({ part1, part2 });
