import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.usuario = this._userService.usuario;
  }

}
