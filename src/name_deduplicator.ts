import Deduplicator from './deduplicator';
import path from 'path';

class NameDeduplicator extends Deduplicator {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    public deduplicate(filenames: Array<string>): Array<Array<string>> {
        return super.deduplicate(filenames, this.filename)
    },

    /**
     * Return the given size of the file in bytes.
     * 
     * @param {String} filename
     */
    private filename(absoluteFilePath: string) {
        return path.basename(absoluteFilePath);
    }
};

export default NameDeduplicator