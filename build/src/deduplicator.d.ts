declare class Deduplicator {
    deduplicate(filenames: Array<string>, evaluatorFunction?: (absoluteFilePath: string) => string | undefined): Array<Array<string>> | undefined;
    private reduceToPotentiallyDuplicatedFiles;
    private evaluateInputs;
}
export default Deduplicator;
