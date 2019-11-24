"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Deduplicator {
    deduplicate(filenames, evaluatorFunction) {
        if (evaluatorFunction === undefined) {
            console.log("Fatal: no evaluator function defined");
            return undefined;
        }
        var evaluatedToFilesMap = this.evaluateInputs(filenames, evaluatorFunction);
        if (evaluatedToFilesMap == undefined) {
            return undefined;
        }
        return this.reduceToPotentiallyDuplicatedFiles(evaluatedToFilesMap);
    }
    reduceToPotentiallyDuplicatedFiles(evaluatedToFilesMap) {
        var potentiallyDuplicatedFiles = [];
        evaluatedToFilesMap.forEach((fileList, key, map) => {
            if (fileList.length != 1) {
                potentiallyDuplicatedFiles.push(fileList);
            }
        });
        return potentiallyDuplicatedFiles;
    }
    evaluateInputs(filenames, evaluatorFunction) {
        const evaluatedToFilesMap = new Map();
        for (var i = 0; i < filenames.length; i++) {
            let filename = filenames[i];
            let evaluated = evaluatorFunction(filename);
            if (evaluated == undefined) {
                return undefined;
            }
            const list = evaluatedToFilesMap.get(evaluated);
            if (list == undefined) {
                evaluatedToFilesMap.set(evaluated, [filename]);
            }
            else {
                list.push(filename);
                evaluatedToFilesMap.set(evaluated, list);
            }
        }
        return evaluatedToFilesMap;
    }
}
exports.default = Deduplicator;
//# sourceMappingURL=deduplicator.js.map