import Deduplicator from './deduplicator';
declare class NameDeduplicator extends Deduplicator {
    deduplicate(filenames: Array<string>): Array<Array<string>> | undefined;
    private filename;
}
export default NameDeduplicator;
