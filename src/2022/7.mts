import fs from 'node:fs/promises';

const input = await fs.readFile('assets/day-7.txt', 'ascii');
const data = input.trim().split('\n');

const disk = {
    name: '/',
    parent: null,
    totalSize: 0,
    files: {},
    dirs: {},
};

let cwd = disk;

data.forEach(line => {
    if (line === '$ ls') {
        return;
    }

    if (line.startsWith('$ cd ')) {
        const dir = line.slice(5);

        if (dir === '..') {
            cwd = cwd.parent;
        } else if (dir !== '/') {
            cwd = cwd.dirs[dir];
        }

        return;
    }

    let [size, name] = line.split(' ');

    if (size == 'dir') {
        cwd.dirs[name] = {
            name,
            parent: cwd,
            totalSize: 0,
            files: {},
            dirs: {},
        };
    } else {
        cwd.files[name] = Number(size);
    }
});

const computeSizes = (tree) => {
    // compute subdirectories first
    Object.values(tree.dirs).forEach((dir) => computeSizes(dir));

    tree.totalSize =
        Object.values(tree.files).reduce((acc, file) => acc + file, 0) +
        Object.values(tree.dirs).reduce((acc, dir) => acc + dir.totalSize, 0);
};

computeSizes(disk);

let part1 = 0;
const findSmallDirs = (tree, acc) => {
    for (const dir of Object.values(tree.dirs)) {
        findSmallDirs(dir, acc);
    }

    if (tree.totalSize <= 100000) {
        part1 += tree.totalSize;
    }
};

findSmallDirs(disk);

// part 2

const DISK_SIZE = 70_000_000;
const MIN_FREE_SPACE = 30_000_000;
const CURRENT_FREE_SPACE = DISK_SIZE - disk.totalSize;
const NEED_TO_DELETE = MIN_FREE_SPACE - CURRENT_FREE_SPACE;

const findSmallestDirectoryToDelete = (tree, smallest = Infinity) => {
    if (tree.totalSize < NEED_TO_DELETE) {
        // not eligible
        return smallest;
    }

    smallest = Math.min(tree.totalSize, smallest);

    for (const dir of Object.values(tree.dirs)) {
        smallest = Math.min(
            smallest,
            findSmallestDirectoryToDelete(dir, smallest)
        );
    }

    return smallest;
};

const part2 = findSmallestDirectoryToDelete(disk);

console.log({ part1, part2 });
