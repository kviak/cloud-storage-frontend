import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AxiosService} from "../axios.service";
import {UserFileDto} from "../dto/user-file-dto";
import axios from "axios";
import {environment} from "../enviroment/enviroment";

@Component({
  selector: 'app-share-file-page',
  templateUrl: './share-file-page.component.html',
  styleUrls: ['./share-file-page.component.css']
})
export class ShareFilePageComponent {

  fileInfo: UserFileDto = new UserFileDto('', '', BigInt(-1));
  constructor(private route: ActivatedRoute, private axiosService: AxiosService, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("Код: " + id);

      this.axiosService.request(
        "GET",
        "/file/info/"+id,
        {}).then(
        (response) => {
          this.fileInfo = response.data;
        }).catch(
        (error) => {
          // this.router.navigate(['not found']);
        }
      );
    });
  }

  downloadFile(){
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        const response = await axios.get(environment.apiUrl + "/file/share/" + id, {
          responseType: 'arraybuffer', // Указываем, что ожидаем бинарные данные (файл)
        });

        // Создаем объект Blob из полученных бинарных данных
        const blob = new Blob([response.data]);

        // Создаем объект URL для файла
        const url = window.URL.createObjectURL(blob);

        // Создаем ссылку для скачивания
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileInfo.fileName; // Имя файла при скачивании

        // Добавляем ссылку в DOM и кликаем по ней для скачивания
        document.body.appendChild(a);
        a.click();

        // Очищаем объект URL и удаляем ссылку
        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error('Произошла ошибка при скачивании файла:', error);
      }
    });
  }




}
