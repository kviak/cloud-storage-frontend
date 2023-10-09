import { Component, Input } from '@angular/core';
import {AxiosService} from "../axios.service";
import {UserDto} from "../dto/user.dto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	@Input() pageTitle!: string;
	@Input() logoSrc!: string;
  componentToShow: string = "login";

  user: UserDto = new UserDto('', '');
  constructor(private axiosService: AxiosService) {
    this.axiosService.request(
      "GET",
      "/user",
      {}).then(
      (response) => {
        this.user.userName = response.data;
        // this.user.userName = response.data.userName;
        // this.user.roles = response.data.roles;
      })
  }


  goida(): void{
    this.axiosService.setAuthToken(null);
    location.reload();
  }
}
