export const part1 = (input: string): number =>
    [...input].reduce((floor, char) => {
        if (char === '(') {
            ++floor;
        } else if (char === ')') {
            --floor;
        }
        return floor;
    }, 0);

export const part2 = (input: string): number => {
    let result = 0;
    let floor = 0;

    for (const char of input) {
        if (char === '(') {
            ++floor;
        } else if (char === ')') {
            --floor;
        }

        ++result;

        if (floor < 0) {
            break;
        }
    }

    return result;
};

if (import.meta.main) {
    const input = await Deno.readTextFile(
        Deno.args[0] ?? new URL('../../inputs/2015/1.txt', import.meta.url),
    );
    console.log({ part1: part1(input), part2: part2(input) });
}
