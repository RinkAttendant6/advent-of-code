const normalizeInput = (rawInput: string) => {
    const [ranges, ids] = rawInput.trim().split('\n\n');

    return [
        ranges.split('\n').map((line) => line.split('-').map(Number)),
        ids.split('\n').map(Number),
    ];
};

export const part1 = (rawInput: string) => {
    const [ranges, ids] = normalizeInput(rawInput);

    return (ids as number[]).filter((id) =>
        (ranges as [number, number][]).some(([start, end]) =>
            id >= start && id <= end
        )
    ).length;
};

export const part2 = (rawInput: string) => {
    const [ranges, _] = normalizeInput(rawInput);

    const sortedRanges = (ranges as [number, number][]).toSorted((a, b) =>
        a[0] - b[0]
    );
    const nonOverlappingRanges = [sortedRanges[0]];

    for (let i = 1; i < sortedRanges.length; ++i) {
        const previous = nonOverlappingRanges.at(-1)!;
        const current = sortedRanges[i];

        if (current[0] <= previous[1]) {
            // overlap
            previous[1] = Math.max(current[1], previous[1]);
        } else {
            // no overlap
            nonOverlappingRanges.push(current);
        }
    }

    console.log({ nonOverlappingRanges });

    return nonOverlappingRanges.reduce((sum, [start, end]) => {
        return sum + (end - start + 1);
    }, 0);
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/5.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
