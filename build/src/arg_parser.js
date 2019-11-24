"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const absolutePathError = "Paths must be absolute.";
const usageMessage = "Usage: `node index.js <absolute path to dir1> <absolute path to dir 2>";
class ArgParser {
    static validateArgs(argv) {
        argv.shift();
        argv.shift();
        if (argv.length < 1 || argv.length > 2) {
            console.log(usageMessage);
            return undefined;
        }
        const dir1 = argv.shift();
        if (dir1 == undefined || dir1.charAt(0) !== '/') {
            console.log(absolutePathError);
            console.log(usageMessage);
            return undefined;
        }
        const dir2 = argv.shift();
        if (dir2 === undefined) {
            return [dir1];
        }
        if (dir2.charAt(0) !== '/') {
            console.log(absolutePathError);
            console.log(usageMessage);
            return undefined;
        }
        return [dir1, dir2];
    }
}
exports.default = ArgParser;
//# sourceMappingURL=arg_parser.js.map