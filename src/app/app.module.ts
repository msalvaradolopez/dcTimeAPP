import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

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
import { BannerabcComponent } from './bannerabc/bannerabc.component';
import { BannerupdComponent } from './bannerupd/bannerupd.component';
import { BannerinsComponent } from './bannerins/bannerins.component';
import { BannerdelComponent } from './bannerdel/bannerdel.component';
import { SurtidoresupdComponent } from './surtidoresupd/surtidoresupd.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { MostradorTabletComponent } from './mostrador-tablet/mostrador-tablet.component';

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
    SurtidoresComponent,
    BannerabcComponent,
    BannerupdComponent,
    BannerinsComponent,
    BannerdelComponent,
    SurtidoresupdComponent,
    PublicidadComponent,
    MostradorTabletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
