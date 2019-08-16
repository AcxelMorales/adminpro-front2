import { Component } from '@angular/core';

import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public _settingsService: SettingsService) { }

}
