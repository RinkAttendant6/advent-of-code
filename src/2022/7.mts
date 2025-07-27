type DirectoryLayout = {
    name: string;
    parent: DirectoryLayout | null;
    totalSize: number;
    files: Record<string, number>;
    dirs: Record<string, DirectoryLayout>;
};

const prepareDisk = (input: string): DirectoryLayout => {
    const disk: DirectoryLayout = {
        name: '/',
        parent: null,
        totalSize: 0,
        files: {},
        dirs: {},
    };

    let cwd = disk;

    input.split('\n').forEach((line) => {
        if (line === '$ ls') {
            return;
        }

        if (line.startsWith('$ cd ')) {
            const dir = line.slice(5);

            if (dir === '..') {
                cwd = cwd.parent as DirectoryLayout;
            } else if (dir !== '/') {
                cwd = cwd.dirs[dir];
            }

            return;
        }

        const [size, name] = line.split(' ');

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

    const computeSizes = (tree: DirectoryLayout) => {
        // compute subdirectories first
        Object.values(tree.dirs).forEach((dir) => computeSizes(dir));

        tree.totalSize =
            Object.values(tree.files).reduce((acc, file) => acc + file, 0) +
            Object.values(tree.dirs).reduce(
                (acc, dir) => acc + dir.totalSize,
                0,
            );
    };

    computeSizes(disk);

    return disk;
};

export const part1 = (input: string) => {
    const disk = prepareDisk(input);
    let result = 0;

    const findSmallDirs = (tree: DirectoryLayout) => {
        for (const dir of Object.values(tree.dirs)) {
            findSmallDirs(dir);
        }

        if (tree.totalSize <= 100000) {
            result += tree.totalSize;
        }
    };

    findSmallDirs(disk);

    return result;
};

export const part2 = (input: string) => {
    const disk = prepareDisk(input);

    const DISK_SIZE = 70_000_000;
    const MIN_FREE_SPACE = 30_000_000;
    const CURRENT_FREE_SPACE = DISK_SIZE - disk.totalSize;
    const NEED_TO_DELETE = MIN_FREE_SPACE - CURRENT_FREE_SPACE;

    const findSmallestDirectoryToDelete = (
        tree: DirectoryLayout,
        smallest: number = Infinity,
    ) => {
        if (tree.totalSize < NEED_TO_DELETE) {
            // not eligible
            return smallest;
        }

        smallest = Math.min(tree.totalSize, smallest);

        for (const dir of Object.values(tree.dirs)) {
            smallest = Math.min(
                smallest,
                findSmallestDirectoryToDelete(dir, smallest),
            );
        }

        return smallest;
    };

    return findSmallestDirectoryToDelete(disk);
};

// deno-coverage-ignore-start
if (import.meta.main) {
    const year = new URL(import.meta.url).pathname.split('/').at(-2);
    const inputUrl = new URL(`../../inputs/${year}/7.txt`, import.meta.url);
    const input = await Deno.readTextFile(Deno.args[0] ?? inputUrl);
    console.log({ part1: part1(input), part2: part2(input) });
}
// deno-coverage-ignore-stop
