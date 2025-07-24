import crypto from 'node:crypto';

/**
 * Finds the MD5 hash that contains a prefix with a given length of zeros
 * @param input Secret key
 * @param zeroPrefixLength Number of zeros for the prefix
 * @returns Answer
 */
const findHash = (input: string, zeroPrefixLength: number) => {
    let i = 1;

    while (true) {
        const hash = crypto.createHash('md5').update(input + i).digest('hex');
        if (hash.startsWith('0'.repeat(zeroPrefixLength))) {
            break;
        }
        ++i;
    }

    return i;
};

export const part1 = (input: string) => findHash(input, 5);
export const part2 = (input: string) => findHash(input, 6);

if (import.meta.main) {
    const input = await Deno.readTextFile(
        Deno.args[0] ?? new URL('../../inputs/2015/4.txt', import.meta.url),
    );
    console.log({ part1: part1(input), part2: part2(input) });
}
