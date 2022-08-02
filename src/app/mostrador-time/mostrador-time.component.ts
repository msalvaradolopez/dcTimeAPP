import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-mostrador-time',
  templateUrl: './mostrador-time.component.html',
  styleUrls: ['./mostrador-time.component.css']
})
export class MostradorTimeComponent implements OnInit, AfterViewInit {
  @ViewChild('videoRef',  { static: true, read: ElementRef }) videoRef: ElementRef;
  @ViewChild("mostrador", { static: true, read: ElementRef }) mostrador: ElementRef

  porSurtirList: any[] = [];

  surtiendoList: any[] = [];
  surtiendoListAux : any[] = null;

  entregadoList: any[] = null;
  entregadoListAux: any[] = null;

  nuevosItems: any[] = null;
  classBlink: string = "card";
  _video: string = "assets/video/Publicidad.mp4";
  _archivo: any = null;

  elem: any;

  constructor(private _servicios: ServiciosService, private _router: Router, private _cd: ChangeDetectorRef, private _render: Renderer2) {}

  globalInstance: any;    

  ngOnInit(): void {
    this._servicios.menuAccion(false);

    setTimeout(() => {
      this.mostrador.nativeElement.click();
    }, 5000);

    setInterval(() => this.getPedidos(), 10000);
    setInterval(() => {
      if (this.surtiendoList != null || this.surtiendoList.length > 0 )
        this.surtiendoList.forEach( item => this.tiempoCorriendo(item));

      if (this.entregadoList != null && this.entregadoList.length > 0 )
        this.entregadoList.forEach( item => this.tiempoEntregado(item));
    } , 1000);

    this.getPedidos();

    /*
    this._servicios.downloadFile("getPublicidad", {claUN: "ALT"})
    .subscribe(resp => {
          let _this = this;
        // Cogemos el primer archivo
        var 
          // Creamos la instancia de FileReader
          reader = new FileReader(),
          urlBase64;
        // Os esperábais algo más complicado?
        _this._archivo = resp;
        reader.onload = function () {
          urlBase64 = reader.result;
          // _this.validaCaptura.IMAGEN = urlBase64;
          _this._video = urlBase64;
          // Hacer lo que se quiera con la url
          _this.videoRef.nativeElement.src = _this._video;
          _this.videoRef.nativeElement.load;
          _this.videoRef.nativeElement.play();
        }
        reader.readAsDataURL(_this._archivo);
        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
    }
    , error => {}
    , () => {
    });
    */

    // this.fileToBase64 ();
    // this.videoRef.nativeElement.mute = true;
    this.videoRef.nativeElement.play();
  }

  getPedidos() {
    this._servicios.wsGeneral("getPedidos", {claUN: "ALT"})
    .subscribe(x => {
      this.porSurtirList = x.filter(datos => datos.Estatus == "1")
                              .sort((a, b) => (a.Fecha > b.Fecha  ? 1 : -1))
                              .map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      this.surtiendoListAux = x.filter(datos => datos.Estatus == "2")
                              .map(renglon => {renglon.class = "card-mostrador"; renglon.tiempo = "        "; return renglon;})
                              .sort((a, b) => ( b.FechaSurtiendo > a.FechaSurtiendo  ? 1 : -1))
                              .map(datos => {
                                datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; 
                                datos.FolioCorto = datos.Folio.substring(6, 14);
                                return  datos;});
      this.entregadoListAux = x.filter(datos => datos.Estatus == "3")
                              .sort((a, b) => (b.FechaEntregado > a.FechaEntregado ? 1 : -1))
                              .map(datos => {
                                datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; 
                                datos.FolioCorto = datos.Folio.substring(6, 14);
                                datos.tiempo = "        ";
                                return  datos;});
    }, error => {

    }, () => {
      // SURTIENDO - COLUMNA
      if (this.surtiendoList == null || this.surtiendoList.length == 0)
      this.surtiendoList = this.surtiendoListAux;

    let itemsNuevos01 = this.surtiendoListAux.filter(o1 => !this.surtiendoList.some(o2 => o2.Folio == o1.Folio));
    let itemsCerrados01 = this.surtiendoList.filter(o1 => !this.surtiendoListAux.some(o2 => o2.Folio == o1.Folio));
  
    if(itemsNuevos01.length > 0 || itemsCerrados01.length > 0) {
      this.surtiendoList = this.surtiendoListAux;
      if(itemsNuevos01.length > 0){
        let items: any;
        items = this.surtiendoList.filter(o1 => itemsNuevos01.some(o2 => o2.Folio == o1.Folio));
        items.forEach(item => {
          item.class = "card-mostrador blink";
          setTimeout(() => {
            item.class = "card-mostrador";
        }, 2000);
        });
      }
        
    }
      

    // ENTREGADO - COLUMNA
    if (this.entregadoList == null || this.entregadoList.length == 0)
    this.entregadoList = this.entregadoListAux;

    let itemsNuevos02 = this.entregadoListAux.filter(o1 => !this.entregadoList.some(o2 => o2.Folio == o1.Folio));
    let itemsCerrados02 = this.entregadoList.filter(o1 => !this.entregadoListAux.some(o2 => o2.Folio == o1.Folio));
  
    if(itemsNuevos02.length > 0 || itemsCerrados02.length > 0)
      this.entregadoList = this.entregadoListAux;
      if(itemsNuevos02.length > 0){
        let items: any;
        items = this.entregadoList.filter(o1 => itemsNuevos02.some(o2 => o2.Folio == o1.Folio));
        items.forEach(item => {
          item.class = "card-mostrador blink";
          setTimeout(() => {
            item.class = "card-mostrador";
        }, 2000);
        });
      }


  });
  }

  nuevoItem() {

    let items: any;
    if (this.nuevosItems) {
      items = this.surtiendoList.filter(o1 => !this.nuevosItems.some(o2 => o2.Folio == o1.Folio));

      items.forEach(item => {
        item.class = "card-mostrador blink";
        setTimeout(() => {
          item.class = "card-mostrador";
      }, 2000);
      });
    }
      
    this.nuevosItems = this.surtiendoList;
  }

  tiempoCorriendo(item: any) {
    // console.log("item :", item);

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

    // console.log("now :", now);
    parts[0] = '' + Math.floor( elapsed / one_hour );
    parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
    parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

    parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
    parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

    item.tiempo = parts.join(':');
  
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

  ngAfterViewInit(): void {
    this.globalInstance = this._render.listen(this.mostrador.nativeElement, 'click', () => {
      if(this.mostrador.nativeElement.requestFullScreen) {
        this.mostrador.nativeElement.requestFullScreen();
      } else if(this.mostrador.nativeElement.mozRequestFullScreen) {
        this.mostrador.nativeElement.mozRequestFullScreen();
      } else if(this.mostrador.nativeElement.webkitRequestFullScreen) {
        this.mostrador.nativeElement.webkitRequestFullScreen();
      }
  });
  }

  fileToBase64 () {
    let _this = this;
        // Cogemos el primer archivo
        var 
          // Creamos la instancia de FileReader
          reader = new FileReader(),
          urlBase64;
        // Os esperábais algo más complicado?
        _this._archivo = "assets/video/Publicidad.MP4";
        reader.onload = function () {
          urlBase64 = reader.result;
          // _this.validaCaptura.IMAGEN = urlBase64;
          _this._video = urlBase64;
          // Hacer lo que se quiera con la url
          _this.videoRef.nativeElement.src = _this._video;
          _this.videoRef.nativeElement.load;
          _this.videoRef.nativeElement.play();
        }
        reader.readAsDataURL(_this._archivo);
        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
  }

}
