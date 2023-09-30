export class UserDto {
  userName: string;
  roles: string;

  constructor(userName: string, roles: string) {
    this.userName = userName;
    this.roles = roles;
  }
}
