import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-13.txt', 'ascii');

const data = input
    .trim()
    .split(`\n\n`)
    .map((line) => line.split(`\n`).map((x) => JSON.parse(x)));

/**
 * Compare items
 * @param {number|number[]|undefined} left
 * @param {number|number[]|undefined} right
 * @returns {boolean|null}
 */
const compare = (left, right) => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        if (left < right) {
            return true;
        }

        if (left > right) {
            return false;
        }

        return null;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        for (let i = 0; i < left.length; ++i) {
            let result = compare(left[i], right[i]);

            if (result !== null) {
                return result;
            }
        }

        if (left.length < right.length) {
            return true;
        }

        if (left.length > right.length) {
            return false;
        }

        return null;
    }

    if (Number.isInteger(left) && Array.isArray(right)) {
        return compare([left], right);
    }

    if (Array.isArray(left) && Number.isInteger(right)) {
        return compare(left, [right]);
    }

    return null;
};

const part1 = data.reduce(
    (acc, [left, right], idx) => (compare(left, right) ? acc + idx + 1 : acc),
    0
);

const orderedData = [...data.flat(1), [[2]], [[6]]].sort((a, b) =>
    compare(a, b) ? -1 : 1
);

const part2 =
    (orderedData.findIndex((x) => JSON.stringify(x) === '[[2]]') + 1) *
    (orderedData.findIndex((x) => JSON.stringify(x) === '[[6]]') + 1);

console.log({ part1, part2 });
