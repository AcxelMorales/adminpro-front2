import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { UploadService } from 'src/app/services/upload/upload.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadFile: File;
  imageTemp : any;

  constructor(
    public _uploadService     : UploadService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
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

  public upload(): void {
    this._uploadService.uploadFile(this.uploadFile, this._modalUploadService.type, this._modalUploadService.id)
      .then(resp => {
        this._modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => console.log(err));
  }

  public closeModal(): void {
    this.uploadFile = null;
    this.imageTemp  = null;

    this._modalUploadService.hideModal();
  }

}
