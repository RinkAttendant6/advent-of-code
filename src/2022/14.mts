import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-14.txt', 'ascii');

const data = input
    .trim()
    .split(`\n`)
    .map((line) => line.split(` -> `).map((x) => x.split(',').map(Number)));

const minX = Math.min(...data.flat(1).map(([x, y]) => x));
const maxX = Math.max(...data.flat(1).map(([x, y]) => x));
const maxY = Math.max(...data.flat(1).map(([x, y]) => y));

const height = maxY + 1;
const width = maxX - minX + 1;

const map = Array(height)
    .fill()
    .map(() =>
        Array(width)
            .fill()
            .map(() => true)
    );

for (const rocks of data) {
    for (let i = 1; i < rocks.length; ++i) {
        const [x1, y1] = rocks[i - 1];
        const [x2, y2] = rocks[i];

        if (x1 === x2) {
            let s = Math.min(y1, y2);
            let t = Math.max(y1, y2);
            // vertical
            for (let j = s; j <= t; ++j) {
                map[j][x1 - minX] = null;
            }
        } else {
            let s = Math.min(x1, x2);
            let t = Math.max(x1, x2);
            // horizontal
            for (let j = s; j <= t; ++j) {
                map[y1][j - minX] = null;
            }
        }
    }
}

const doPart1 = (map, startX) => {
    map = structuredClone(map);

    for (let isOverflowing = false; !isOverflowing; ) {
        let sand = [500 - startX, 0];

        do {
            const [x, y] = sand;

            if (map[y + 1][x]) {
                sand = [x, y + 1];
                continue;
            }

            if (x === 0) {
                isOverflowing = true;
                break;
            }

            if (map[y + 1][x - 1]) {
                sand = [x - 1, y + 1];
                continue;
            }

            if (map[y + 1][x + 1]) {
                sand = [x + 1, y + 1];
                continue;
            }

            map[y][x] = false;
            break;
        } while (true);
    }

    return map.flat(Infinity).filter((x) => x === false).length;
};

const doPart2 = (map, startX) => {
    map = structuredClone(map);

    const currentHeight = map.length;
    const currentWidth = map[0].length;

    // add two rows
    map.push(Array(currentWidth).fill(true), Array(currentWidth).fill(true));

    // add more width
    map = map.map((row) => [
        ...Array(currentHeight).fill(true),
        ...row,
        ...Array(currentHeight).fill(true),
    ]);

    // recalculate starting column based on additional width
    startX -= currentHeight;

    // set last row as floor
    map[map.length - 1] = Array(currentHeight * 2 + currentWidth).fill(null);

    for (let isBlocked = false; !isBlocked; ) {
        let sand = [500 - startX, 0];

        do {
            const [sx, sy] = sand;

            if (map[sy + 1][sx]) {
                sand = [sx, sy + 1];
                continue;
            }

            if (map[sy + 1][sx - 1]) {
                sand = [sx - 1, sy + 1];
                continue;
            }

            if (map[sy + 1][sx + 1]) {
                sand = [sx + 1, sy + 1];
                continue;
            }

            map[sy][sx] = false;

            if (sx === 500 - startX && sy === 0) {
                isBlocked = true;
            }

            break;
        } while (true);
    }

    return map.flat(Infinity).filter((x) => x === false).length;
};

const part1 = doPart1(map, minX);
const part2 = doPart2(map, minX);

console.log({ part1, part2 });
