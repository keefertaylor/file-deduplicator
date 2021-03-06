import fs from 'fs'
import Deduplicator from './deduplicator'

class FileSizeDeduplicator extends Deduplicator {
    /**
     * Deduplicate the given files by file size.
     * 
     * @param {Array<String>} filenames: A list of filenames to examine.
     * @returns {Array<Array<String>>} A list of lists of potentially deduplicated files. Returns undefined if there was an error.
     */
    public deduplicate(filenames: Array<string>): Array<Array<string>>  | undefined  {
        return super.deduplicate(filenames, this.fileSizeInBytes)
    }

    /**
     * Return the given size of the file in bytes.
     * 
     * This method is exposed for testing.
     * 
     * @param {String} filename
     */
    public fileSizeInBytes(absoluteFilePath: string): string | undefined {
        try {
            const stats = fs.statSync(absoluteFilePath);
            const fileSizeInBytes = stats.size;
            return String(fileSizeInBytes);
        } catch (e) {
            return undefined;
        }
    }
};

export default FileSizeDeduplicator