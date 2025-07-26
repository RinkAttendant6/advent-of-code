import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-5.txt', 'ascii');

const [rawStacks, moves] = input
    .trim()
    .split('\n\n')
    .map((group) => group.split('\n'));

const numberOfStacks = Number(rawStacks.pop().match(/\d+\s*$/));

const stacks = [[]];

for (let i = 0; i < rawStacks.length; ++i) {
    for (let j = 0; j < numberOfStacks; ++j) {
        stacks[j + 1] ??= [];
        if (rawStacks[i].at(4 * j + 1) !== ' ') {
            stacks[j + 1].push(rawStacks[i].at(4 * j + 1));
        }
    }
}

/**
 * Move cargo around based on moves
 * @param {string[][]} cargo Array of stacks
 * @param {string[]} moves Array of moves
 * @param {boolean} inOrder
 * @returns {string[][]}
 */
const moveCargo = (cargo, moves, inOrder = false) => {
    const output = [...cargo];

    for (const line of moves) {
        const [_, qty, src, dest] = line.split(/move | from | to /);
        let t = output[src].slice(0, qty);

        if (!inOrder) {
            t = t.reverse();
        }

        output[dest] = t.concat(output[dest]);
        output[src] = output[src].slice(qty);
    }

    return output;
};

/**
 * Get the top element of each stack
 * @param {string[][]} cargo Array of stacks
 * @returns {string}
 */
const getTopElements = (cargo) => cargo.map((stack) => stack[0] ?? '').join('');

const part1 = getTopElements(moveCargo(stacks, moves));
const part2 = getTopElements(moveCargo(stacks, moves, true));

console.log({ part1, part2 });
