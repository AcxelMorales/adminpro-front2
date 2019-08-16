import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UserService } from 'src/app/services/user/user.service';

import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebarService: SidebarService,
    public _userService   : UserService
  ) { }

  ngOnInit(): void {
    this.usuario = this._userService.usuario;
  }

}
