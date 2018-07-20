import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: './frontend/frontend.module#FrontendModule'
}, {
  path: 'admin', loadChildren: './admin-portal/admin-portal.module#AdminPortalModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
