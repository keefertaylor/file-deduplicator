var assert = require('assert');
var fileSizeDeduplicator = require('../file_size_deduplicator.js')

let test_data_dir = process.cwd() + '/test_data/'

let testFile = test_data_dir + 'test_file.txt'
let testFileSize = 10 // bytes

let duplicatedFiles = [
    test_data_dir + 'test_duplicated_file_1.txt',
    test_data_dir + 'test_duplicated_file_2.txt'
]

let invalidFile = test_data_dir + 'DOES_NOT_EXIST.txt'

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

        // THEN the result is undefined.
        assert.equal(potentialDuplicates.length, 0);
    });
})