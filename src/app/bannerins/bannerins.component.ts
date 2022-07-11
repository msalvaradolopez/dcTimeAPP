import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bannerins',
  templateUrl: './bannerins.component.html',
  styleUrls: ['./bannerins.component.css']
})
export class BannerinsComponent implements OnInit {

  bannerID: string = "";
  texto: string = "";

  constructor(private _toastr: ToastrService, private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
  }

  bannerGuardar() {
    this._servicios.wsGeneral("insBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"])
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar banner.")
    ,() => this._toastr.success("Banner guardado."));
  }

  bannerRegresar() {
    this._router.navigate(["/bannerabc"]);
  }
}