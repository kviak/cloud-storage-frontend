export class UserFileDto {
  fileName: string;
  linkFile: string;

  constructor(fileName: string, linkFile: string) {
    this.fileName = fileName;
    this.linkFile = linkFile;
  }
}
