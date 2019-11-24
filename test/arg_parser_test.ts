import assert from 'assert';
import ArgParser from '../src/arg_parser'

const defaultArgv = [
    '/usr/local/Cellar/node/12.3.1/bin/node',
    '/Users/some_user/some_dir/index.js',
]

const dir1 = "/Users/some_user/dir1"
const dir2 = "/Users/some_user/dir2"

const relDir1 = "dir1"
const relDir2 = "dir2"

describe('#parse args', function() {
    it('should parse correctly', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir1)
        argv.push(dir2)

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs!.length, 2)
        assert.equal(dirs![0], dir1)
        assert.equal(dirs![1], dir2)
    });

    it('should fail with too few args', async function() {
        var argv = defaultArgv.slice()

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with too many args', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir2)
        argv.push(dir2)
        argv.push(dir2)

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one first relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(relDir1)
        argv.push(dir2)

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one second relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(dir1)
        argv.push(relDir2)

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should fail with one second relative directory', async function() {
        var argv = defaultArgv.slice()
        argv.push(relDir1)
        argv.push(relDir2)

        const dirs = ArgParser.validateArgs(argv)

        assert.equal(dirs, undefined)
    });

    it('should be fine with one absolute directory', async function() {
      var argv = defaultArgv.slice()
      argv.push(dir1)

      const dirs = ArgParser.validateArgs(argv)

      assert.equal(dirs!.length, 1)
      assert.equal(dirs![0], dir1)
    });

    it('should be fine with one relative directory', async function() {
      var argv = defaultArgv.slice()
      argv.push(relDir1)

      const dirs = ArgParser.validateArgs(argv)

      assert.equal(dirs, undefined)
    });

});
