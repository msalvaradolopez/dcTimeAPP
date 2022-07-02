import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenTimeComponent } from './almacen-time/almacen-time.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MostradorTimeComponent } from './mostrador-time/mostrador-time.component';
import { PopupComponent } from './popup/popup.component';
import { WebappComponent } from './webapp/webapp.component';


const routes: Routes = [
  {path: "almacenTime", component: AlmacenTimeComponent},
  {path: "mostradorTime", component: MostradorTimeComponent},
  {path: "popup", component: PopupComponent},
  {path: "webapp", component: WebappComponent},
  {path: "consultas", component: ConsultasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
