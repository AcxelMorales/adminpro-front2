import { Pipe, PipeTransform } from '@angular/core';

import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): string {
    let url = `${URL_SERVICE}/img`;

    if (!img) {
      return `${url}/usuarios/xxx`;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        return `${url}/usuarios/${img}`;
      case 'medico':
        return `${url}/medicos/${img}`;
      case 'hospital':
        return `${url}/hospitales/${img}`;
      default: return `${url}/usuarios/xxx`;
    }

  }

}
