const proxyquire = require('proxyquire');

// Use o proxyquire para substituir o módulo fs.promises
const fsPromisesMock = {
  readFile: jest.fn(),
  writeFile: jest.fn(),
};

const { readFileContent, writeFileContent } = proxyquire('./fileOperations', {
  'fs.promises': fsPromisesMock,
});

describe('File Operations', () => {
  afterEach(() => {
    // Limpe os mocks após cada teste
    jest.clearAllMocks();
  });

  it('reads file content', async () => {
    const mockFileContent = 'This is a test file content';
    fsPromisesMock.readFile.mockResolvedValue(mockFileContent);

    const content = await readFileContent('test.txt');

    expect(content).toBe(mockFileContent);
  });

  it('writes file content', async () => {
    const filePath = 'output.txt';
    const dataToWrite = 'This is the data to be written to the file';

    await writeFileContent(filePath, dataToWrite);

    expect(fsPromisesMock.writeFile).toHaveBeenCalledWith(filePath, dataToWrite);
  });

  it('handles file read error', async () => {
    const errorMessage = 'File not found';
    fsPromisesMock.readFile.mockRejectedValue(new Error(errorMessage));

    try {
      await readFileContent('nonexistent.txt');
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('handles file write error', async () => {
    const errorMessage = 'Permission denied';
    fsPromisesMock.writeFile.mockRejectedValue(new Error(errorMessage));

    try {
      await writeFileContent('noaccess.txt', 'data');
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
