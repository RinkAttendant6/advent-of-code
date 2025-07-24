const normalizeInput = (rawInput: string): string[][] =>
    rawInput.split('\n').map((line) => line.split(''));

export const part1 = (rawInput: string): string => {
    const input = normalizeInput(rawInput);
    let result = '';

    for (let col = 0; col < input[0].length; ++col) {
        const map: Record<string, number> = {};

        for (let row = 0; row < input.length; ++row) {
            map[input[row][col]] ??= 0;
            ++map[input[row][col]];
        }

        const maxFrequency = Math.max(...Object.values(map));

        for (const [char, freq] of Object.entries(map)) {
            if (freq === maxFrequency) {
                result += char;
            }
        }
    }

    return result;
};

export const part2 = (rawInput: string): string => {
    const input = normalizeInput(rawInput);
    let result = '';

    for (let col = 0; col < input[0].length; ++col) {
        const map: Record<string, number> = {};

        for (let row = 0; row < input.length; ++row) {
            map[input[row][col]] ??= 0;
            ++map[input[row][col]];
        }

        const minFrequency = Math.min(...Object.values(map));

        for (const [char, freq] of Object.entries(map)) {
            if (freq === minFrequency) {
                result += char;
            }
        }
    }

    return result;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/6.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
