const normalizeInput = (rawInput: string): [string, number][] =>
    rawInput.trim().split('\n').map((line) => [line[0], Number(line.slice(1))]);

export const part1 = (rawInput: string) => {
    const input = normalizeInput(rawInput);
    let position = 50;
    let zeros = 0;

    for (const [dir, units] of input) {
        if (dir === 'L') {
            position -= units;
        } else if (dir === 'R') {
            position += units;
        }

        if (position < 0) {
            position = 100 + position;
        }
        position = position % 100;

        if (position === 0) {
            ++zeros;
        }
    }

    return zeros;
};

export const part2 = (rawInput: string) => {
    const input = normalizeInput(rawInput);
    let position = 50;
    let zeros = 0;

    for (const [dir, units] of input) {
        for (let i = 0; i < units; ++i) {
            if (dir === 'L') {
                --position;
            } else if (dir === 'R') {
                ++position;
            }

            if (position < 0) {
                position = 100 + position;
            }
            position = position % 100;

            if (position === 0) {
                ++zeros;
            }
        }
    }

    return zeros;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/3.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
