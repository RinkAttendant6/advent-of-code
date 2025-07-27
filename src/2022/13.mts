// deno-lint-ignore no-explicit-any
const normalizeInput = (rawInput: string): any[][] =>
    rawInput.split(`\n\n`)
        .map((line) => line.split(`\n`).map((x) => JSON.parse(x)));

/**
 * Compare items
 */
const compare = (
    left: number | number[] | undefined,
    right: number | number[] | undefined,
): boolean | null => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        if (left! < right!) {
            return true;
        }

        if (left! > right!) {
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
        return compare([left as number], right);
    }

    if (Array.isArray(left) && Number.isInteger(right)) {
        return compare(left, [right as number]);
    }

    return null;
};

export const part1 = (input: string) =>
    normalizeInput(input).reduce(
        (
            acc,
            [left, right],
            idx,
        ) => (compare(left, right) ? acc + idx + 1 : acc),
        0,
    );

export const part2 = (input: string) => {
    const sortedData = [...normalizeInput(input).flat(1), [[2]], [[6]]]
        .toSorted((a, b) => compare(a, b) ? -1 : 1);

    return (sortedData.findIndex((x) => JSON.stringify(x) === '[[2]]') + 1) *
        (sortedData.findIndex((x) => JSON.stringify(x) === '[[6]]') + 1);
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/13.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
