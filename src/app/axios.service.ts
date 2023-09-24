import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/app/enviroment/enviroment'

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = environment.apiUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }

  uploadRequest(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken(),
        "Content-Type": "multipart/form-data"
      };
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
