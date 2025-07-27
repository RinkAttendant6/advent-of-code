const normalizeInput = (rawInput: string): string[][] =>
    rawInput.split('\n')
        .map((line) => [...line]);

export const part1 = (input: string) =>
    normalizeInput(input).reduce((total, x) => {
        const sack1 = x.slice(0, x.length / 2);
        const sack2 = x.slice(x.length / 2);

        const intersection = sack1.filter((el) => sack2.includes(el));
        const uniqueIntersection = [...new Set(intersection)];

        return (
            total +
            uniqueIntersection.reduce((subtotal, el) => {
                const priority = /[a-z]/.test(el)
                    ? el.charCodeAt(0) - 'a'.charCodeAt(0) + 1
                    : el.charCodeAt(0) - 'A'.charCodeAt(0) + 27;

                return subtotal + priority;
            }, 0)
        );
    }, 0);

export const part2 = (input: string) =>
    normalizeInput(input).reduce((total, x, idx, lines) => {
        if (idx % 3 > 0) {
            return total;
        }

        const sack1 = x;
        const sack2 = lines[idx + 1];
        const sack3 = lines[idx + 2];

        const intersection = sack1.filter(
            (el) => sack2.includes(el) && sack3.includes(el),
        );
        const uniqueIntersection = [...new Set(intersection)];

        return (
            total +
            uniqueIntersection.reduce((subtotal, el) => {
                const priority = /[a-z]/.test(el)
                    ? el.charCodeAt(0) - 'a'.charCodeAt(0) + 1
                    : el.charCodeAt(0) - 'A'.charCodeAt(0) + 27;

                return subtotal + priority;
            }, 0)
        );
    }, 0);

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/3.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
