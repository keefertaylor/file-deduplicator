"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class EntityDeleter {
    deleteFile(absoluteFilePath) {
        console.log('deleting file: ' + absoluteFilePath);
        fs.unlinkSync(absoluteFilePath);
    }
    deleteFolder(absoluteFolderPath) {
        console.log('removing dir: ' + absoluteFolderPath);
        fs.rmdirSync(absoluteFolderPath);
    }
}
exports.default = EntityDeleter;
//# sourceMappingURL=entity_deleter.js.map