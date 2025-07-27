const startOfMarker = (input: string, uniqueness: number) => {
    for (let i = 0; i < input.length - uniqueness; ++i) {
        if (new Set(input.substring(i, i + uniqueness)).size === uniqueness) {
            return i + uniqueness;
        }
    }
};

export const part1 = (input: string) => startOfMarker(input, 4);
export const part2 = (input: string) => startOfMarker(input, 14);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/6.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
