var assert = require('assert');
var testData = require('./test_data.js')
var deduplicatorManager = require('../deduplicator_manager.js')

describe('#deduplicate', function() {
    it('should dedupe successfully', function() {
        // GIVEN a list of files that have a set of duplicated files.
        let filenames = testData.duplicatedFiles.slice()
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames.push(testData.testFile)
        
        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)
        
        // THEN the set of overlapping files are identified.
        assert.equal(duplicates.length, 1)
        assert.equal(duplicates[0].length, 2)
        assert.equal(duplicates[0][0], testData.duplicatedFiles[0])
        assert.equal(duplicates[0][1], testData.duplicatedFiles[1])
    });

    it('should fail with unknown files', function() {
        // GIVEN a list of files that has an invalid file.
        let filenames = testData.duplicatedFiles.slice()
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames.push(testData.testFile)
        filenames.push(testData.invalidFile)
        
        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)
        
        // THEN the result is undefined.
        assert.equal(duplicates, undefined)
    });

    it('should return an empty list with empty files', function() {
        // GIVEN an empty list.
        let filenames = []

        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)

        // THEN the result is empty.
        assert.equal(duplicates.length, 0)
    })

    it('should return an empty list with no overlapping files', function() {
        // GIVEN a list with no overlapping files
        let filenames = testData.sameSizedFiles.slice()
        filenames.push(testData.testFile)
        filenames.push(testData.duplicatedFiles[0])

        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)

        // THEN the result is empty.
        assert.equal(duplicates.length, 0)        
    })

    it('should not try to dedupe the same file', function() {
        // Given a list of with two of the same file.
        let filenames = [ testData.testFile, testData.testFile ]
        
        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)

        // THEN the result is empty.
        assert.equal(duplicates.length, 0)
    })

    it('should still find duplicates when the same file id duplicated', function() {
        // GIVEN a list of files with some duplicates and some files listed twice.
        let filenames = testData.duplicatedFiles.slice()
        filenames = filenames.concat(testData.duplicatedFiles);
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames.push(testData.testFile)
        filenames.push(testData.testFile)

        // WHEN the files are deduplicated.
        let duplicates = deduplicatorManager.deduplicate(filenames)
        
        // THEN the set of overlapping files are identified.
        assert.equal(duplicates.length, 1)
        assert.equal(duplicates[0].length, 2)
        assert.equal(duplicates[0][0], testData.duplicatedFiles[0])
        assert.equal(duplicates[0][1], testData.duplicatedFiles[1])
    })
});
