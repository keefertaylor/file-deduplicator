import nodeDir from 'node-dir';
import fs from 'fs'

/** Simple utils for filesystem. */
class FileSystemUtils {
    /**
     * Recursively returns all files in a directory, or undefined.
     * 
     * Does not include symbolic links.
     * 
     * Emits an error to console if something fails.
     */
    public static async allFilesRecursively(absoluteDir: string): Promise<Array<string>> {
        try {
            const files = await nodeDir.promiseFiles(absoluteDir);
            return files.filter((path: string, index: number, array: Array<string>) => {
                return !this.isSymbolicLink(path);
            });
        } catch (e) {
            console.log("Could not get files. Error: " + e);
            return Promise.reject("failed");
        }    
    }

    public static isSymbolicLink(absoluteFilePath: string): boolean {
        const stat = fs.lstatSync(absoluteFilePath);
        return stat.isSymbolicLink();
    }

    public static async directoryIsEmpty(absoluteDir: string): Promise<boolean> {
        let files = await FileSystemUtils.allFilesRecursively(absoluteDir);
        return files.length == 0;
    }
}

export default FileSystemUtils