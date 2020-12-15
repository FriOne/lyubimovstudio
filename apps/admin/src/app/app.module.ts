import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import ruLocale from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthModule } from './modules/auth/auth.module';

registerLocaleData(ruLocale, 'ru-RUS');

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
    NgbModule,
    AuthModule.forRoot(),
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
