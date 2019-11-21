const deduplicator = {
    /**
     * Deduplicate the given files using an evaluator function.
     * 
     * @param {Array<String>>} filenames The files to consider.
     * @param {*} evaluatorFunction A function which produces an output for the given file.
     * 
     * @return An array of evaluatedResult -> list of files, and a list of errored files.
     */
    deduplicate: function(filenames, evaluatorFunction) {
        var evaluatedResult = this.evaluateInputs(filenames, evaluatorFunction);
        if (evaluatedResult == undefined) {
            return undefined
        }

        return this.reduceToPotentiallyDuplicatedFiles(evaluatedResult)
    },

    /**
     * Remove any non-duplicated files from the map.
     *
     * @param {} filenames 
     * @param {*} evaluatorFunction 
     */
    reduceToPotentiallyDuplicatedFiles: function(evaluatedToFilesMap) {
        // Iterate over the list of files.
        var potentiallyDuplicatedFiles = []
        for (evaluated in evaluatedToFilesMap) {
            let fileList = evaluatedToFilesMap[evaluated]
            if (fileList.length != 1) {
                potentiallyDuplicatedFiles.push(fileList)
            }
        }
        return potentiallyDuplicatedFiles
    },

    /**
     * Build a map of `evaluated` -> List of files.
     * 
     * @param {Array<String>} filenames 
     * @param {Function} evaluatorFunction 
     * 
     * @return An array of evaluatedResult -> list of files, and a list of errored files. 
     */
    evaluateInputs: function(filenames, evaluatorFunction) {
        var errored = [];

        var evaluatedToFilesMap = {}
        for (var i = 0; i < filenames.length; i++) {
            let filename = filenames[i];
            // console.log('[ ' + i + ' / ' + filenames.length + '] evaluating: ' + filename);

            let evaluated = evaluatorFunction(filename)

            // If the file couldn't be evaluated, then bail out of the entire function since something has gone terribly wrong.
            if (evaluated == undefined) {
                // console.log("Failed to evaluate: " + filename)
                errored.push(filename);
                continue
            }

            // Add the file to the list in the map.
            if (evaluatedToFilesMap[evaluated] == undefined) {
                evaluatedToFilesMap[evaluated] = [filename]
            } else {
                evaluatedToFilesMap[evaluated].push(filename)
            }
        }

        return evaluatedToFilesMap
        // return [ evaluatedToFilesMap, errored ] 
    }
}

module.exports = deduplicator;