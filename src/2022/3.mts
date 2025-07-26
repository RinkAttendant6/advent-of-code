import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-3.txt', 'ascii');
const lines = input
    .trim()
    .split('\n')
    .map((line) => [...line]);

const part1 = lines.reduce((total, x) => {
    const sack1 = x.slice(0, x.length / 2);
    const sack2 = x.slice(x.length / 2);

    const intersection = sack1.filter((el) => sack2.includes(el));
    const uniqueIntersection = [...new Set(intersection)];

    return (
        total +
        uniqueIntersection.reduce((subtotal, el) => {
            const priority = /[a-z]/.test(el)
                ? el.charCodeAt() - 'a'.charCodeAt() + 1
                : el.charCodeAt() - 'A'.charCodeAt() + 27;

            return subtotal + priority;
        }, 0)
    );
}, 0);

const part2 = lines.reduce((total, x, idx) => {
    if (idx % 3 > 0) {
        return total;
    }

    const sack1 = x;
    const sack2 = lines[idx + 1];
    const sack3 = lines[idx + 2];

    const intersection = sack1.filter(
        (el) => sack2.includes(el) && sack3.includes(el)
    );
    const uniqueIntersection = [...new Set(intersection)];

    return (
        total +
        uniqueIntersection.reduce((subtotal, el) => {
            const priority = /[a-z]/.test(el)
                ? el.charCodeAt() - 'a'.charCodeAt() + 1
                : el.charCodeAt() - 'A'.charCodeAt() + 27;

            return subtotal + priority;
        }, 0)
    );
}, 0);

console.log({ part1, part2 });
