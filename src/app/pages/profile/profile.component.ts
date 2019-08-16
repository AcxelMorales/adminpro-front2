import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/Usuario.model';
import { UserService } from 'src/app/services/user/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario   : Usuario;
  uploadFile: File;
  imageTemp : any;

  constructor(public _userService: UserService) {
    this.usuario = this._userService.usuario;
  }

  ngOnInit(): void {
  }

  public saveProfile(usuario: Usuario): void {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email  = usuario.email;
    }

    this._userService.updateUser(this.usuario).subscribe();
  }

  public imageSelect(file: File): void {
    if (!file) {
      this.uploadFile = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire({
        type : 'error',
        title: 'Hey !!!',
        text : 'El archivo seleccionado no es una imágen'
      });

      this.uploadFile = null;

      return;
    }

    this.uploadFile = file;

    let reader     = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);
    
    reader.onloadend = () => this.imageTemp = reader.result;
  }

  public changeImage(): void {
    this._userService.changeImage(this.uploadFile, this.usuario._id);
  }

}
