import rawInput from '#inputs/2016/1.txt' with { type: 'text' };

const input = rawInput.trim().split(', ');

export const part1 = ((input) => {
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
})(input);

export const part2 = ((input) => {
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
})(input);

if (import.meta.main) {
    console.log({ part1, part2 });
}
