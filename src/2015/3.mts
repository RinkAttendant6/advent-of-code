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

export const part1 = (input: string) => go([...input]).size;

export const part2 = (input: string): number => {
    const santaInput = [...input].filter((_, idx) => idx % 2 === 0);
    const roboSantaInput = [...input].filter((_, idx) => idx % 2 === 1);

    const visited1 = go(santaInput);
    const visited2 = go(roboSantaInput);

    const visited = visited1.union(visited2);
    return visited.size;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/3.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
