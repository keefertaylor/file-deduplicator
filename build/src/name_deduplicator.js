"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deduplicator_1 = __importDefault(require("./deduplicator"));
const path_1 = __importDefault(require("path"));
class NameDeduplicator extends deduplicator_1.default {
    deduplicate(filenames) {
        return super.deduplicate(filenames, this.filename);
    }
    filename(absoluteFilePath) {
        return path_1.default.basename(absoluteFilePath);
    }
}
;
exports.default = NameDeduplicator;
//# sourceMappingURL=name_deduplicator.js.map