import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';

import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        SettingsComponent,
        ProfileComponent,
        UserComponent,
        ModalUploadComponent,
    ],
    exports: [
        DashboardComponent,
        PagesComponent,
        SettingsComponent,
        ProfileComponent,
        UserComponent,
        ModalUploadComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        FormsModule
    ]
})
export class PagesModule { }