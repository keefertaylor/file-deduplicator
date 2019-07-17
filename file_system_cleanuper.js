const fileSystemCleanup = {
    /**
     * Cleans up duplicated files.
     * @param {Array<Array<String>>} duplicatedFileListList 
     * @param {EntityDeleter} entityDeleter An entity deleter that will perform cleanup.
     */
    cleanupFiles: function(duplicatedFileListList, entityDeleter) {
        for (var i = 0; i < duplicatedFileListList.length; i++) {
            const duplicatedFilesList = duplicatedFileListList[i]

            // Don't clean up the first file.
            duplicatedFilesList.shift()
            for (var j = 0; j < duplicatedFilesList.length; j++) {
                const duplicatedFile = duplicatedFilesList[j]
                entityDeleter.deleteFile(duplicatedFile)
            }
        }
    }
}

module.exports = fileSystemCleanup