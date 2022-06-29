import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-almacen-time',
  templateUrl: './almacen-time.component.html',
  styleUrls: ['./almacen-time.component.css']
})
export class AlmacenTimeComponent implements OnInit {

  porSurtirList: any[] = null;
  surtiendoList: any[] = null;
  surtiendoListAux : any[] = null;
  cerradoList: any[] = null;

  classBlink: string = "card";

  constructor(private _servicios: ServiciosService, private _router: Router) {}

  ngOnInit(): void {
    setInterval(() => this.getPedidos(), 10000);
    setInterval(() => {
      if (this.surtiendoList != null && this.surtiendoList.length > 0 )
        this.surtiendoList.forEach( item => this.tiempoCorriendo(item));
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
      this.cerradoList = x.filter(datos => datos.Estatus == "3")
                          .sort((a, b) => (b.FechaCerrado > a.FechaCerrado ? 1 : -1))
                          .map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      }, error => {

      }, () => {
        
        if (this.surtiendoList == null || this.surtiendoList.length == 0)
          this.surtiendoList = this.surtiendoListAux;
  
        let itemsNuevos = this.surtiendoListAux.filter(o1 => !this.surtiendoList.some(o2 => o2.Folio == o1.Folio));
        let itemsCerrados = this.surtiendoList.filter(o1 => !this.surtiendoListAux.some(o2 => o2.Folio == o1.Folio));
      
        if(itemsNuevos.length > 0 || itemsCerrados.length > 0)
          this.surtiendoList = this.surtiendoListAux;
  

      });
  }

  popUp(item: any) {
    sessionStorage.setItem("folio", item.Folio);
    sessionStorage.setItem("socio", item.Socio);
    sessionStorage.setItem("fecha", item.Fecha);
    this._router.navigate(["/popup"]);
  }

  surtiendoClick(item: any) {
    item.class = "card-surtiendo blink";
    setTimeout(() => {
      item.class = "card-surtiendo";
      this.setCerrado(item);
    }, 2000);
  }

  setCerrado(item: any) {
    this._servicios.wsGeneral("setCerrado", {claUN: "ALT", folio: item.Folio, empID: item.empID})
    .subscribe(x => this.getPedidos());
  }
  
  tiempoCorriendo(item: any) {
    console.log("FechaSurtiendo : ", item.FechaSurtiendo);
    var fechaHoraAux = item.FechaSurtiendo.split(" ");
    var soloFechaAux = fechaHoraAux[0].split("-");
    var nuevaFechaAux = new Date(soloFechaAux[2], soloFechaAux[1], soloFechaAux[0], fechaHoraAux[1]);

    var defaults = {}
      , one_second = 1000
      , one_minute = one_second * 60
      , one_hour = one_minute * 60
      , one_day = one_hour * 24
      , startDate = new Date(item.FechaSurtiendo);

    var now = new Date()
        , elapsed = now.getTime()  - startDate.getTime() 
        , parts = [];

    console.log("now : ", now);

    parts[0] = '' + Math.floor( elapsed / one_hour );
    parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
    parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

    parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
    parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

    item.tiempo = parts.join(':');
  
  }
}
