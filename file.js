const fs = require("fs")

// Test cases:
// - two same sized files
// - two different sized files
// - bad filenames
// - fileSizeInBytes (valid / invalid)

/**
 * Deduplicate the given files by file size.
 * 
 * @param {Array<String>} filenames
 */
const deduplicateByFileSize = function(filenames) {
    var possibleDuplicates = []
    var fileSizeMap = Map()

    for (filename in filenames) {
        let size = fileSizeInBytes(filename)
        if (fileSizeMap[size] == undefined) {
            fileSizeMap[size] = filename
        } else {
            possibleDuplicates.push(filename)
        }
    }
}

/**
 * Return the given size of the file in bytes.
 * 
 * @param {String} filename
 */
const fileSizeInBytes = function(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
