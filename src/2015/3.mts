import rawInput from '#inputs/2015/3.txt' with { type: 'text' };

const go = (input: string[]) => {
    let x = 0, y = 0;
    const visited = new Set<string>([`0 0`]);

    for (const char of input) {
        switch (char) {
            case '^':
                --y;
                break;
            case 'v':
                ++y;
                break;
            case '<':
                --x;
                break;
            case '>':
                ++x;
                break;
        }

        visited.add(`${x} ${y}`);
    }

    return visited;
};

export const part1 = go([...rawInput]).size;

export const part2 = (() => {
    const santaInput = [...rawInput].filter((_, idx) => idx % 2 === 0);
    const roboSantaInput = [...rawInput].filter((_, idx) => idx % 2 === 1);

    const visited1 = go(santaInput);
    const visited2 = go(roboSantaInput);

    const visited = visited1.union(visited2);
    return visited.size;
})();

if (import.meta.main) {
    console.log({ part1, part2 });
}
