import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-bannerupd',
  templateUrl: './bannerupd.component.html',
  styleUrls: ['./bannerupd.component.css']
})
export class BannerupdComponent implements OnInit {

  bannerID: string = "";
  texto: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this.bannerID = sessionStorage.getItem("bannerID");
    this.texto = sessionStorage.getItem("texto");

  }

  bannerGuardar() {
    this._servicios.wsGeneral("setBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"]));
  }

  bannerEliminar() {
    this._servicios.wsGeneral("delBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"]));
  }

  bannerRegresar() {
    this._router.navigate(["/bannerabc"]);
  }



}
