const argParser = require('./arg_parser.js')
const fileSystemUtils = require('./file_system_utils')
const deduplicationManager = require('./deduplicator_manager.js')

const run = async function(dir1, dir2) {
    console.log("Deduping across: ")
    console.log("- " + dir1)
    console.log("- " + dir2)

    const dir1FileList = await fileSystemUtils.allFilesRecursively(args[0])
    const dir2FileList = await fileSystemUtils.allFilesRecursively(args[1])
    const filesToConsider = dir1FileList.concat(dir2FileList)

    let duplicates = deduplicationManager.deduplicate(filesToConsider)

    console.log(duplicates)
}

const args = argParser.validateArgs(process.argv)
if (args == undefined) {
    process.abort()
}

run(args[0], args[1])