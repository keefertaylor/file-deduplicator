import assert from 'assert';
import FileSystemCleanuper from '../src/file_system_cleanuper'
import EntityDeleter from '../src/entity_deleter';

class FakeEntityDeleter extends EntityDeleter {
    public deletedFiles: Array<string> = [];
    public deletedFolders: Array<string> = []

    deleteFile(file: string): void {
        this.deletedFiles.push(file)
    }

    deleteFolder(absoluteFolderPath: string): void {
        this.deletedFolders.push(absoluteFolderPath);
    }
}

describe('#delete file', function() {
    it('should cleanup files as expectedly with multiple lists', async function() {
        // List of duped files. Expect b, c, e, 2, 3, 4 to be removed.
        const duplicatedFileList = [
            [ "a", "b", "c" ],
            [ "d", "e" ],
            [ "1", "2", "3", "4"],
            [ "x" ]
        ]

        // Cleanup files.
        const fakeEntityDeleter = new FakeEntityDeleter();
        FileSystemCleanuper.cleanupFiles(duplicatedFileList, fakeEntityDeleter)

        // Assert files that were duplicated were cleaned up
        assert(fakeEntityDeleter.deletedFiles.includes("b"))
        assert(fakeEntityDeleter.deletedFiles.includes("c"))
        assert(fakeEntityDeleter.deletedFiles.includes("e"))
        assert(fakeEntityDeleter.deletedFiles.includes("2"))
        assert(fakeEntityDeleter.deletedFiles.includes("3"))
        assert(fakeEntityDeleter.deletedFiles.includes("4"))

        // Assert one file was left.
        assert(!fakeEntityDeleter.deletedFiles.includes("a"))
        assert(!fakeEntityDeleter.deletedFiles.includes("d"))
        assert(!fakeEntityDeleter.deletedFiles.includes("1"))
        assert(!fakeEntityDeleter.deletedFiles.includes("x"))
    });

    it('should cleanup nothing with no duplicates', async function() {
        // List of duped files.
        const duplicatedFileList = [
            [ "a" ],
            [ "b" ],
            [ "c" ]
        ]

        // Cleanup files.
        const fakeEntityDeleter = new FakeEntityDeleter();
        FileSystemCleanuper.cleanupFiles(duplicatedFileList, fakeEntityDeleter)

        // Assert that nothing was cleaned up.
        assert.equal(fakeEntityDeleter.deletedFiles.length, 0)
    });

    it('should cleanup nothing with an empty list', async function() {
        // List of duped files.
        const duplicatedFileList: Array<Array<string>> = []

        // Cleanup files.
        const fakeEntityDeleter = new FakeEntityDeleter();
        FileSystemCleanuper.cleanupFiles(duplicatedFileList, fakeEntityDeleter)

        // Assert that nothing was cleaned up.
        assert.equal(fakeEntityDeleter.deletedFiles.length, 0)
    });
});

describe('#delete folder', function() {
    it('should cleanup files as expectedly with multiple lists', async function() {
        const fakeEntityDeleter = new FakeEntityDeleter();
        FileSystemCleanuper.cleanupEmptyFolders("/Users/keefertaylor/file_cleanup_test/test2/", fakeEntityDeleter)
        assert(false);
    });
});