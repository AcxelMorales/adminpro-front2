import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  type: string;
  id  : string;
  none: string = 'oculto';

  public notification = new EventEmitter<any>();

  constructor() { }

  hideModal(): void {
    this.none = 'oculto';
    this.type = null;
    this.id   = null;
  }

  openModal(type: string, id: string): void {
    this.none = '';
    this.id   = id;
    this.type = type;
  }

}
