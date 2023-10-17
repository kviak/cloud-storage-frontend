export class UserFileDto {
  fileName: string;
  shareLink: string;
  fileSize: bigint;

  constructor(fileName: string, shareLink: string, fileSize: bigint) {
    this.shareLink = shareLink;
    this.fileName = fileName;
    this.fileSize = fileSize;
  }
}
