const fs = require('fs')

/** Deletes files and folders from the file system. */
const entityDeleter = {
    deleteFile: function(file) {
        console.log('deleting file: ' + file)
        fs.unlinkSync(file)
    },

    deleteFolder: function(folder) {
        console.log('removing dir: ' + folder)
        fs.rmdirSync(folder)
    }
}

module.exports = entityDeleter