import fs from 'fs';
import EntityDeleter from './entity_deleter';

class FileSystemCleanuper {
    /**
     * Cleans up duplicated files.
     * @param {Array<Array<String>>} duplicatedFileListList 
     * @param {EntityDeleter} entityDeleter An entity deleter that will perform cleanup.
     */
    public static cleanupFiles(duplicatedFileListList: Array<Array<string>>, entityDeleter: EntityDeleter): void {
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

    /**
     * Cleanup any empty folders inside the given directory.
     */
    public static async cleanupEmptyFolders(absoluteDirPath: string): Promise<void> {
        let folders = FileSystemCleanuper.findAllFolders(absoluteDirPath)
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

    private static findAllFolders(absoluteDirPath: string, existingFolderList?: Array<string>): Array<string> {
        const files = fs.readdirSync(absoluteDirPath);
        var folderList = existingFolderList || [];
        files.forEach(function(file) {
            const possibleFolder = absoluteDirPath + '/' + file
            if (fs.statSync(possibleFolder).isDirectory()) {
                folderList = FileSystemCleanuper.findAllFolders(possibleFolder, folderList);
                folderList.push(possibleFolder)
            }
        });
        return folderList;
    };
}


export default FileSystemCleanuper;