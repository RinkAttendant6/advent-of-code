const normalizeInput = (rawInput: string): number[][] =>
    rawInput.split('\n')
        .map((line) => line.split('').map(Number));

const getVisibility = (data: number[][], mode: 1 | 2) => {
    let result = 0;

    for (let i = 0; i < data.length; ++i) {
        for (let j = 0; j < data[i].length; ++j) {
            const isEdge = i === 0 ||
                i === data.length - 1 ||
                j === 0 ||
                j === data[i].length - 1;

            const currentTree = data[i][j];

            const left = data[i].slice(0, j).reverse();
            const right = data[i].slice(j + 1);
            const up = data
                .map((row) => row[j])
                .slice(0, i)
                .reverse();
            const down = data.map((row) => row[j]).slice(i + 1);

            const leftVisible = left.findIndex((x) => x >= currentTree) + 1 ||
                left.length;
            const rightVisible = right.findIndex((x) => x >= currentTree) + 1 ||
                right.length;
            const upVisible = up.findIndex((x) => x >= currentTree) + 1 ||
                up.length;
            const downVisible = down.findIndex((x) => x >= currentTree) + 1 ||
                down.length;

            const score = leftVisible * rightVisible * upVisible * downVisible;

            if (mode === 1) {
                result += Number(
                    isEdge ||
                        [left, right, up, down].some((trees) =>
                            trees.every((tree) => tree < currentTree)
                        ),
                );
            } else if (mode === 2) {
                result = Math.max(result, score);
            }
        }
    }
    return result;
};

export const part1 = (input: string) => getVisibility(normalizeInput(input), 1);
export const part2 = (input: string) => getVisibility(normalizeInput(input), 2);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/8.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
