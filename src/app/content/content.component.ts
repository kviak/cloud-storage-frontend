import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  title: string = 'frontend';
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
		    }).catch(error => {
            const label = document.getElementById('label1') as HTMLLabelElement;
            label.textContent = error.response.data.message;
            console.log(error.response.data.message)
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
		    }
		);
	}


  async onRegister(input: any): Promise<void> {
    try {
      const response = await this.axiosService.request(
        "POST",
        "/registration",
        {
          username: input.username,
          password: input.password,
          confirmPassword: input.confirmPassword,
          email: input.email
        }
      );
      this.componentToShow = "login";
      location.reload();
    } catch (error) {
      this.axiosService.setAuthToken(null);
      this.componentToShow = "login";
      location.reload();
    }
  }
}
