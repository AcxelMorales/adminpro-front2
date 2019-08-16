import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title  : 'Principal',
      icon   : 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
      ]
    },
    {
      title  : 'Maintenance',
      icon   : 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users',     url: '/users' },
        { title: 'Doctors',   url: '/doctors' },
        { title: 'Hospitals', url: '/hospitals' },
      ]
    }
  ];

  constructor() { }

}
