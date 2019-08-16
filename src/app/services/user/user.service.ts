import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Usuario } from '../../models/Usuario.model';
import { URL_SERVICE } from '../../config/config';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuario: Usuario;
  token  : string;

  constructor(
    public http          : HttpClient, 
    public router        : Router,
    public _uploadService: UploadService
  ) {
    this.loadStorage();
  }

  // ==========================================================
  //  Revisa que el usuario este logeado para el uso del Guard
  // ==========================================================
  public isLoged(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  // ==========================================================
  //  Carga el LS en las propiedades de la clase
  // ==========================================================
  private loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token   = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token   = '';
      this.usuario = null;
    }
  }

  // ==========================================================
  //  Guarda las propiedades en el LS
  // ==========================================================
  private saveStorage(id: string, token: string, user: Usuario): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.usuario = user;
    this.token   = token;
  }

  // ==========================================================
  //  LogOut de la app, y limpia el LS
  // ==========================================================
  logOut(): void {
    this.token   = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/sign-in']);
  }
  
  // ==========================================================
  //  Creamos un usuario en la DB y mostramos resultados
  // ==========================================================
  signUp(user: Usuario): Observable<any> {
    let url = URL_SERVICE + '/usuario';

    return this.http.post(url, user).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Usuario creado',
          text : user.email,
          type : 'success'
        });

        return resp.usuario;
      })
    ).pipe(
      catchError(err => of([
        Swal.fire({
          title: err.error.message,
          text : err.error.errors.errors.email.message,
          type : 'error'
        })
      ]))
    );
  }

  // ==========================================================
  //  Obtenemos los usuarios de forma paginada
  // ==========================================================
  getUsers(since: number = 0): Observable<Usuario[]> {
    let url = `${URL_SERVICE}/usuario?since=${since}`;
    return this.http.get<Usuario[]>(url);
  }

  // ==========================================================
  //   Busqueda de usuarios
  // ==========================================================
  searchUser(word: string): Observable<Usuario[]> {
    let url = `${URL_SERVICE}/search/collection/usuarios/${word}`;
    return this.http.get<Usuario[]>(url).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  // ==========================================================
  //  Actualizamos un usuario
  // ==========================================================
  updateUser(usuario: Usuario): Observable<any> {
    let url = `${URL_SERVICE}/usuario/${usuario._id}?token=${this.token}`;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.saveStorage(resp.usuario._id, this.token, resp.usuario);
        }


        Swal.fire({
          position         : 'top-end',
          type             : 'success',
          title            : `${usuario.nombre} user updated successfully`,
          showConfirmButton: false,
          timer            : 1500
        });

        return true;
      })
    ).pipe(
      catchError(err => of([
        Swal.fire({
          title: 'Error',
          text : err.error.errors.message.substr(0, 19),
          type : 'error'
        })
      ]))
    );
  }

  // ==========================================================
  //  Borrar usuario
  // ==========================================================
  deleteUser(_id: string): Observable<any> {
    let url = `${URL_SERVICE}/usuario/${_id}?token=${this.token}`;
    return this.http.delete(url);
  }

  // ==========================================================
  //  Cambiar la imagen del usuario
  // ==========================================================
  changeImage(file: File, id: string): void {
    this._uploadService.uploadFile(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;

        Swal.fire({
          position         : 'top-end',
          type             : 'success',
          title            : 'Image updated successfully',
          showConfirmButton: false,
          timer            : 1500
        });

        this.saveStorage(id, this.token, this.usuario);
      })
      .catch(err => console.error(err));
  }

  // ==========================================================
  //  Login de la app
  // ==========================================================
  signIn(user: Usuario, recuerdame: boolean = false): Observable<any> {
    if (recuerdame) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL_SERVICE + '/login', user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario);        
        return true;
      })
    ).pipe(
      catchError(err => of([
        Swal.fire({
          title: 'Error',
          text : err.error.message,
          type : 'error'
        })
      ]))
    );
  }
  
  // ==========================================================
  //  Login y registro de la app mediante la API de Google
  // ==========================================================
  signInGoogle(token: string): Observable<boolean> {
    let url = URL_SERVICE + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

}
