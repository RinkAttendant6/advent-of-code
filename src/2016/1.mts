const normalizeInput = (rawInput: string): string[] =>
    rawInput.trim().split(', ');

export const part1 = (rawInput: string) => {
    const input = normalizeInput(rawInput);

    let direction = 0;
    let x = 0, y = 0;

    for (const instruction of input) {
        const steps = Number(instruction.slice(1));

        if (instruction.at(0) === 'R') {
            direction++;
        } else {
            direction--;
        }

        if (direction === -1) direction = 3;
        direction %= 4;

        switch (direction) {
            case 0:
                y += steps;
                break;
            case 1:
                x += steps;
                break;
            case 2:
                y -= steps;
                break;
            case 3:
                x -= steps;
                break;
        }
    }

    return Math.abs(x) + Math.abs(y);
};

export const part2 = (rawInput: string) => {
    const input = normalizeInput(rawInput);
    let direction = 0;
    let x = 0, y = 0;
    const visited = new Set<string>(['0 0']);

    for (const instruction of input) {
        const steps = Number(instruction.slice(1));

        if (instruction.at(0) === 'R') {
            direction++;
        } else {
            direction--;
        }

        if (direction === -1) direction = 3;
        direction %= 4;

        for (let i = 0; i < steps; ++i) {
            switch (direction) {
                case 0:
                    ++y;
                    break;
                case 1:
                    ++x;
                    break;
                case 2:
                    --y;
                    break;
                case 3:
                    --x;
                    break;
            }

            if (visited.has(`${x} ${y}`)) {
                return Math.abs(x) + Math.abs(y);
            }
            visited.add(`${x} ${y}`);
        }
    }

    return Math.abs(x) + Math.abs(y);
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/1.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
