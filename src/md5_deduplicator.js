const hasher = require('md5-file')
const deduplicator = require('./deduplicator.js')

const md5Deduplicator = {
    /**
     * Deduplicate the given files by md5 hash.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    deduplicate: function(filenames) {
        return deduplicator.deduplicate(filenames, this.md5Hash)
    },

    /**
     * Return the md5 checksum of the given file.
     * 
     * @param {String} filename
     */
    md5Hash: function(filename) {
        try {
            return hasher.sync(filename)
        } catch (e) {
            return undefined;
        }
    }
};

module.exports = md5Deduplicator