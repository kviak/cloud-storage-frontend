export class UserFileDto {
  fileName: string;
  linkFile: string;
  fileSize: bigint;

  constructor(fileName: string, linkFile: string, fileSize: bigint) {
    this.fileName = fileName;
    this.linkFile = linkFile;
    this.fileSize = fileSize;
  }
}
