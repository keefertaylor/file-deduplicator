import EntityDeleter from './entity_deleter';
declare class FileSystemCleanuper {
    static cleanupFiles(duplicatedFileListList: Array<Array<string>>, entityDeleter: EntityDeleter): void;
    static cleanupEmptyFolders(absoluteDirPath: string): Promise<void>;
    private static findAllFolders;
}
export default FileSystemCleanuper;
