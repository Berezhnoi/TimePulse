import RNFS from 'react-native-fs';

// Utility function to save an image to the temporary directory with the desired name
export async function saveImageToTemp(uri: string, fileName: string): Promise<string> {
  const tempDir = RNFS.CachesDirectoryPath + '/temp/';
  await RNFS.mkdir(tempDir);
  const tempPath = tempDir + fileName;
  await RNFS.copyFile(uri, tempPath);
  return tempPath;
}

// Utility function to remove temporary images
export async function removeTempDirectory(): Promise<void> {
  await RNFS.unlink(RNFS.CachesDirectoryPath + '/temp');
}

export function getFileExtension(filePath: string): string | null {
  const match = filePath.match(/\.([^.]+)$/);
  return match ? match[1] : null;
}
