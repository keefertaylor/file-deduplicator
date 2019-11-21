const fs = require('fs')

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
    },

    /**
     * Cleanup any empty folders inside the given directory.
     */
    cleanupEmptyFolders: async function(dir) {
        let folders = findAllFolders(dir)
        for (var i = 0; i < folders.length; i++) {
            let folder = folders[i];
            try {
                fs.rmdirSync(folder)
                console.log("Removed now empty folder: " + folder)
            } catch (e) {
                // Folder was still full, intentionally do not process error.
            }
        }
    }
}

var findAllFolders = function(dir, folderList) {
    files = fs.readdirSync(dir);
    folderList = folderList || [];
    files.forEach(function(file) {
        const possibleFolder = dir + '/' + file
        if (fs.statSync(possibleFolder).isDirectory()) {
            folderList = findAllFolders(possibleFolder, folderList);
            folderList.push(possibleFolder)
        }
    });
    return folderList;
};
  
module.exports = fileSystemCleanup