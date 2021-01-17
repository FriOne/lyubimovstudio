import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ruLocale from '@angular/common/locales/ru';
import { MetrikaModule } from 'ng-yandex-metrika';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(ruLocale, 'ru-RUS');

const additionalModules = [];

if (environment.yandexMetrikaId) {
  additionalModules.push(
    MetrikaModule.forRoot({
      id: environment.yandexMetrikaId,
      webvisor: true,
    }),
  );
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...additionalModules,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru-RUS',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
