#!/usr/bin/env -S deno run --allow-read="inputs/","src/"
import { parseArgs } from 'jsr:@std/cli/parse-args';

const flags = parseArgs(Deno.args, {
    default: { inputFile: null },
});

const year = Number(Deno.args[0] ?? 0);
const day = Number(Deno.args[1] ?? 0);

if (year < 2015 || year > (new Date()).getFullYear()) {
    throw new Error('Invalid year specified');
}

if (day < 1 || day > 25) {
    throw new Error('Invalid day specified');
}

const inputFile = flags.inputFile ??
    new URL(`inputs/${year}/${day}.txt`, import.meta.url);

const input = await Deno.readTextFile(inputFile);

const { part1, part2 } = await import(
    import.meta.dirname + `/src/${year}/${day}.mts`
);

const output = {
    part1: typeof part1 === 'function' ? part1(input) : undefined,
    part2: typeof part2 === 'function' ? part2(input) : undefined,
};

console.log(output);
