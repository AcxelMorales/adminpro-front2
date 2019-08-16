import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../services/user/user.service';
import { Usuario } from '../models/Usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) {
    this.form = new FormGroup({
      nombre     : new FormControl(null, Validators.required),
      email      : new FormControl(null, [Validators.required, Validators.email]),
      password   : new FormControl(null, Validators.required),
      password2  : new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators:  this.equals('password', 'password2')});
  }

  ngOnInit(): void {
    init_plugins();
  }

  private equals(password1: string, password2: string): any {
    return (group: FormGroup) => {
      let p1 = group.controls[password1].value;
      let p2 = group.controls[password2].value;

      if (p1 === p2) {
        return null;
      }

      return { equals: true }
    };
  }

  public toRegisterUser(): void {
    if (this.form.invalid) return;

    if (!this.form.value.condiciones) {
      Swal.fire({
        type : 'warning',
        title: 'Hey !!!',
        text : 'You must accept the conditions'
      });

      return;
    }

    let user = new Usuario(this.form.value.nombre, this.form.value.email, this.form.value.password);
    this._userService.signUp(user).subscribe(() => this.router.navigate(['/sign-in']));
  }

}
