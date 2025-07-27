type Monkey = {
    items: number[];
    operation: string;
    test: number;
    yes: number;
    no: number;
    count: number;
};

const normalizeInput = (rawInput: string): Monkey[] =>
    rawInput.split('\n\n').map((group) => {
        const { items, operation, test, t, f } = group.match(
            /\s*Starting items: (?<items>.+)\n\s*Operation: new = (?<operation>.+)\n\s*Test: divisible by (?<test>\d+)\n\s*If true: throw to monkey (?<t>\d+)\n\s*If false: throw to monkey (?<f>\d+)/,
        )!.groups;

        return {
            items: items.split(', ').map(Number),
            operation: operation,
            test: Number(test),
            yes: Number(t),
            no: Number(f),
            count: 0,
        };
    });

/**
 * Play keep away
 */
const keepAway = (
    monkeys: Monkey[],
    rounds: number,
    divisor: number = 1,
): number[] => {
    const gcd = monkeys.reduce((acc, x) => x.test * acc, 1);

    for (let i = 0; i < rounds; ++i) {
        for (const monkey of monkeys) {
            monkey.count += monkey.items.length;

            while (monkey.items.length) {
                const old = monkey.items.shift();
                const target = Math.floor(eval(monkey.operation) / divisor) %
                    gcd;

                monkeys[
                    monkey[target % monkey.test === 0 ? 'yes' : 'no']
                ].items.push(target);
            }
        }
    }

    return monkeys.map((monkey) => monkey.count);
};

/**
 * Determine monkey business value
 */
const monkeyBusiness = (counts: number[]): number =>
    counts
        .toSorted((a, b) => b - a)
        .slice(0, 2)
        .reduce((a, c) => a * c);

export const part1 = (input: string) =>
    monkeyBusiness(keepAway(normalizeInput(input), 20, 3));

export const part2 = (input: string) =>
    monkeyBusiness(keepAway(normalizeInput(input), 10000));

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/11.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
