const fs = require('fs')

/** Deletes files and folders from the file system. */
const entityDeleter = {
    deleteFile: function(file) {
        // console.log('deleting file: ' + file)
        try {
            fs.unlinkSync(file)
        } catch (exception) {
            console.log("[ERROR] Could not delete file: " + file)
        }
    },

    deleteFolder: function(folder) {
        // console.log('removing dir: ' + folder)
        try {
            fs.rmdirSync(folder)
        } catch (exception) {
            console.log("[ERROR] Could not delete folder: " + folder)
        }
    }
}

module.exports = entityDeleter