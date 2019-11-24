declare class DeduplicatorManager {
    deduplicate(filenames: Array<string>): Array<Array<string>> | undefined;
    private removeDuplicateFilenames;
    private deduplicateWithDeduplicators;
}
export default DeduplicatorManager;
