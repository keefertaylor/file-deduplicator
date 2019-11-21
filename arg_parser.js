const absolutePathError = "Paths must be absolute."
const usageMessage = "Usage: `node index.js <absolute path to dir1> <absolute path to dir 2>"

const argParser = {
    /**
     * Validate the arguments and pass back an array of length 2 with the two directories.
     *
     * Returns undefined if invalid args are provided.
     *
     * @param {Array<String>} argv The argv from the process.
     */
    validateArgs: function(argv) {
        // Remove off default invocation arguments.
        argv.shift()
        argv.shift()

        if (argv.length < 1 || argv.length > 2) {
            console.log(usageMessage)
            return undefined
        }

        dir1 = argv.shift()
        if (dir1.charAt(0) !== '/') {
            console.log(absolutePathError)
            console.log(usageMessage)
            return undefined
        }

        dir2 = argv.shift()
        if (dir2 === undefined) {
          return [ dir1 ];
        }

        if (dir2.charAt(0) !== '/') {
            console.log(absolutePathError)
            console.log(usageMessage)
            return undefined
        }

        return [ dir1, dir2 ]
    }
}

module.exports = argParser
