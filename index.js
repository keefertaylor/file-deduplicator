const argParser = require('./arg_parser.js')
const fileSystemUtils = require('./file_system_utils')
const deduplicationManager = require('./deduplicator_manager.js')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fileSystemCleanuper = require('./file_system_cleanuper.js')
const entityDeleter = require('./entity_deleter.js')

/**
 * Finds and prints duplicates files from across the two provided dirs.
 * Returns an Array<Array<String>> of duplicated files.
 * 
 * @param {String} dir1 
 * @param {String} dir2 
 */
const run = async function(dir1, dir2) {
    console.log("Deduping across: ")
    console.log("- " + dir1)
    const dir1FileList = await fileSystemUtils.allFilesRecursively(args[0])

    var dir2FileList = [];
    if (dir2 != undefined) {
        console.log("- " + dir2)
        dir2FileList = await fileSystemUtils.allFilesRecursively(args[1]);
    }

    const filesToConsider = dir1FileList.concat(dir2FileList)

    let duplicates = deduplicationManager.deduplicate(filesToConsider)

    console.log("Here are the duplicated files")
    for (var i = 0; i < duplicates.length; i++) {
        console.log(duplicates[i])
    }

    const userWantsToCleanup = await prompt()
    if (!userWantsToCleanup) {
        console.log("Exiting.")
        process.abort()
    }
    console.log("Cleaning up")
    fileSystemCleanuper.cleanupFiles(duplicates, entityDeleter);

    console.log("Cleaning up empty folders in " + dir1);
    fileSystemCleanuper.cleanupEmptyFolders(dir1)
    
    console.log("Cleaning up empty folders in " + dir2);
    fileSystemCleanuper.cleanupEmptyFolders(dir2)

    console.log("done");
}


const prompt = function() {
    return new Promise(function(resolve) {
        readline.question("Do you want to cleanup the above files. This operation is ***NOT*** reversible. (Type 'yes' to continue, type anything else to quit)\n", (resp) => {
            readline.close();

            const normalizedResp = resp.trim().toLowerCase();
            if (normalizedResp === "yes") {
                resolve(true);
            }
            resolve(false);
        });
    });

}

const args = argParser.validateArgs(process.argv)
if (args == undefined) {
    process.abort()
}

duplicatedFiles = run(args[0], args[1])
