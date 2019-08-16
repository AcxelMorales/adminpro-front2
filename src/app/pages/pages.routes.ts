import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'settings',  component: SettingsComponent,  data: { title: 'Account Settings' } },
            { path: 'profile',   component: ProfileComponent,   data: { title: 'User Profile' } },
            { path: 'users',     component: UserComponent,      data: { title: 'User Maintenance' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(routes);