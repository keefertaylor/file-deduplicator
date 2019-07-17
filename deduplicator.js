const deduplicator = {
    /**
     * Deduplicate the given files using an evaluator function.
     * 
     * @param {Array<String>>} filenames The files to consider.
     * @param {*} evaluatorFunction A function which produces an output for the given file.
     */
    deduplicate: function(filenames, evaluatorFunction) {
        var evaluatedToFilesMap = this.evaluateInputs(filenames, evaluatorFunction);
        if (evaluatedToFilesMap == undefined) {
            return undefined
        }

        return this.reduceToPotentiallyDuplicatedFiles(evaluatedToFilesMap);
    },

    /**
     * Remove any files from the map.
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
     */
    evaluateInputs: function(filenames, evaluatorFunction) {
        var evaluatedToFilesMap = {}
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

module.exports = deduplicator;