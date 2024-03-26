import JSZip from 'jszip';

class UnZipFile {
  constructor(filename, fileContent, type) {
    this.filename = filename;
    this.fileContent = fileContent;
  }
}

export const unzip_from_base64 = async (base64String) => {
  const zip = new JSZip();
  const unzipContent = await zip.loadAsync(base64String);

  let unzippedFiles = [];
  for (const filename of Object.keys(unzipContent.files)) {
    const fileEntry = unzipContent.files[filename];
    if (!fileEntry.dir) {
      const fileContent = await unzipContent.file(filename).async('string');
      const cleanFilename = filename.replace(/^data\//, '');
      unzippedFiles.push(new UnZipFile(cleanFilename, fileContent));
    }
  }

  return unzippedFiles;
};
