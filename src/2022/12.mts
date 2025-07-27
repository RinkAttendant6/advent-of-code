import Graph from 'node-dijkstra';

const normalizeInput = (rawInput: string) =>
    rawInput
        .split('\n')
        .map((line) => line.split(''));

const computeCellIndex = (grid: any[][], x: number, y: number) =>
    y * grid[0].length + x;

const getStartAndEnd = (grid: string[][]): [number, number] => {
    let S = -1,
        E = -1;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                S = computeCellIndex(grid, x, y);
                grid[y][x] = 'a';
            } else if (grid[y][x] === 'E') {
                E = computeCellIndex(grid, x, y);
                grid[y][x] = 'z';
            }
        }
    }

    return [S, E];
};

const prepareGraph = (grid: string[][]) => {
    const graph = new Graph();

    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            const currentCell = grid[y][x];
            const edges = new Map();

            for (let dy = -1; dy <= 1; ++dy) {
                for (let dx = -1; dx <= 1; ++dx) {
                    if ((!dx && dy) || (!dy && dx)) {
                        const cell = grid[y + dy]?.[x + dx] ?? null;

                        if (
                            cell?.charCodeAt(0) <= currentCell.charCodeAt(0) + 1
                        ) {
                            edges.set(
                                computeCellIndex(grid, x + dx, y + dy),
                                1,
                            );
                        }
                    }
                }
            }

            if (edges.size > 1) {
                graph.addNode(computeCellIndex(grid, x, y), edges);
            }
        }
    }

    return graph;
};

const findTrails = (grid: string[][], graph: Graph, end: number) => {
    const trails = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== 'a') {
                continue;
            }

            const path = graph.path(computeCellIndex(grid, x, y), end);
            if (path !== null) {
                trails.push(path);
            }
        }
    }

    return trails;
};

export const part1 = (input: string) => {
    const grid = normalizeInput(input);
    const [S, E] = getStartAndEnd(grid);
    const graph = prepareGraph(grid);

    return graph.path(S, E).length - 1;
};

export const part2 = (input: string) => {
    const grid = normalizeInput(input);
    const graph = prepareGraph(grid);
    const [_, E] = getStartAndEnd(grid);
    const trails = findTrails(grid, graph, E);

    return Math.min(...trails.map((t) => t.length)) - 1;
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/12.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
