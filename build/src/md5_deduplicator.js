"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_file_1 = __importDefault(require("md5-file"));
const deduplicator_js_1 = __importDefault(require("./deduplicator.js"));
class Md5Deduplicator extends deduplicator_js_1.default {
    deduplicate(filenames) {
        return super.deduplicate(filenames, this.md5Hash);
    }
    md5Hash(absoluteFilePath) {
        try {
            return md5_file_1.default.sync(absoluteFilePath);
        }
        catch (e) {
            return undefined;
        }
    }
}
;
exports.default = Md5Deduplicator;
//# sourceMappingURL=md5_deduplicator.js.map