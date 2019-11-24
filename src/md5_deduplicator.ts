import hasher from 'md5-file'
import Deduplicator from './deduplicator.js'

class Md5Deduplicator extends Deduplicator {
    /**
     * Deduplicate the given files by md5 hash.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    public deduplicate(filenames: Array<string>): Array<Array<string>> | undefined  {
        return super.deduplicate(filenames, this.md5Hash)
    }

    /**
     * Return the md5 checksum of the given file.
     * 
     * This method exposed for testing.
     * 
     * @param {String} filename
     */
    public md5Hash(absoluteFilePath: string): string | undefined {
        try {
            return hasher.sync(absoluteFilePath)
        } catch (e) {
            return undefined;
        }
    }
};

export default Md5Deduplicator