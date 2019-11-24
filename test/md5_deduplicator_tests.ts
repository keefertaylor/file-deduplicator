import assert from 'assert';
import testData from './test_data'
import Md5Deduplicator from '../src/md5_deduplicator';

const md5Deduplicator = new Md5Deduplicator();

describe('#md5Hash', function() {
    it('should return the md5 hash for a file', function() {
        let hash = md5Deduplicator.md5Hash(testData.testFile)
        assert.equal(hash, testData.testFileHash);
    });

    it('should return undefined for a non-existant file', function() {
        let hash = md5Deduplicator.md5Hash(testData.invalidFile)
        assert.equal(hash, undefined);
    });
});

describe('#deduplicateByHash', function() {
    it('should return undefined for a bad list of files', function() {
        // GIVEN a list of files that has a non-existant file.
        let filenames = testData.duplicatedFiles.slice()
        filenames.push(testData.testFile, testData.invalidFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = md5Deduplicator.deduplicate(filenames)
        if (potentialDuplicates == undefined) {
            assert(false);
            return;
        }

        // THEN the result is undefined.
        assert.equal(potentialDuplicates, undefined)
    });

    it('should return an empty list when there are no duplicated files', function() {
        // GIVEN a list of files that are not duplicated.
        let filenames = [ testData.duplicatedFiles[0], testData.sameSizedFiles[0], testData.testFile ]

        // WHEN the files are deduplicated.
        let potentialDuplicates = md5Deduplicator.deduplicate(filenames);
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
        let potentialDuplicates = md5Deduplicator.deduplicate(filenames)
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

    it('should return one list when there are one set of duplicated files', function() {
        // GIVEN some files which look the same.
        let filenames = testData.duplicatedFiles.slice()
        filenames = filenames.concat(testData.sameSizedFiles);
        filenames.push(testData.testFile)

        // WHEN the files are deduplicated.
        let potentialDuplicates = md5Deduplicator.deduplicate(filenames)
        if (potentialDuplicates == undefined) {
            assert(false);
            return;
        }

        // THEN the sets of overlapping files are identified.
        assert.equal(potentialDuplicates.length, 1)
        assert.equal(potentialDuplicates[0].length, 2)
    });
})