const testDataDir = process.cwd() + '/test_data'

const testData = {
    testDataDir: testDataDir,
    
    testFile: testDataDir + '/test_file.txt',
    testFileSize: 10, // bytes
    testFileHash: "f521971c319684c4ea400f26d2686c4f",

    duplicatedFiles: [
        testDataDir + '/test_duplicated_file_1.txt',
        testDataDir + '/test_duplicated_file_2.txt'
    ],

    sameSizedFiles: [
        testDataDir + "/test_file_with_same_size_different_content_1.txt",
        testDataDir + "/test_file_with_same_size_different_content_2.txt",
        testDataDir + "/test_file_with_same_size_different_content_3.txt"
    ],

    invalidFile: testDataDir + '/DOES_NOT_EXIST.txt',

    emptyDirs: [
        testDataDir + "/empty_dir",
        testDataDir + "/nested_dir/empty_dir",
    ],

    symlinkedFile: testDataDir + "/sym_link_to_test_file.txt"
}

export default testData;