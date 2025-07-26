import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-2.txt', 'ascii');
const normalizedData = input
    .replaceAll('A', 'X')
    .replaceAll('B', 'Y')
    .replaceAll('C', 'Z')
    .trim()
    .split('\n');

const points = {
    X: 1,
    Y: 2,
    Z: 3,
};

const choiceToWin = {
    X: 'Y',
    Y: 'Z',
    Z: 'X',
};

const choiceToLose = {
    X: 'Z',
    Y: 'X',
    Z: 'Y',
};

const part1 = normalizedData.reduce((total, x) => {
    const [opp, you] = x.split(' ');

    let score = points[you];

    if (you === opp) {
        score += 3;
    } else if (you === choiceToWin[opp]) {
        score += 6;
    }

    return total + score;
}, 0);

const part2 = normalizedData.reduce((total, x) => {
    const [opp, you] = x.split(' ');

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

console.log({ part1, part2 });
