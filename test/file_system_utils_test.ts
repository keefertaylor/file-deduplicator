import assert from 'assert';
import testData from './test_data'
import FileSystemUtils from '../src/file_system_utils'


describe('#allFilesRecursively', function() {
    it('should return all files', async function() {
        let files = await FileSystemUtils.allFilesRecursively(testData.testDataDir)
        assert.equal(files.length, 7)
    });
});
