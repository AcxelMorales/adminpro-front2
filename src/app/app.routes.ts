import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/sign-in.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { SignUpComponent } from './auth/sign-up.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**',      component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });