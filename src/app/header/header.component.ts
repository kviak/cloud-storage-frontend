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

  constructor(private axiosService: AxiosService) {}
  user: UserDto = new UserDto('User', 'goida');

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/user",
      {}).then(
      (response) => {
        this.componentToShow="messages"
        this.user = response.user.userName;
        this.user = response.user.roles;
      })
  }



  goida(): void{
    this.axiosService.setAuthToken(null);
    location.reload();
  }
}
