const nodeDir = require('node-dir');

/** Simple utils for filesystem. */
const fileSystemUtils = {
    /**
     * Recursively returns all files in a directory, or undefined.
     * 
     * Emits an error to console if something fails.
     */
    allFilesRecursively: async function(dir) {
        try {
            return await nodeDir.promiseFiles(dir);
        } catch (e) {
            console.log("Could not get files. Error: " + e);
        }
    }
}

module.exports = fileSystemUtils