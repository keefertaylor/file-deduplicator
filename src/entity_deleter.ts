const fs = require('fs')

/** Deletes files and folders from the file system. */
class EntityDeleter {
    public deleteFile(absoluteFilePath: string): void {
        console.log('deleting file: ' + absoluteFilePath)
        fs.unlinkSync(absoluteFilePath)
    }

    public deleteFolder(absoluteFolderPath: string): void {
        console.log('removing dir: ' + absoluteFolderPath)
        fs.rmdirSync(absoluteFolderPath)
    }
}

export default EntityDeleter;