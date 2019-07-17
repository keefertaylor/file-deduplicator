let md5Deduplicator = require('./md5_deduplicator.js')
let fileSizeDeduplicator = require('./fileSizeDeduplicator')

const DeduplicatorManager = {
    /**
     * Apply the given deduplicators in order to the given set of files.
     * 
     * @param {Array<String>} filenames Files to examine.
     * @param {Array<Deduplicators>} deduplicators Deduplicators.
     * @returns A list of lists of duplicated files.
     */
    deduplicateWithDeduplicators: function(filenames, deduplicators) {
        var fileList = [ filenames ]

        for (var i = 0; i < deduplicators.length; i++) {
            let deduplicator = deduplicators[i];


        }
    }
}

module.exports = DeduplicatorManager