import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

  _surtidoresList: any[]= null;
  _showPopup: boolean = true;
  _mensaje = "Mensaje de pruebas";
  _folio: string = "";
  _cliente: string = "";
  _fecha: string = "";
  _slpName: string = "";
  _reloj: any = null;

  constructor(private _servicios: ServiciosService, private _router: Router) {}

  ngOnInit(): void {
        this._reloj = setInterval(this.showTime, 1000);
        this.showTime();
        this._folio = sessionStorage.getItem("folio");
        this._cliente = sessionStorage.getItem("socio");
        this._fecha = sessionStorage.getItem("fecha");
        this._slpName = sessionStorage.getItem("slpName");
        this._mensaje = "texto";
        this._showPopup = true;
        // setTimeout(() => this._showPopup = false, 3000)
        this.getSurtidores();
  }

  setSurtiendo(empID: string) {
    this._servicios.wsGeneral("setSurtiendo", {claUN: "ALT", folio: this._folio, socio: this._cliente, fecha: this._fecha, SlpName: this._slpName, empID: empID})
    .subscribe(x => {
      this._router.navigate(["/almacenTime"]);
    });
  }

  getSurtidores() {
    this._servicios.wsGeneral("getSurtidores", {claUN: "ALT"})
    .subscribe(x => {
      this._surtidoresList = x.map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;});
      console.log(this._surtidoresList);
  });
  }

  regresar() {
    this._router.navigate(["/almacenTime"]);
  }

  showTime() {
      var date = new Date();
      var h = date.getHours(); // 0 - 23
      var m = date.getMinutes(); // 0 - 59
      var s = date.getSeconds(); // 0 - 59
      var session = "AM";
  
      if (h == 0) {
        h = 12;
      }
  
      if (h > 12) {
        h = h - 12;
        session = "PM";
      }
  
      h = h < 10 ? 0 + h : h;
      m = m < 10 ? 0 + m : m;
      s = s < 10 ? 0 + s : s;
  
      var time = h + ":" + m + ":" + s + " " + session;
      document.getElementById("MyClockDisplay").innerText = time;
      document.getElementById("MyClockDisplay").textContent = time;
  
    }

    ngOnDestroy(): void {
      clearInterval(this._reloj);
    }
}
