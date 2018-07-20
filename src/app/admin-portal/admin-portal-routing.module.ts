import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPortalComponent } from './admin-portal.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthenticationGuard } from './core/authentication.guard';
import { DefaultLayoutComponent } from './containers';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginGuard]
}, {
  path: '',
  component: DefaultLayoutComponent,
  children: [{
    path: '',
    component: AdminHomeComponent,
    canActivate: [AuthenticationGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
