var assert = require('assert');
var fileSizeDeduplicator = require('../file_size_deduplicator.js')

let test_data_dir = process.cwd() + '/test_data/'

let testFile = test_data_dir + 'test_file.txt'
let testFileSize = 10 // bytes

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
