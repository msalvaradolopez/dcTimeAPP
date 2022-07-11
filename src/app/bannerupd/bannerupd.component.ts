import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bannerupd',
  templateUrl: './bannerupd.component.html',
  styleUrls: ['./bannerupd.component.css']
})
export class BannerupdComponent implements OnInit {

  bannerID: string = "";
  texto: string = "";

  constructor(private _toastr: ToastrService, private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this.bannerID = sessionStorage.getItem("bannerID");
    this.texto = sessionStorage.getItem("texto");

  }

  bannerGuardar() {
    this._servicios.wsGeneral("setBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"])
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar banner.")
    ,() => this._toastr.success("Banner guardado."));
  }

  bannerEliminar() {
    this._servicios.wsGeneral("delBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"])
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Eliminar banner.")
    ,() => this._toastr.success("Banner eliminado."));
  }

  bannerRegresar() {
    this._router.navigate(["/bannerabc"]);
  }



}
