"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileSystemCleanuper {
    static cleanupFiles(duplicatedFileListList, entityDeleter) {
        for (var i = 0; i < duplicatedFileListList.length; i++) {
            const duplicatedFilesList = duplicatedFileListList[i];
            duplicatedFilesList.shift();
            for (var j = 0; j < duplicatedFilesList.length; j++) {
                const duplicatedFile = duplicatedFilesList[j];
                entityDeleter.deleteFile(duplicatedFile);
            }
        }
    }
    static async cleanupEmptyFolders(absoluteDirPath) {
        let folders = FileSystemCleanuper.findAllFolders(absoluteDirPath);
        for (var i = 0; i < folders.length; i++) {
            let folder = folders[i];
            try {
                fs_1.default.rmdirSync(folder);
                console.log("Removed now empty folder: " + folder);
            }
            catch (e) {
            }
        }
    }
    static findAllFolders(absoluteDirPath, existingFolderList) {
        const files = fs_1.default.readdirSync(absoluteDirPath);
        var folderList = existingFolderList || [];
        files.forEach(function (file) {
            const possibleFolder = absoluteDirPath + '/' + file;
            if (fs_1.default.statSync(possibleFolder).isDirectory()) {
                folderList = FileSystemCleanuper.findAllFolders(possibleFolder, folderList);
                folderList.push(possibleFolder);
            }
        });
        return folderList;
    }
    ;
}
exports.default = FileSystemCleanuper;
//# sourceMappingURL=file_system_cleanuper.js.map