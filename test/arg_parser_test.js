var assert = require('assert');
const argParser = require('../arg_parser.js')

let defaultArgv = [
    '/usr/local/Cellar/node/12.3.1/bin/node',
    '/Users/some_user/some_dir/index.js',  
]

let dir1 = "/Users/some_user/dir1"
let dir2 = "/Users/some_user/dir2"

let relDir1 = "dir1"
let relDir2 = "dir2"

describe('#parse args', function() {
    it('should parse correctly', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir1)
        argv.push(dir2)

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs.length, 2)
        assert.equal(dirs[0], dir1)
        assert.equal(dirs[1], dir2)
    });

    it('should fail with too few args', async function() {
        var argv = defaultArgv.slice()

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with too many args', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir2)
        argv.push(dir2)
        argv.push(dir2)

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one first relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(relDir1)
        argv.push(dir2)

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one second relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir1)
        argv.push(relDir2)

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one second relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(relDir1)
        argv.push(relDir2)

        const dirs = argParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });
});
