import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/user/user.service';
import { Usuario } from '../models/Usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email     : string;
  recuerdame: boolean = false;
  auth2     : any;

  constructor(
    public router      : Router,
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  private googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id   : '699916597734-gvfrn5tv6mndm15ckk8mr9je7q29dcs8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scoope      : 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  private attachSignIn(element: any): void {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.signInGoogle(token).subscribe(() => window.location.href = '#/');
    });
  }

  public signIn(form: NgForm): void {
    if (form.invalid) return;

    let user: Usuario = new Usuario(null, form.value.email, form.value.password);
    this._userService.signIn(user, form.value.recuerdame).subscribe(() => this.router.navigate(['/']));
  }

}
