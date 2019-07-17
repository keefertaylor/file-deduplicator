const assert = require('assert');
const entityDeleter = require('../entity_deleter.js')
const fs = require('fs')

describe('#delete file', function() {
    it('should delete a file', async function() {
        // Create a file.
        let testFile = "SHOULD_BE_DELETED.txt"
        fs.closeSync(fs.openSync(testFile, 'w'));

        // Make sure file exists
        assert(fs.existsSync(testFile))

        // Delete file.
        entityDeleter.deleteFile(testFile)

        // Assert file is gone.
        assert(!fs.existsSync(testFile))
    });

    it('should delete a folder', async function() {
        // Create a file.
        let testFolder = "FOLDER_THAT_SHOULD_BE_DELETED"
        fs.mkdirSync(testFolder);

        // Make sure folder exists
        assert(fs.existsSync(testFolder))

        // Delete folder.
        entityDeleter.deleteFolder(testFolder)

        // Assert folder is gone.
        assert(!fs.existsSync(testFolder))
    });
});
