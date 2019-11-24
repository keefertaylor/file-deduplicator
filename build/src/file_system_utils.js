"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_dir_1 = __importDefault(require("node-dir"));
class FileSystemUtils {
    static async allFilesRecursively(absoluteDir) {
        try {
            return await node_dir_1.default.promiseFiles(absoluteDir);
        }
        catch (e) {
            console.log("Could not get files. Error: " + e);
            return Promise.reject("failed");
        }
    }
}
exports.default = FileSystemUtils;
//# sourceMappingURL=file_system_utils.js.map