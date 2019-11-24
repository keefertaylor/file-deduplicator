import nodeDir from 'node-dir';
import fs from 'fs'

/** Simple utils for filesystem. */
class FileSystemUtils {
    /**
     * Recursively returns all files in a directory, or undefined.
     * 
     * Emits an error to console if something fails.
     */
    public static async allFilesRecursively(absoluteDir: string): Promise<Array<string>> {
        try {
            const files = await nodeDir.promiseFiles(absoluteDir);
            return files.filter((path: string, index: number, array: Array<string>) => {
                const stat = fs.lstatSync(path);
                return !stat.isSymbolicLink();
            });
        } catch (e) {
            console.log("Could not get files. Error: " + e);
            return Promise.reject("failed");
        }    
    }
}

export default FileSystemUtils