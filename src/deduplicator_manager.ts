import Deduplicator from './deduplicator';
import Md5Deduplicator from './md5_deduplicator';
import FileSizeDeduplicator from './file_size_deduplicator';

class DeduplicatorManager {
    /**
     * Deduplicate a list of files.
     * 
     * @param {Array<File>} filenames 
     */
    public deduplicate(filenames: Array<string>): Array<Array<string>> | undefined {
        let sanitizedFilenames = this.removeDuplicateFilenames(filenames)
        return this.deduplicateWithDeduplicators([sanitizedFilenames], [ new FileSizeDeduplicator(), new Md5Deduplicator() ])
    }

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
    private deduplicateWithDeduplicators(
        listOfPotentialDuplicates: Array<Array<string>>, 
        deduplicators: Array<Deduplicator>        
    ): Array<Array<string>> | undefined {
        if (deduplicators.length == 0) {
            return listOfPotentialDuplicates
        }

        for (var i = 0; i < deduplicators.length; i++) {
            const deduplicator = deduplicators[i];
            if (deduplicator == undefined) {
                return undefined;
            }

            // A list to rebuild as we process listOfPotentialDuplicates.
            const tmpList: Array<Array<string>> = [];
            while (listOfPotentialDuplicates.length > 0) {
                console.log("[Pass " + (i + 1) + " / " + deduplicators.length + "][" + (listOfPotentialDuplicates.length) + " Remaining Clusters]");

                const potentialDuplicates = listOfPotentialDuplicates.shift();
                console.log(potentialDuplicates);
                console.log(listOfPotentialDuplicates.length)
                if (potentialDuplicates == undefined) {
                    return undefined;
                }

                let reducedPotentialDuplicates = deduplicator.deduplicate(potentialDuplicates);

                // Bail if the result was undefined.
                if (reducedPotentialDuplicates == undefined) {
                    return undefined
                }
            
                // Add lists of potentially duplicated files to the new list.
                for (var j = 0; j < reducedPotentialDuplicates.length; j++) {
                    let reducedPotentialDuplicate = reducedPotentialDuplicates[j];
                    tmpList.push(reducedPotentialDuplicate);
                }
            }
            listOfPotentialDuplicates = tmpList;
        }

        return listOfPotentialDuplicates;
    }
}

export default DeduplicatorManager