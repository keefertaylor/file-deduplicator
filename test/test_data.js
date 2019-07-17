let testDataDir = process.cwd() + '/test_data/'

const testData = {
    testFile: testDataDir + 'test_file.txt',
    testFileSize: 10, // bytes

    duplicatedFiles: [
        testDataDir + 'test_duplicated_file_1.txt',
        testDataDir + 'test_duplicated_file_2.txt'
    ],

    sameSizedFiles: [
        testDataDir + "test_file_with_same_size_different_content_1.txt",
        testDataDir + "test_file_with_same_size_different_content_2.txt",
        testDataDir + "test_file_with_same_size_different_content_3.txt"
    ],

    invalidFile: testDataDir + 'DOES_NOT_EXIST.txt'
}

module.exports = testData;