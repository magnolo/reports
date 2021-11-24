import { FuseMockApiModule } from './../../../../libs/fuse/src/lib/lib/mock-api/mock-api.module';
import { CoreModule } from '@twentythree/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseModule } from '@twentythree/fuse';
import { LayoutModule } from '@twentythree/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { appConfig } from '@twentythree/core/config/app.config';
import { FuseConfigModule } from '@twentythree/fuse/services/config';
import { appRoutes } from './app.routing';
import { mockApiServices } from './mock-api';

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [AppComponent],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, routerConfig),

     // Fuse, FuseConfig & FuseMockAPI
     FuseModule,
     FuseConfigModule.forRoot(appConfig),
     FuseMockApiModule.forRoot(mockApiServices),

     // Core module of your application
     CoreModule,

     // Layout module of your application
     LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
