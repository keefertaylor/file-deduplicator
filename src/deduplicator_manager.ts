import Deduplicator from './deduplicator';
import Md5Deduplicator from './md5_deduplicator';
import FileSizeDeduplicator from './file_size_deduplicator';

class DeduplicatorManager {
    /**
     * Deduplicate a list of files.
     * 
     * @param {Array<File>} filenames 
     */
    public deduplicate(filenames: Array<string>): Array<Array<string>> {
        let sanitizedFilenames = this.removeDuplicateFilenames(filenames)
        return this.deduplicateWithDeduplicators([sanitizedFilenames], [ new FileSizeDeduplicator(), new Md5Deduplicator() ])
    },

    /**
     * Remove any duplicates from the array.
     */
    private removeDuplicateFilenames(filenames: Array<string>): Array<string> {
        return [...new Set(filenames)];
    }

    /**
     * Apply the given deduplicators in order to the given set of files.
     * 
     * Each list in the list is a list of potential duplicates.
     * 
     * @param {Array<Array<String>>} listOfPotentialDuplicates Files to examine.
     * @param {Array<Deduplicators>} deduplicators Deduplicators.
     * @returns A list of lists of duplicated files.
     */
    private deduplicateWithDeduplicators(listOfPotentialDuplicates: Array<Array<string>>, deduplicators: Array<Deduplicator>): Array<Array<string>> {
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

export default DeduplicatorManager