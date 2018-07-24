import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { AdminPortalRoutingModule } from './admin-portal-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { AdminPortalComponent } from './admin-portal.component';
import { AuthenticationService } from './core/authentication.service';
import { AuthenticationGuard } from './core/authentication.guard';
import { GlobalErrorHandler } from './core/global-error-handler';
import { HomeComponent } from './admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { DefaultLayoutComponent } from './containers';


// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoginGuard } from './login/login.guard';
import { UsersModule } from './users/users.module';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPortalRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    UsersModule
  ],
  providers: [AuthenticationService, AuthenticationGuard, GlobalErrorHandler, LoginGuard],
  declarations: [LoginComponent, AdminPortalComponent, HomeComponent, AdminHeaderComponent, ...APP_CONTAINERS]
})
export class AdminPortalModule { }
