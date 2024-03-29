import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenTimeComponent } from './almacen-time/almacen-time.component';
import { BannerabcComponent } from './bannerabc/bannerabc.component';
import { BannerdelComponent } from './bannerdel/bannerdel.component';
import { BannerinsComponent } from './bannerins/bannerins.component';
import { BannerupdComponent } from './bannerupd/bannerupd.component';
import { ConsultaPedidosComponent } from './consulta-pedidos/consulta-pedidos.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MostradorTabletComponent } from './mostrador-tablet/mostrador-tablet.component';
import { MostradorTimeComponent } from './mostrador-time/mostrador-time.component';
import { PopupComponent } from './popup/popup.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { SurtidoresComponent } from './surtidores/surtidores.component';
import { SurtidoresupdComponent } from './surtidoresupd/surtidoresupd.component';
import { WebappComponent } from './webapp/webapp.component';


const routes: Routes = [
  {path: "almacenTime", component: AlmacenTimeComponent},
  {path: "mostradorTime", component: MostradorTimeComponent},
  {path: "popup", component: PopupComponent},
  {path: "webapp", component: WebappComponent},
  {path: "consultas", component: ConsultasComponent},
  {path: "consultaPedidos", component: ConsultaPedidosComponent},
  {path: "surtidores", component: SurtidoresComponent},
  {path: "bannerabc", component: BannerabcComponent},
  {path: "bannerupd", component: BannerupdComponent},
  {path: "bannerins", component: BannerinsComponent},
  {path: "bannerdel", component: BannerdelComponent},
  {path: "surtidoresupd", component: SurtidoresupdComponent},
  {path: "publicidad", component: PublicidadComponent},
  {path: "mostradorTablet", component: MostradorTabletComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
