import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mostrador-tablet',
  templateUrl: './mostrador-tablet.component.html',
  styleUrls: ['./mostrador-tablet.component.css']
})
export class MostradorTabletComponent implements OnInit {

  porSurtirList: any[] = null;
  surtiendoList: any[] = null;
  surtiendoListAux : any[] = null;
  entregadoList: any[] = null;
  entregadoListAux: any[] = null;
  cerradoList: any[] = null;

  classBlink: string = "card";


  constructor(private _servicios: ServiciosService, private _router: Router, private _render: Renderer2, private _toastr: ToastrService) {}

  ngOnInit(): void {
    this._servicios.menuAccion(false);

    setInterval(() => this.getPedidos(), 10000);
    setInterval(() => {
      if (this.entregadoList != null && this.entregadoList.length > 0 )
        this.entregadoList.forEach( item => this.tiempoEntregado(item));
    } , 1000);
    this.getPedidos();
  }

  getPedidos() {
    this._servicios.wsGeneral("getPedidos", {claUN: "ALT"})
    .subscribe(x => {
      this.porSurtirList = x.filter(datos => datos.Estatus == "1")
                            .sort((a, b) => (a.Fecha > b.Fecha  ? 1 : -1))
                            .map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      this.surtiendoListAux = x.filter(datos => datos.Estatus == "2")
                            .map(renglon => {
                              renglon.class = "card-surtiendo"; 
                              renglon.Foto == null ? renglon.Foto = 'assets/img/worker01.jpg' : renglon.Foto;
                              renglon.tiempo = "        ";
                              return renglon;
                            })
                            .sort((a, b) => ( b.FechaSurtiendo > a.FechaSurtiendo  ? 1 : -1))
      this.entregadoListAux = x.filter(datos => datos.Estatus == "3")
                            .sort((a, b) => (b.FechaEntregado > a.FechaEntregado ? 1 : -1))
                            .map(datos => {
                              datos.class = "card-surtiendo"; 
                              datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;
                              datos.tiempo = "        ";});
      this.cerradoList = x.filter(datos => datos.Estatus == "4")
                          .sort((a, b) => (b.FechaCerrado > a.FechaCerrado ? 1 : -1))
                          .map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta general.")
      , () => {  
        // SURTIENDO - COLUMNA
        if (this.surtiendoList == null || this.surtiendoList.length == 0)
          this.surtiendoList = this.surtiendoListAux;
  
        let itemsNuevos01 = this.surtiendoListAux.filter(o1 => !this.surtiendoList.some(o2 => o2.Folio == o1.Folio));
        let itemsCerrados01 = this.surtiendoList.filter(o1 => !this.surtiendoListAux.some(o2 => o2.Folio == o1.Folio));
      
        if(itemsNuevos01.length > 0 || itemsCerrados01.length > 0)
          this.surtiendoList = this.surtiendoListAux;

        // ENTREGADO - COLUMNA
        if (this.entregadoList == null || this.entregadoList.length == 0)
        this.entregadoList = this.entregadoListAux;

        let itemsNuevos02 = this.entregadoListAux.filter(o1 => !this.entregadoList.some(o2 => o2.Folio == o1.Folio));
        let itemsCerrados02 = this.entregadoList.filter(o1 => !this.entregadoListAux.some(o2 => o2.Folio == o1.Folio));
      
        if(itemsNuevos02.length > 0 || itemsCerrados02.length > 0)
          this.entregadoList = this.entregadoListAux;

      });
  }

  entregadoClick(item: any) {
    item.class = "card-surtiendo blink";
    setTimeout(() => {
      item.class = "card-surtiendo";
      this.setCerrado(item);
    }, 2000);
  }

  setEntregado(item: any) {
    this._servicios.wsGeneral("setEntregado", {claUN: "ALT", folio: item.Folio, empID: item.empID})
    .subscribe(x => {}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Act Entrega.")
      , () => this.getPedidos());
  }

  setCerrado(item: any) {
    this._servicios.wsGeneral("setCerrado", {claUN: "ALT", folio: item.Folio, empID: item.empID})
    .subscribe(x => {}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Act Cerrado.")
      , () => this.getPedidos());
  }

  tiempoEntregado(item: any) {
    var fechaHoraAux = item.FechaEntregado.split(" ");
    var soloFechaAux = fechaHoraAux[0].split("-");
    var nuevaFechaAux = new Date(soloFechaAux[2], soloFechaAux[1], soloFechaAux[0], fechaHoraAux[1]);

    var defaults = {}
      , one_second = 1000
      , one_minute = one_second * 60
      , one_hour = one_minute * 60
      , one_day = one_hour * 24
      , startDate = new Date(item.FechaEntregado);

    var now = new Date()
        , elapsed = now.getTime()  - startDate.getTime() 
        , parts = [];

    parts[0] = '' + Math.floor( elapsed / one_hour );
    parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
    parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

    parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
    parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

    item.tiempo = parts.join(':');
  
  }


}
