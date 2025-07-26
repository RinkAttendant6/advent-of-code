import fs from 'node:fs/promises';
import Graph from 'node-dijkstra';

const input = await fs.readFile('assets/day-12.txt', 'ascii');

const data = input
    .trim()
    .split('\n')
    .map((line) => line.split``);

const mapWidth = data[0].length;
const computeCellIndex = (x, y) => y * mapWidth + x;

let S = -1,
    E = -1;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 'S') {
            S = computeCellIndex(j, i);
            data[i][j] = 'a';
        } else if (data[i][j] === 'E') {
            E = computeCellIndex(j, i);
            data[i][j] = 'z';
        }
    }
}

const graph = new Graph();

for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
        const currentCell = data[i][j];
        const edges = new Map();

        for (let v = -1; v <= 1; ++v) {
            for (let h = -1; h <= 1; ++h) {
                if ((!h && v) || (!v && h)) {
                    const cell = data[i + v]?.[j + h] ?? null;

                    if (cell?.charCodeAt() <= currentCell.charCodeAt() + 1) {
                        edges.set(computeCellIndex(j + h, i + v), 1);
                    }
                }
            }
        }

        if (edges.size > 1) {
            graph.addNode(computeCellIndex(j, i), edges);
        }
    }
}

const trails = [];
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] !== 'a') {
            continue;
        }

        const path = graph.path(computeCellIndex(j, i), E);
        if (path !== null) {
            trails.push(path);
        }
    }
}

const part1 = graph.path(S, E).length - 1;
const part2 = Math.min(...trails.map((t) => t.length)) - 1;

console.log({ part1, part2 });
