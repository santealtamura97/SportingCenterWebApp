import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {AuthGuardService} from "./service/auth-guard.service";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {UserGuardService} from "./service/user-guard.service";


const routes: Routes =[
  {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
    }
  ]
}
  , {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
        canLoad: [AuthGuardService]
      }
    ],

  }
  , {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule',
        canLoad: [AuthGuardService]
      }
    ],
    canActivate: [AuthGuardService]
  },  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
