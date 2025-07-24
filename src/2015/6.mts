const re =
    /^(?<instruction>turn on|turn off|toggle) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)$/;

const doPart1 = (input: string[]) => {
    const lights = Array.from(
        new Array<Uint8Array>(1000),
        (_) => new Uint8Array(1000),
    );

    for (const line of input) {
        const { instruction, x1, y1, x2, y2 } = re.exec(line)?.groups;

        for (let x = Number(x1); x <= Number(x2); ++x) {
            for (let y = Number(y1); y <= Number(y2); ++y) {
                switch (instruction) {
                    case 'turn on':
                        lights[y][x] = 1;
                        break;
                    case 'turn off':
                        lights[y][x] = 0;
                        break;
                    case 'toggle':
                        lights[y][x] = (lights[y][x] + 1) % 2;
                        break;
                }
            }
        }
    }

    return lights;
};

const doPart2 = (input: string[]) => {
    const lights = Array.from(
        new Array<Uint8Array>(1000),
        (_) => new Uint8Array(1000),
    );

    for (const line of input) {
        const { instruction, x1, y1, x2, y2 } = re.exec(line)?.groups;

        for (let x = Number(x1); x <= Number(x2); ++x) {
            for (let y = Number(y1); y <= Number(y2); ++y) {
                switch (instruction) {
                    case 'turn on':
                        ++lights[y][x];
                        break;
                    case 'turn off':
                        if (lights[y][x] > 0) {
                            --lights[y][x];
                        }
                        break;
                    case 'toggle':
                        lights[y][x] += 2;
                        break;
                }
            }
        }
    }

    return lights;
};

export const part1 = (input: string) =>
    doPart1(input.split('\n')).reduce(
        (sum, row) => sum + row.reduce((acc, v) => acc + v),
        0,
    );

export const part2 = (input: string) =>
    doPart2(input.split('\n')).reduce(
        (sum, row) => sum + row.reduce((acc, v) => acc + v),
        0,
    );

if (import.meta.main) {
    const input = await Deno.readTextFile(
        Deno.args[0] ?? new URL('../../inputs/2015/6.txt', import.meta.url),
    );
    console.log({ part1: part1(input), part2: part2(input) });
}
