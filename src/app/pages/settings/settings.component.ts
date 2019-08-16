import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {

  constructor(public _settingsService: SettingsService) { }

  ngOnInit(): void {
    this.setCheck();
  }

  public changeColor(color: string, link: any): void {
    this.applyCheck(link);
    this._settingsService.applyTheme(color);
  }

  private applyCheck(link: any): void {
    const selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  private setCheck(): void {
    const selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === this._settingsService.settings.theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
