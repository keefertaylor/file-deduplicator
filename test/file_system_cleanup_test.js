const assert = require('assert');
const fileSystemCleanuper = require('../file_system_cleanuper')

var deletedFiles = []

const mockCleanuper = {
    deleteFile: function(file) {
        deletedFiles.push(file)
    }
}

describe('#delete file', function() {
    it('should cleanup files as expectedly with multiple lists', async function() {
        // Reset deleted files.
        deletedFiles = []

        // List of duped files. Expect b, c, e, 2, 3, 4 to be removed.
        const duplicatedFileList = [
            [ "a", "b", "c" ],
            [ "d", "e" ],
            [ "1", "2", "3", "4"],
            [ "x" ]
        ]

        // Cleanup files.
        fileSystemCleanuper.cleanupFiles(duplicatedFileList, mockCleanuper)

        // Assert files that were duplicated were cleaned up
        assert(deletedFiles.includes("b"))
        assert(deletedFiles.includes("c"))
        assert(deletedFiles.includes("e"))
        assert(deletedFiles.includes("2"))
        assert(deletedFiles.includes("3"))
        assert(deletedFiles.includes("4"))

        // Assert one file was left.
        assert(!deletedFiles.includes("a"))
        assert(!deletedFiles.includes("d"))
        assert(!deletedFiles.includes("1"))
        assert(!deletedFiles.includes("x"))
    });

    it('should cleanup nothing with no duplicates', async function() {
        // Reset deleted files.
        deletedFiles = []

        // List of duped files.
        const duplicatedFileList = [
            [ "a" ],
            [ "b" ],
            [ "c" ]
        ]

        // Cleanup files.
        fileSystemCleanuper.cleanupFiles(duplicatedFileList, mockCleanuper)

        // Assert that nothing was cleaned up.
        assert.equal(deletedFiles.length, 0)
    });

    it('should cleanup nothing with an empty list', async function() {
        // Reset deleted files.
        deletedFiles = []

        // List of duped files.
        const duplicatedFileList = []

        // Cleanup files.
        fileSystemCleanuper.cleanupFiles(duplicatedFileList, mockCleanuper)

        // Assert that nothing was cleaned up.
        assert.equal(deletedFiles.length, 0)
    });
});

describe('#delete folder', function() {
    it('should cleanup files as expectedly with multiple lists', async function() {
        fileSystemCleanuper.cleanupEmptyFolders("/Users/keefertaylor/file_cleanup_test/test2/", mockCleanuper)
    });
});