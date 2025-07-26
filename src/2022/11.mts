import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-11.txt', 'ascii');

const data = input.trim().split('\n\n');

const monkeys = data.map((group) => {
    const { items, operation, test, t, f } = group.match(
        /\s*Starting items: (?<items>.+)\n\s*Operation: new = (?<operation>.+)\n\s*Test: divisible by (?<test>\d+)\n\s*If true: throw to monkey (?<t>\d+)\n\s*If false: throw to monkey (?<f>\d+)/
    ).groups;

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
 * @param {{items: number[], operation: string, test: number, yes: number, no: number, count: number}[]} monkeys
 * @param {number} rounds
 * @param {number} divisor
 * @returns {number[]}
 */
const keepAway = (monkeys, rounds, divisor = 1) => {
    const gcd = monkeys.reduce((acc, x) => x.test * acc, 1);

    for (let i = 0; i < rounds; ++i) {
        for (const monkey of monkeys) {
            monkey.count += monkey.items.length;

            while (monkey.items.length) {
                const old = monkey.items.shift();
                const target =
                    Math.floor(eval(monkey.operation) / divisor) % gcd;

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
 * @param {number[]} counts
 * @returns {number}
 */
const monkeyBusiness = (counts) =>
    counts
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((a, c) => a * c);

const part1 = monkeyBusiness(keepAway(structuredClone(monkeys), 20, 3));
const part2 = monkeyBusiness(keepAway(structuredClone(monkeys), 10000));

console.log({ part1, part2 });
