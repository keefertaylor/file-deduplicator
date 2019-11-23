import nodeDir from 'node-dir';

/** Simple utils for filesystem. */
class FileSystemUtils {
    /**
     * Recursively returns all files in a directory, or undefined.
     * 
     * Emits an error to console if something fails.
     */
    public static async allFilesRecursively(absoluteDir: string): Promise<Array<string>> {
        try {
            return await nodeDir.promiseFiles(absoluteDir);
        } catch (e) {
            console.log("Could not get files. Error: " + e);
        }
    }
}

export default FileSystemUtils