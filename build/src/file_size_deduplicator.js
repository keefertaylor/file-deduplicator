"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deduplicator_1 = __importDefault(require("./deduplicator"));
class FileSizeDeduplicator extends deduplicator_1.default {
    deduplicate(filenames) {
        return super.deduplicate(filenames, this.fileSizeInBytes);
    }
    fileSizeInBytes(absoluteFilePath) {
        try {
            const stats = fs_1.default.statSync(absoluteFilePath);
            const fileSizeInBytes = stats.size;
            return String(fileSizeInBytes);
        }
        catch (e) {
            return undefined;
        }
    }
}
;
exports.default = FileSizeDeduplicator;
//# sourceMappingURL=file_size_deduplicator.js.map