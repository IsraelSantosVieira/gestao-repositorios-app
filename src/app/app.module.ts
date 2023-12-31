import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {appRoutes} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {ConfigModule} from 'config/app';
import {appConfig} from './core/config/app.config';
import { LogService } from 'app/core/services/debug/log.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    ConfigModule.forRoot(appConfig),

    CoreModule,
    LayoutModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  providers: [LogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
