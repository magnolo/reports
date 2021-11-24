import { Route } from '@angular/router';
import { LayoutComponent } from '@twentythree/layout/layout.component';
import { InitialDataResolver } from './app.resolver';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'
   { path: '', pathMatch: 'full', redirectTo: 'home' },

  // // Redirect signed in user to the '/example'
  // //
  // // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // // path. Below is another redirection for that path to redirect the user to the desired
  // // location. This is a small convenience to keep all main routes together here on this file.
  // {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

  // // Auth routes for guests
  // {
  //     path: '',
  //     canActivate: [NoAuthGuard],
  //     canActivateChild: [NoAuthGuard],
  //     component: LayoutComponent,
  //     data: {
  //         layout: 'empty'
  //     },
  //     children: [
  //         {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
  //         {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
  //         {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
  //         {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
  //         {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
  //     ]
  // },

  // // Auth routes for authenticated users
  // {
  //     path: '',
  //     canActivate: [AuthGuard],
  //     canActivateChild: [AuthGuard],
  //     component: LayoutComponent,
  //     data: {
  //         layout: 'empty'
  //     },
  //     children: [
  //         {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
  //         {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
  //     ]
  // },

  // Landing routes
  // {
  //     path: '',
  //     component: LayoutComponent,
  //     data: {
  //         layout: 'empty'
  //     },
  //     children   : [
  //         {path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule)},
  //     ]
  // },

  // Admin routes
  // {
  //     path       : '',
  //     // canActivate: [AuthGuard],
  //     // canActivateChild: [AuthGuard],
  //     component  : LayoutComponent,
  //     resolve    : {
  //         initialData: InitialDataResolver,
  //     },
  //     children   : [
  //         {path: 'example', loadChildren: () => import('./modules/admin/example/example.module').then(m => m.ExampleModule)},
  //     ]
  // }

  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // Dashboards

      {
        path: 'home',
        // data: {
        //   layout: 'classic',
        // },
        loadChildren: () =>
          import('./modules/cards/cards.module').then((m) => m.CardsModule),
      },
      {
        path: 'analytics',
        // data: {
        //   layout: 'classic',
        // },
        loadChildren: () =>
          import('./modules/admin/dashboards/analytics/analytics.module').then(
            (m) => m.AnalyticsModule
          ),
      },

      {
        path: 'details',
        // data: {
        //   layout: 'classic',
        // },
        loadChildren: () =>
          import('./modules/admin/dashboards/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
    ],
  },
];