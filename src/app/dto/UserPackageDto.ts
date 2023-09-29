export class UserPackageDto {
  packageName: string;
  packageLink: string;
  packageSize: bigint;

  constructor(packageName: string, packageLink: string, packageSize: bigint) {
    this.packageName = packageName;
    this.packageLink = packageLink;
    this.packageSize = packageSize;
  }
}
