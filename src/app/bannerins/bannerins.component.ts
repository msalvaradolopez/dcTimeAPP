import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-bannerins',
  templateUrl: './bannerins.component.html',
  styleUrls: ['./bannerins.component.css']
})
export class BannerinsComponent implements OnInit {

  bannerID: string = "";
  texto: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
  }

  bannerGuardar() {
    this._servicios.wsGeneral("insBanner", {claUN: "ALT", bannerID: this.bannerID, texto: this.texto})
    .subscribe(resp => this._router.navigate(["/bannerabc"]));
  }

  bannerRegresar() {
    this._router.navigate(["/bannerabc"]);
  }
}