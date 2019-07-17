var assert = require('assert');
var fileSizeDeduplicator = require('../file_size_deduplicator.js')

let testDataDir = process.cwd() + '/test_data/'

let testFile = testDataDir + 'test_file.txt'
let testFileSize = 10 // bytes

let duplicatedFiles = [
    testDataDir + 'test_duplicated_file_1.txt',
    testDataDir + 'test_duplicated_file_2.txt'
]

let sameSizedFiles = [
    testDataDir + "test_file_with_same_size_different_content_1.txt",
    testDataDir + "test_file_with_same_size_different_content_2.txt",
    testDataDir + "test_file_with_same_size_different_content_3.txt"
]

let invalidFile = testDataDir + 'DOES_NOT_EXIST.txt'

describe('#fileSizeInBytes', function() {
    it('should return the file size in bytes for a file', function() {
        let size = fileSizeDeduplicator.fileSizeInBytes(testFile)
        assert.equal(size, testFileSize);
    });

    it('should return undefined for a non-existant file', function() {
        let size = fileSizeDeduplicator.fileSizeInBytes(invalidFile);
        assert.equal(size, undefined);
    });
});

describe('#deduplicateByFileSize', function() {
    it('should return undefined for a bad list of files', function() {
        // GIVEN a list of files that has a non-existant file.
        let filenames = duplicatedFiles.slice()
        filenames.push(testFile, invalidFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicateByFileSize(filenames)

        // THEN the result is undefined.
        assert.equal(potentialDuplicates, undefined)
    });

    it('should return an empty list when there are no duplicated files', function() {
        // GIVEN a list of files that are not duplicated.
        let filenames = [ duplicatedFiles[0], testFile ]

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicateByFileSize(filenames);

        // THEN the result is the empty list.
        assert.equal(potentialDuplicates.length, 0);
    });

    it('should return a single list when there are two duplicated files', function() {
        // GIVEN a list of files that have 2 duplicates.
        let filenames = duplicatedFiles.slice()
        filenames.push(testFile);

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicateByFileSize(filenames)

        // THEN the result is a single list with the duplicated files.
        assert.equal(potentialDuplicates.length, 1)
        assert.equal(potentialDuplicates[0].length, 2)
        assert.equal(potentialDuplicates[0][0], duplicatedFiles[0])
        assert.equal(potentialDuplicates[0][1], duplicatedFiles[1])
    });

    it('should return two lists when there are two sets of duplicated files', function() {
        // GIVEN a list of files that have 2 duplicated sets of files.
        let filenames = duplicatedFiles.slice()
        filenames = filenames.concat(sameSizedFiles);
        filenames.push(testFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicateByFileSize(filenames)

        // THEN the sets of overlapping files are identified.
        assert.equal(potentialDuplicates.length, 1)
        assert.equal(potentialDuplicates[0].length, 2)
        assert.equal(potentialDuplicates[0].length, 3)
    });
})