import { Routes } from '@angular/router';
import {NoAuthGuard} from "./core/auth/guards/noAuth.guard";
import {AuthGuard} from "./core/auth/guards/auth.guard";
import {LayoutComponent} from "./layout/layout.component";

export const appRoutes: Routes = [

  { path: '', pathMatch: "full", redirectTo: "home" },

  // Redirect signed in user to the landing page
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'landing-page'},

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
      {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
      {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
      {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
      {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
      {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    ]
  },

  // Landing routes
  {
    path: '',
    component  : LayoutComponent,
    data: {
      layout: 'empty'
    },
    children   : [
      {path: 'landing-page', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
    ]
  },

  // Admin routes
  {
    path       : '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component  : LayoutComponent,
    children   : [
      {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
      {path: '**', redirectTo: '404-not-found'}
    ]
  }

];
