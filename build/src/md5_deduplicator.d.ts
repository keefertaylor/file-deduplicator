import Deduplicator from './deduplicator.js';
declare class Md5Deduplicator extends Deduplicator {
    deduplicate(filenames: Array<string>): Array<Array<string>> | undefined;
    md5Hash(absoluteFilePath: string): string | undefined;
}
export default Md5Deduplicator;
