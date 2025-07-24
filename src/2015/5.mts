const isVowel = (char: string) => ['a', 'e', 'i', 'o', 'u'].includes(char);
const badSequences = ['ab', 'cd', 'pq', 'xy'];

export const part1 = (input: string) =>
    input.split('\n').filter((str) => {
        const hasAtLeast3Vowels = [...str].filter(isVowel).length > 3;
        const hasDoubleLetter = /(.)\1/.test(str);
        const hasBadSequence = badSequences.some((seq) => str.includes(seq));

        return hasAtLeast3Vowels && hasDoubleLetter && !hasBadSequence;
    }).length;

export const part2 = (input: string) =>
    input.split('\n').filter((str) => {
        const criteria1 = /(..).*\1/.test(str);
        const criteria2 = /(.).\1/.test(str);

        return criteria1 && criteria2;
    }).length;

if (import.meta.main) {
    const input = await Deno.readTextFile(
        Deno.args[0] ?? new URL('../../inputs/2015/5.txt', import.meta.url),
    );
    console.log({ part1: part1(input), part2: part2(input) });
}
