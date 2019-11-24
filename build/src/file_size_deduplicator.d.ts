import Deduplicator from './deduplicator';
declare class FileSizeDeduplicator extends Deduplicator {
    deduplicate(filenames: Array<string>): Array<Array<string>> | undefined;
    fileSizeInBytes(absoluteFilePath: string): string | undefined;
}
export default FileSizeDeduplicator;
