const fs = require('fs')

// Test cases:
// - two same sized files
// - two different sized files
// - bad filenames

const fileSizeDeduplicator = {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<String>} A list of files that have the same size. Returns undefined if there was an error.
     */
    deduplicateByFileSize: function(filenames) {
        var possibleDuplicates = []
        var fileSizeMap = Map()

        for (filename in filenames) {
            let size = fileSizeInBytes(filename)

            // If the file couldn't be found, then bail out of the entire function since something has gone terribly wrong.
            if (size == undefined) {
                return undefined;
            }

            if (fileSizeMap[size] == undefined) {
                fileSizeMap[size] = filename
            } else {
                possibleDuplicates.push(filename)
            }
        }
        return 
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