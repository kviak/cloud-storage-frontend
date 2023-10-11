import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
import {UserFileDto} from "../dto/user-file-dto";
import { environment } from 'src/app/enviroment/enviroment';
import axios from "axios";
import {UserPackageDto} from "../dto/user.package.dto";
import {UserDto} from "../dto/user.dto";


@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: UserFileDto[] = [];
  packages: UserPackageDto[] = [];
  user: UserDto = new UserDto('', '');

  constructor(private axiosService: AxiosService) {}


  goida(): void{
    this.axiosService.setAuthToken(null);
    location.reload();
  }

  ngOnInit(): void {
    this.axiosService.request(
        "GET",
        "/file",
        {}).then(
        (response) => {
            this.data = response.data;
            this.preloadImages();
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                this.axiosService.setAuthToken(null);
            } else {
                this.data = error.response.code;
            }
        }
    );

    this.axiosService.request(
      "GET",
      "/user",
      {}).then(
      (response) => {
        this.user.userName = response.data.username;
        this.user.roles = response.data.roles;
      });

    this.axiosService.request(
      "GET",
      "/folder",
      {}).then((response) => {
        this.packages = response.data;});
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

  async preloadImages() {
    for (const item of this.data) {
      if (item.fileName.endsWith('.jpg') || item.fileName.endsWith('.png') || item.fileName.endsWith('.jpeg')) {
        await this.loadImage(item);
      }
    }
  }

  async loadImage(item: UserFileDto): Promise<void> {
    try {
      const response = await axios.get(environment.apiUrl + "/file/" + item.fileName, {
        responseType: 'arraybuffer',
        headers: {
          'Authorization': `Bearer ${this.axiosService.getAuthToken()}`
        }
      });
      const blob = new Blob([response.data]);
      const blobUrl = URL.createObjectURL(blob);
      const imageElement = document.getElementById(item.fileName) as HTMLImageElement;
      imageElement.src = blobUrl;
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
      this.uploadFile()
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

  showFileInfo(item: any): void {
    const size: BigInt = BigInt(item.fileSize) / BigInt(1024);
    alert("Name: " + item.fileName + "\nSize: " +size+ " kb");
  }

  deletePackage(item: UserPackageDto) {
    this.axiosService.request(
      "DELETE",
      `/folder/${item.packageName}`,
      {}
    )
      .then((response) => {
        this.ngOnInit();
      })
  }

  downloadPackage(item: UserPackageDto) {
      console.log("DOWNLOAD PACKAGE!")
  }

  showPackageInfo(item: UserPackageDto) {
    const size: BigInt = BigInt(item.packageSize) / BigInt(1024);
    alert("Name: " + item.packageName + "\nSize: " +size+ " kb"  + "\nLink: " + item.packageLink);
  }
  showUserInfo = false;

  userInfoTimer: any;

  userInfo() {
    // Очищаем таймер, если он уже запущен
    clearTimeout(this.userInfoTimer);

    this.showUserInfo = true;
    // Устанавливаем таймер на скрытие информации о пользователе после 2 секунд
    this.userInfoTimer = setTimeout(() => {
      this.showUserInfo = false;
    }, 3000);
  }
}
