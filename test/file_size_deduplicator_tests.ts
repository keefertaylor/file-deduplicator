import assert from 'assert';
import testData from './test_data'
import FileSizeDeduplicator from '../src/file_size_deduplicator'

const fileSizeDeduplicator = new FileSizeDeduplicator();

describe('#fileSizeInBytes', function() {
    it('should return the file size in bytes for a file', function() {
        let size = fileSizeDeduplicator.fileSizeInBytes(testData.testFile)
        assert.equal(size, testData.testFileSize);
    });

    it('should return undefined for a non-existant file', function() {
        let size = fileSizeDeduplicator.fileSizeInBytes(testData.invalidFile);
        assert.equal(size, undefined);
    });
});

describe('#deduplicateByFileSize', function() {
    it('should return undefined for a bad list of files', function() {
        // GIVEN a list of files that has a non-existant file.
        let filenames = testData.duplicatedFiles.slice()
        filenames.push(testData.testFile, testData.invalidFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicate(filenames)

        // THEN the result is undefined.
        assert.equal(potentialDuplicates, undefined)
    });

    it('should return an empty list when there are no duplicated files', function() {
        // GIVEN a list of files that are not duplicated.
        let filenames = [ testData.duplicatedFiles[0], testData.testFile ]

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicate(filenames);
        if (potentialDuplicates == undefined) {
            assert(false);
            return;
        }
        
        // THEN the result is the empty list.
        assert.equal(potentialDuplicates.length, 0);
    });

    it('should return a single list when there are two duplicated files', function() {
        // GIVEN a list of files that have 2 duplicates.
        let filenames = testData.duplicatedFiles.slice()
        filenames.push(testData.testFile);

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicate(filenames)
        if (potentialDuplicates == undefined) {
            assert(false);
            return;
        }

        // THEN the result is a single list with the duplicated files.
        assert.equal(potentialDuplicates.length, 1)
        assert.equal(potentialDuplicates[0].length, 2)
        assert.equal(potentialDuplicates[0][0], testData.duplicatedFiles[0])
        assert.equal(potentialDuplicates[0][1], testData.duplicatedFiles[1])
    });

    it('should return two lists when there are two sets of duplicated files', function() {
        // GIVEN a list of files that have 2 duplicated sets of files.
        let filenames = testData.duplicatedFiles.slice()
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames.push(testData.testFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = fileSizeDeduplicator.deduplicate(filenames)
        if (potentialDuplicates == undefined) {
            assert(false);
            return;
        }
        
        // THEN the sets of overlapping files are identified.
        assert.equal(potentialDuplicates.length, 2)
        assert.equal(potentialDuplicates[0].length, 2)
        assert.equal(potentialDuplicates[1].length, 3)
    });
})