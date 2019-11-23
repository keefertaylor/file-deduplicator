let md5Deduplicator = require('./md5_deduplicator.js')
let fileSizeDeduplicator = require('./file_size_deduplicator.js')

const DeduplicatorManager = {
    /**
     * Deduplicate a list of files.
     * 
     * @param {Array<File>} filenames 
     */
    deduplicate: function(filenames) {
        let sanitizedFilenames = this.removeDuplicateFilenames(filenames)
        return this.deduplicateWithDeduplicators([sanitizedFilenames], [ fileSizeDeduplicator, md5Deduplicator ])
    },

    /**
     * Remove any duplicates from the array.
     */
    removeDuplicateFilenames: function(filenames) {
        return [...new Set(filenames)];
    },

    /**
     * Apply the given deduplicators in order to the given set of files.
     * 
     * Each list in the list is a list of potential duplicates.
     * 
     * @param {Array<Array<String>>} listOfPotentialDuplicates Files to examine.
     * @param {Array<Deduplicators>} deduplicators Deduplicators.
     * @returns A list of lists of duplicated files.
     */
    deduplicateWithDeduplicators: function(listOfPotentialDuplicates, deduplicators) {
        if (deduplicators.length == 0) {
            return listOfPotentialDuplicates
        }

        var newList = []
        let deduplicator = deduplicators.shift()
        for (var i = 0; i < listOfPotentialDuplicates.length; i++) {
            let potentialDuplicates = listOfPotentialDuplicates[i]
            let reducedPotentialDuplicates = deduplicator.deduplicate(potentialDuplicates)

            // Bail if the result was undefined.
            if (reducedPotentialDuplicates == undefined) {
                return undefined
            }
            
            // Add lists of potentially duplicated files to the new list.
            for (var j = 0; j < reducedPotentialDuplicates.length; j++) {
                let reducedPotentialDuplicate = reducedPotentialDuplicates[j];
                newList.push(reducedPotentialDuplicate);
            }
        }

        return this.deduplicateWithDeduplicators(newList, deduplicators)
    }
}

module.exports = DeduplicatorManager