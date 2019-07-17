const deduplicator = {
    /**
     * Deduplicate the given files using an evaluator function.
     * 
     * @param {*} filenames The files to consider.
     * @param {*} evaluatorFunction A function which produces an output for the given file.
     */
    deduplicate: function(filenames, evaluatorFunction) {
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

        // Iterate over the list of files.
        var potentiallyDuplicatedFiles = []
        for (evaluated in evaluatedToFilesMap) {
            let fileList = evaluatedToFilesMap[evaluated]
            if (fileList.length != 1) {
                potentiallyDuplicatedFiles.push(fileList)
            }
        }

        return potentiallyDuplicatedFiles;
    }
}

module.exports = deduplicator;