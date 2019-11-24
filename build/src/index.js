"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = __importDefault(require("./arg_parser"));
const file_system_utils_1 = __importDefault(require("./file_system_utils"));
const deduplicator_manager_1 = __importDefault(require("./deduplicator_manager"));
const readline_1 = __importDefault(require("readline"));
const file_system_cleanuper_1 = __importDefault(require("./file_system_cleanuper"));
const entity_deleter_1 = __importDefault(require("./entity_deleter"));
const readline = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const run = async function (dir1, dir2) {
    console.log("Deduping across: ");
    console.log("- " + dir1);
    console.log("- " + dir2);
    const dir1FileList = await file_system_utils_1.default.allFilesRecursively(dir1);
    const dir2FileList = await file_system_utils_1.default.allFilesRecursively(dir2);
    const filesToConsider = dir1FileList.concat(dir2FileList);
    let deduplicatorManager = new deduplicator_manager_1.default();
    let duplicates = deduplicatorManager.deduplicate(filesToConsider);
    if (duplicates == undefined) {
        console.log('failed: no duplicates');
        return;
    }
    console.log("Here are the duplicated files");
    for (var i = 0; i < duplicates.length; i++) {
        console.log(duplicates[i]);
    }
    const userWantsToCleanup = await prompt();
    if (!userWantsToCleanup) {
        console.log("Exiting.");
        process.abort();
    }
    console.log("Cleaning up");
    file_system_cleanuper_1.default.cleanupFiles(duplicates, new entity_deleter_1.default());
    file_system_cleanuper_1.default.cleanupEmptyFolders(dir1);
    file_system_cleanuper_1.default.cleanupEmptyFolders(dir2);
};
const prompt = function () {
    return new Promise(function (resolve) {
        readline.question("Do you want to cleanup the above files. This operation is ***NOT*** reversible. (Type 'yes' to continue, type anything else to quit)\n", (resp) => {
            readline.close();
            const normalizedResp = resp.trim().toLowerCase();
            if (normalizedResp === "yes") {
                resolve(true);
            }
            resolve(false);
        });
    });
};
const args = arg_parser_1.default.validateArgs(process.argv);
if (args == undefined) {
    process.abort();
}
const arg0 = args[0];
const arg1 = args[1];
if (arg0 == undefined || arg1 == undefined) {
    process.abort();
}
run(arg0, arg1);
//# sourceMappingURL=index.js.map