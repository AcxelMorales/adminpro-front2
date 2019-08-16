import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: ISettings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme   : 'default-dark'
  }

  constructor() {
    this.getLocalStorage();
  }

  saveLocalStorage(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  getLocalStorage(): void {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.applyTheme(this.settings.theme);
    } else {
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(theme: string): void {
    let url = `assets/css/colors/${theme}.css`;
    document.getElementById('theme').setAttribute('href', url);

    this.settings.theme    = theme;
    this.settings.themeUrl = url;

    this.saveLocalStorage();
  }

}

export interface ISettings {
  themeUrl: string;
  theme   : string;
}