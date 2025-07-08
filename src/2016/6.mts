import rawInput from '#inputs/2016/6.txt' with { type: 'text' };

const input = rawInput.split('\n').map((line) => line.split(''));

export let part1 = '';
export let part2 = '';

for (let col = 0; col < input[0].length; ++col) {
    const map: Record<string, number> = {};

    for (let row = 0; row < input.length; ++row) {
        map[input[row][col]] ??= 0;
        ++map[input[row][col]];
    }

    const maxFrequency = Math.max(...Object.values(map));
    const minFrequency = Math.min(...Object.values(map));

    for (const [char, freq] of Object.entries(map)) {
        if (freq === maxFrequency) {
            part1 += char;
        } else if (freq === minFrequency) {
            part2 += char;
        }
    }
}

if (import.meta.main) {
    console.log({ part1, part2 });
}
