import { assertEquals } from 'jsr:@std/assert';
import { outputs } from './outputs.mts';

for (const [year, days] of Object.entries(outputs)) {
    for (const [day, [expected1, expected2]] of Object.entries(days)) {
        const inputUrl = new URL(
            `../inputs/${year}/${day}.txt`,
            import.meta.url,
        );
        const input = await Deno.readTextFile(inputUrl);
        const { part1, part2 } = await import(`./${year}/${day}.mts`);

        Deno.test({
            name: `${year} day ${day} (part 1)`,
            fn: () => assertEquals(expected1, part1(input)),
            ignore: typeof part1 !== 'function' || expected1 === undefined,
        });

        Deno.test({
            name: `${year} day ${day} (part 2)`,
            fn: () => assertEquals(expected2, part2(input)),
            ignore: typeof part2 !== 'function' || expected2 === undefined,
        });
    }
}
