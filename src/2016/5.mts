import crypto from 'node:crypto';
import rawInput from '#inputs/2016/5.txt' with { type: 'text' };

const findHash = (input: string, start: number) => {
    let i = start;
    let hash;

    while (true) {
        hash = crypto.createHash('md5').update(input + i).digest('hex');
        if (hash.startsWith('00000')) {
            break;
        }
        ++i;
    }

    return [hash, i];
};

export const part1 = ((input: string) => {
    const password: string[] = [];

    for (let i = 0; password.length < 8;) {
        const [hash, next] = findHash(input, i);
        i = next + 1;
        password.push(hash[5]);
    }

    return password.join('');
})(rawInput);

export const part2 = ((input: string) => {
    const password: string[] = Array(8).fill(' ');

    for (let i = 0; password.some((char) => char === ' ');) {
        const [hash, next] = findHash(input, i);
        i = next + 1;

        const position = hash[5];
        if (position >= 0 && position < 8 && password[position] === ' ') {
            password[position] = hash[6];
        }
    }

    return password.join('');
})(rawInput);

if (import.meta.main) {
    console.log({ part1, part2 });
}
