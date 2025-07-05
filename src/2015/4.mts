import crypto from 'node:crypto';
import rawInput from '#inputs/2015/4.txt' with { type: 'text' };

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

export const part1 = findHash(rawInput, 5);
export const part2 = findHash(rawInput, 6);

if (import.meta.main) {
    console.log({ part1, part2 });
}
