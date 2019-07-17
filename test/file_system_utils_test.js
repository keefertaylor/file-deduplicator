var assert = require('assert');
var testData = require('./test_data.js')
const fileSystemUtils = require('../file_system_utils.js')

describe('#allFilesRecursively', function() {
    it('should return all files', async function() {
        let files = await fileSystemUtils.allFilesRecursively(testData.testDataDir)
        assert.equal(files.length, 7)
    });
});
