import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-almacen-time',
  templateUrl: './almacen-time.component.html',
  styleUrls: ['./almacen-time.component.css']
})
export class AlmacenTimeComponent implements OnInit, AfterViewInit {
  @ViewChild("almacenRef", { static: true, read: ElementRef }) almacenRef: ElementRef

  porSurtirList: any[] = null;
  surtiendoList: any[] = null;
  entregadoList: any[] = null;
  surtiendoListAux : any[] = null;
  cerradoList: any[] = null;

  classBlink: string = "card";

  constructor(private _servicios: ServiciosService, private _router: Router, private _render: Renderer2, private _toastr: ToastrService) {}

  globalInstance: any;  

  ngOnInit(): void {
    this._servicios.menuAccion(false);

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
      this.entregadoList = x.filter(datos => datos.Estatus == "3")
                            .sort((a, b) => (b.FechaEntregado > a.FechaEntregado ? 1 : -1))
                            .map(datos => {
                              datos.class = "card-surtiendo"; 
                              datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      this.cerradoList = x.filter(datos => datos.Estatus == "4")
                          .sort((a, b) => (b.FechaCerrado > a.FechaCerrado ? 1 : -1))
                          .map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta general.")
      , () => {  
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
      this.setEntregado(item);
    }, 2000);
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
  
  tiempoCorriendo(item: any) {
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

    parts[0] = '' + Math.floor( elapsed / one_hour );
    parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
    parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

    parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
    parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

    item.tiempo = parts.join(':');
  
  }

  ngAfterViewInit(): void {
    /*
    this.globalInstance = this._render.listen(this.almacenRef.nativeElement, 'click', () => {
      if(this.almacenRef.nativeElement.requestFullScreen) {
        this.almacenRef.nativeElement.requestFullScreen();
      } else if(this.almacenRef.nativeElement.mozRequestFullScreen) {
        this.almacenRef.nativeElement.mozRequestFullScreen();
      } else if(this.almacenRef.nativeElement.webkitRequestFullScreen) {
        this.almacenRef.nativeElement.webkitRequestFullScreen();
      }
  });
  */
  }
}
