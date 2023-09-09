// fileOperations.js
const fs = require('fs-extra');

async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw error;
  }
}

async function writeFileContent(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
  } catch (error) {
    throw error;
  }
}

module.exports = { readFileContent, writeFileContent };
