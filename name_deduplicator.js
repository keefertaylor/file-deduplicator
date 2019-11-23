const fs = require('fs')
const deduplicator = require('./deduplicator.js')
var path = require("path");

const nameDeduplicator = {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    deduplicate: function(filenames) {
        return deduplicator.deduplicate(filenames, this.filename)
    },

    /**
     * Return the given size of the file in bytes.
     * 
     * @param {String} filename
     */
    filename: function(filename) {
        return path.basename(filename);
    }
};

module.exports = nameDeduplicator