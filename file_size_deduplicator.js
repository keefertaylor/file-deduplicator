const fs = require('fs')

// Test cases:
// - two same sized files
// - two different sized files

const fileSizeDeduplicator = {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    deduplicateByFileSize: function(filenames) {
        var fileSizeMap = {} //new Map()

        for (var i = 0; i < filenames.length; i++) {
            let filename = filenames[i];
            let size = this.fileSizeInBytes(filename)

            // If the file couldn't be found, then bail out of the entire function since something has gone terribly wrong.
            if (size == undefined) {
                return undefined;
            }

            // Add the file to the list in the map.
            if (fileSizeMap[size] == undefined) {
                fileSizeMap[size] = [filename]
            } else {
                fileSizeMap[size].push(filename)
            }
        }

        // Iterate over the list of files.
        var potentiallyDuplicatedFiles = []
        for (fileSize in fileSizeMap) {
            let fileList = fileSizeMap[fileSize]
            if (fileList.length != 1) {
                potentiallyDuplicatedFiles.push(fileList)
            }
        }

        return potentiallyDuplicatedFiles;
    },

    /**
     * Return the given size of the file in bytes.
     * 
     * @param {String} filename
     */
    fileSizeInBytes: function(filename) {
        try {
            const stats = fs.statSync(filename);
            const fileSizeInBytes = stats.size;
            return fileSizeInBytes;
        } catch (e) {
            return undefined;
        }
    }
};

module.exports = fileSizeDeduplicator