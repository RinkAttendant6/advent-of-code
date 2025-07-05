import rawInput from '#inputs/2015/5.txt' with { type: 'text' };

const input = rawInput.split('\n');

const isVowel = (char: string) => ['a', 'e', 'i', 'o', 'u'].includes(char);
const badSequences = ['ab', 'cd', 'pq', 'xy'];

export const part1 = input.filter((str) => {
    const hasAtLeast3Vowels = [...str].filter(isVowel).length > 3;
    const hasDoubleLetter = /(.)\1/.test(str);
    const hasBadSequence = badSequences.some((seq) => str.includes(seq));

    return hasAtLeast3Vowels && hasDoubleLetter && !hasBadSequence;
}).length;

export const part2 = input.filter((str) => {
    const criteria1 = /(..).*\1/.test(str);
    const criteria2 = /(.).\1/.test(str);

    return criteria1 && criteria2;
}).length;

if (import.meta.main) {
    console.log({ part1, part2 });
}
