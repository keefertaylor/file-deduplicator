const fs = require('fs')
const deduplicator = require('./deduplicator.js')

const fileSizeDeduplicator = {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    deduplicateByFileSize: function(filenames) {
        return deduplicator.deduplicate(filenames, this.fileSizeInBytes)
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