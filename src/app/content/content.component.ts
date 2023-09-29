import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
	componentToShow: string = "login";

	constructor(private axiosService: AxiosService) {
    const jwtToken = this.axiosService.getAuthToken();
    if (jwtToken) {
      this.componentToShow="messages"
    } else {
      this.componentToShow="login"
    }
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/auth",
		    {
		        username: input.username,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
		    }
		);
	}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/registration",
		    {
		        username: input.username,
		        password: input.password,
            confirmPassword: input.confirmPassword,
		        email: input.email
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "login";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "registration";
		    }
		);
	}

}
