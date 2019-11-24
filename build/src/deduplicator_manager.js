"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_deduplicator_1 = __importDefault(require("./md5_deduplicator"));
const file_size_deduplicator_1 = __importDefault(require("./file_size_deduplicator"));
class DeduplicatorManager {
    deduplicate(filenames) {
        let sanitizedFilenames = this.removeDuplicateFilenames(filenames);
        return this.deduplicateWithDeduplicators([sanitizedFilenames], [new file_size_deduplicator_1.default(), new md5_deduplicator_1.default()]);
    }
    removeDuplicateFilenames(filenames) {
        return [...new Set(filenames)];
    }
    deduplicateWithDeduplicators(listOfPotentialDuplicates, deduplicators) {
        if (deduplicators.length == 0) {
            return listOfPotentialDuplicates;
        }
        var newList = [];
        let deduplicator = deduplicators.shift();
        if (deduplicator == undefined) {
            return undefined;
        }
        for (var i = 0; i < listOfPotentialDuplicates.length; i++) {
            let potentialDuplicates = listOfPotentialDuplicates[i];
            let reducedPotentialDuplicates = deduplicator.deduplicate(potentialDuplicates);
            if (reducedPotentialDuplicates == undefined) {
                return undefined;
            }
            for (var j = 0; j < reducedPotentialDuplicates.length; j++) {
                let reducedPotentialDuplicate = reducedPotentialDuplicates[j];
                newList.push(reducedPotentialDuplicate);
            }
        }
        return this.deduplicateWithDeduplicators(newList, deduplicators);
    }
}
exports.default = DeduplicatorManager;
//# sourceMappingURL=deduplicator_manager.js.map