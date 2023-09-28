import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
import {UserFileDto} from "../dto/user-file-dto";
import { environment } from 'src/app/enviroment/enviroment'
import axios from "axios";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: UserFileDto[] = [];


  constructor(private axiosService: AxiosService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.axiosService.request(
        "GET",
        "/file",
        {}).then(
        (response) => {
            this.data = response.data;
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                this.cookieService.set('JwtToken', '');
                this.axiosService.setAuthToken(null);
            } else {
                this.data = error.response.code;
            }
        }
    );
  }

  async downloadFile(item :UserFileDto): Promise<void> {
    try {
      const response = await axios.get(environment.apiUrl+"/file/"+item.fileName, {
        responseType: 'arraybuffer', // Указываем, что ожидаем бинарные данные (файл)
        headers: {
          'Authorization': `Bearer ${this.axiosService.getAuthToken()}`
        }
      });

      // Создаем объект Blob из полученных бинарных данных
      const blob = new Blob([response.data]);

      // Создаем объект URL для файла
      const url = window.URL.createObjectURL(blob);

      // Создаем ссылку для скачивания
      const a = document.createElement('a');
      a.href = url;
      a.download = item.fileName; // Имя файла при скачивании

      // Добавляем ссылку в DOM и кликаем по ней для скачивания
      document.body.appendChild(a);
      a.click();

      // Очищаем объект URL и удаляем ссылку
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Произошла ошибка при скачивании файла:', error);
    }
  }

  deleteFile(item: UserFileDto): void {
    this.axiosService.request(
      "DELETE",
      `/file/${item.fileName}`,
      {}
    )
      .then((response) => {
        this.ngOnInit();
      })
  }

  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0] as File;
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.axiosService.uploadRequest('POST', '/file', formData)
        .then((response) => {
          this.selectedFile = null;
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          this.ngOnInit();
          if (fileInput) {
            fileInput.value = '';
          }
        })
    }
  }
}
