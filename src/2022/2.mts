type Play = 'X' | 'Y' | 'Z';

const normalizeInput = (rawInput: string): [Play, Play][] =>
    rawInput
        .replaceAll('A', 'X')
        .replaceAll('B', 'Y')
        .replaceAll('C', 'Z')
        .split('\n').map((line) => line.split(' ') as [Play, Play]);

const points: Record<Play, number> = {
    X: 1,
    Y: 2,
    Z: 3,
};

const choiceToWin: Record<Play, Play> = {
    X: 'Y',
    Y: 'Z',
    Z: 'X',
};

const choiceToLose: Record<Play, Play> = {
    X: 'Z',
    Y: 'X',
    Z: 'Y',
};

export const part1 = (input: string) =>
    normalizeInput(input).reduce((total, line) => {
        const [opp, you] = line;

        let score = points[you];

        if (you === opp) {
            score += 3;
        } else if (you === choiceToWin[opp]) {
            score += 6;
        }

        return total + score;
    }, 0);

export const part2 = (input: string) =>
    normalizeInput(input).reduce((total, line) => {
        const [opp, you] = line;

        let score = 0;

        if (you === 'X') {
            // need to lose
            score += points[choiceToLose[opp]];
        } else if (you === 'Y') {
            // need to draw
            score += points[opp] + 3;
        } else {
            // need to win
            score += points[choiceToWin[opp]] + 6;
        }

        return total + score;
    }, 0);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/2.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
