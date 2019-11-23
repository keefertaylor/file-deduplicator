class Deduplicator {
    /**
     * Deduplicate the given files using an evaluator function.
     * 
     * @param {Array<String>>} filenames The files to consider.
     * @param {*} evaluatorFunction A function which produces an output for the given file.
     */
    public deduplicate(filenames: Array<string>, evaluatorFunction: (string) => string): Array<Array<string>> {
        var evaluatedToFilesMap = this.evaluateInputs(filenames, evaluatorFunction);
        if (evaluatedToFilesMap == undefined) {
            return undefined
        }

        return this.reduceToPotentiallyDuplicatedFiles(evaluatedToFilesMap);
    }

    /**
     * Remove any non-duplicated files from the map.
     *
     * @param {} filenames 
     * @param {*} evaluatorFunction 
     */
    private reduceToPotentiallyDuplicatedFiles(evaluatedToFilesMap: Map<string, Array<string>>): Array<Array<string>> {
        // Iterate over the list of files.
        var potentiallyDuplicatedFiles = []
        for (const evaluated in evaluatedToFilesMap) {
            let fileList = evaluatedToFilesMap[evaluated]
            if (fileList.length != 1) {
                potentiallyDuplicatedFiles.push(fileList)
            }
        }
        return potentiallyDuplicatedFiles
    }

    /**
     * Build a map of `evaluated` -> List of files.
     * 
     * @param {Array<String>} filenames 
     * @param {Function} evaluatorFunction 
     */
    private evaluateInputs(filenames: Array<String>, evaluatorFunction: (string) => string): Map<string, Array<string>> {
        const evaluatedToFilesMap: Map<string, Array<string>> = new Map();
        for (var i = 0; i < filenames.length; i++) {
            let filename = filenames[i];
            let evaluated = evaluatorFunction(filename)

            // If the file couldn't be evaluated, then bail out of the entire function since something has gone terribly wrong.
            if (evaluated == undefined) {
                return undefined;
            }

            // Add the file to the list in the map.
            if (evaluatedToFilesMap[evaluated] == undefined) {
                evaluatedToFilesMap[evaluated] = [filename]
            } else {
                evaluatedToFilesMap[evaluated].push(filename)
            }
        }
        return evaluatedToFilesMap
    }
}

export default Deduplicator;