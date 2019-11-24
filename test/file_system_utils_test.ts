import assert from 'assert';
import testData from './test_data'
import FileSystemUtils from '../src/file_system_utils'


describe('#allFilesRecursively', function() {
    it('should return all files', async function() {
        let files = await FileSystemUtils.allFilesRecursively(testData.testDataDir)
        assert.equal(files.length, 7)
    });

    it(' should ignore symlinked files', async function() {
        let files = await FileSystemUtils.allFilesRecursively(testData.testDataDir);
        assert(!files.includes(testData.symlinkedFile));
    })

    it('isSymbolicLink should return true for a regular file', function() {
        let path = testData.testFile;
        assert(FileSystemUtils.isSymbolicLink(path) == false);
    })

    it('isSymbolicLink should return false for a symbolic link', function() {
        let path = testData.symlinkedFile;
        assert(FileSystemUtils.isSymbolicLink(path) == true);
    })

    it('directoryIsEmpty should return true for an empty directory', async function() {
        let path = testData.emptyDirs[0]!;
        assert(await FileSystemUtils.directoryIsEmpty(path));
    })

    it('directoryIsEmpty should return false for an nonempty directory', async function() {
        let path = testData.testDataDir;
        assert(!(await FileSystemUtils.directoryIsEmpty(path)));
    })
});
