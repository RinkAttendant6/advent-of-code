const normalizeInput = (rawInput: string): [string[][], string[]] => {
    const [rawStacks, moves] = rawInput
        .split('\n\n')
        .map((group) => group.split('\n'));

    const numberOfStacks = Number(rawStacks.pop().match(/\d+\s*$/));

    const stacks: string[][] = [[]];

    for (let i = 0; i < rawStacks.length; ++i) {
        for (let j = 0; j < numberOfStacks; ++j) {
            stacks[j + 1] ??= [];
            if (rawStacks[i].at(4 * j + 1) !== ' ') {
                stacks[j + 1].push(rawStacks[i].at(4 * j + 1)!);
            }
        }
    }

    return [stacks, moves];
};

/**
 * Move cargo around based on moves
 * @param cargo Array of stacks
 * @param moves Array of moves
 * @param inOrder
 */
const moveCargo = (
    cargo: string[][],
    moves: string[],
    inOrder: boolean = false,
) => {
    const output = [...cargo];

    for (const line of moves) {
        const [_, qty, src, dest] = line.split(/move | from | to /).map(Number);
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
 * @param cargo Array of stacks
 */
const getTopElements = (cargo: string[][]): string =>
    cargo.map((stack) => stack[0] ?? '').join('');

export const part1 = (input: string) => {
    const [stacks, moves] = normalizeInput(input);
    return getTopElements(moveCargo(stacks, moves));
};

export const part2 = (input: string) => {
    const [stacks, moves] = normalizeInput(input);
    return getTopElements(moveCargo(stacks, moves, true));
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/5.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
