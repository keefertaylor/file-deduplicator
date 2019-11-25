import ArgParser from'./arg_parser'
import FileSystemUtils from './file_system_utils'
import DeduplicationManager from './deduplicator_manager'
import readlineLib from 'readline'
import FileSystemCleanuper from './file_system_cleanuper'
import EntityDeleter from './entity_deleter'

const readline = readlineLib.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Finds and prints duplicates files from across the two provided dirs.
 * Returns an Array<Array<String>> of duplicated files.
 * 
 * @param {String} dir1 
 * @param {String} dir2 
 */
const run = async function(dir1: string, dir2: string): Promise<void> {
    console.log("Deduping across: ")
    console.log("- " + dir1)
    console.log("- " + dir2)

    const dir1FileList = await FileSystemUtils.allFilesRecursively(dir1)
    const dir2FileList = await FileSystemUtils.allFilesRecursively(dir2)
    const filesToConsider = dir1FileList.concat(dir2FileList)

    let deduplicatorManager = new DeduplicationManager();
    let duplicates = deduplicatorManager.deduplicate(filesToConsider)
    if (duplicates == undefined) {
        console.log('failed: no duplicates');
        return;
    }
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
    const entityDeleter = new EntityDeleter();
    FileSystemCleanuper.cleanupFiles(duplicates, entityDeleter);
    FileSystemCleanuper.cleanupEmptyFolders(dir1, entityDeleter)
    FileSystemCleanuper.cleanupEmptyFolders(dir2, entityDeleter)
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

const args = ArgParser.validateArgs(process.argv)
if (args == undefined) {
    process.abort();
}

const arg0 = args![0];
const arg1 = args![1];
if (arg0 == undefined || arg1 == undefined) {
    process.abort()
}

run(arg0, arg1)
