declare class FileSystemUtils {
    static allFilesRecursively(absoluteDir: string): Promise<Array<string>>;
}
export default FileSystemUtils;
