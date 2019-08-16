import { Injectable } from '@angular/core';

import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: File, tipo: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr      = new XMLHttpRequest();
  
      formData.append('img', file, file.name);
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      let url = `${URL_SERVICE}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

}
