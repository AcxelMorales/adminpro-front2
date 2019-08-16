import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/Usuario.model';
import { UserService } from 'src/app/services/user/user.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  usuarios: Usuario[] = [];
  since   : number = 0;
  total   : Number = 0;
  loading : boolean;

  constructor(
    public _userService       : UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this._modalUploadService.notification.subscribe(() => this.loadUsers());
  }

  public modal(id: string): void {
    this._modalUploadService.openModal('usuarios', id);
  }

  private loadUsers(): void {
    this.loading = true;

    this._userService.getUsers(this.since).subscribe((resp: any) => {
      this.total = resp.total;
      this.usuarios = resp.usuarios;
      this.loading = false;
    });
  }

  public pagination(since: number): void {
    let s = this.since + since;

    if (s >= this.total || s < 0) {
      return;
    }

    this.since += since;
    this.loadUsers();
  }

  public search(word: string): void {
    if (word.length <= 0) {
      this.loadUsers();
      return;
    }

    this._userService.searchUser(word).subscribe((users: Usuario[]) => this.usuarios = users);
  }

  public delete(user: Usuario): void {
    if (user._id === this._userService.usuario._id) {
      Swal.fire({
        title: 'Error',
        text : 'You cannot delete yourself',
        type : 'error'
      });

      return;
    }

    Swal.fire({
      title             : 'Are you sure?',
      text              : "You won't be able to revert this!",
      type              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(user._id).subscribe(resp => {
        this.loadUsers();

          Swal.fire(
            'Deleted!',
            'User successfully deleted',
            'success'
          )
        });
      }
    });
  }
  
  public save(user: Usuario): void {
    this._userService.updateUser(user).subscribe();
  }

}
