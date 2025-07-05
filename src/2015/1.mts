import rawInput from '#inputs/2015/1.txt' with { type: 'text' };

export const part1 = [...rawInput].reduce((floor, char) => {
    if (char === '(') {
        ++floor;
    } else if (char === ')') {
        --floor;
    }
    return floor;
}, 0);

export const part2 = (() => {
    let result = 0;
    let floor = 0;

    for (const char of rawInput) {
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
})();

if (import.meta.main) {
    console.log({ part1, part2 });
}
