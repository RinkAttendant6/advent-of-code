# Advent of Code in Deno

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
[![Deno JS](https://img.shields.io/badge/deno%20js-000000?style=for-the-badge&logo=deno&logoColor=white)](https://deno.com/)

## Run

You must have [Deno](https://deno.com/) installed.

```shell
deno task start <year> <day> path/to/input.txt
```

## Structure

### Inputs

Inputs are not committed to this repository. There is a Git submodule at the
`inputs` directory that contains input files.

### Source code

All source code is found in the `src` directory, organized by year. The file
name corresponds to the day of the problem, with the extension `.mts`.

Every file is expected to have two named exports: `part1` and `part2`. Both of
the exports must be executable functions that take one parameter (the raw
input).

### Outputs

For automated testing purposes, the real outputs are commited to
`src/outputs.mts`.
