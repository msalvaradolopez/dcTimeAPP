import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-bannerabc',
  templateUrl: './bannerabc.component.html',
  styleUrls: ['./bannerabc.component.css']
})
export class BannerabcComponent implements OnInit {

  bannerList: any [] = [];
  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this._servicios.wsGeneral("getBanners", {claUN: "ALT"})
    .subscribe(x => this.bannerList = x);
  }

  bannerUpd (item: any) {
    sessionStorage.setItem("bannerID", item.bannerID);
    sessionStorage.setItem("texto", item.texto);
    this._router.navigate(["/bannerupd"]);
  }

  bannerIns () {
    this._router.navigate(["/bannerins"]);
  }

}
