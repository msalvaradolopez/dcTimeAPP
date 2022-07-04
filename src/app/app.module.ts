import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlmacenTimeComponent } from './almacen-time/almacen-time.component';
import { MostradorTimeComponent } from './mostrador-time/mostrador-time.component';
import { PopupComponent } from './popup/popup.component';
import { WebappComponent } from './webapp/webapp.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './header/header.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { SurtidoresComponent } from './surtidores/surtidores.component';

@NgModule({
  declarations: [
    AppComponent,
    AlmacenTimeComponent,
    MostradorTimeComponent,
    PopupComponent,
    WebappComponent,
    BannerComponent,
    HeaderComponent,
    ConsultasComponent,
    SurtidoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
