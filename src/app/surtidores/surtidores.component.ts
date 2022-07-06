import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-surtidores',
  templateUrl: './surtidores.component.html',
  styleUrls: ['./surtidores.component.css']
})
export class SurtidoresComponent implements OnInit {

  surtidoresList: any [] = [];
  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this._servicios.wsGeneral("getSurtidores", {claUN: "ALT"})
    .subscribe(x => this.surtidoresList = x.map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;}));
  }

  surtidoresUpd(item: any) {
    let strItem = JSON.stringify(item);
    sessionStorage.setItem("surtidorItem",strItem);
    this._router.navigate(["/surtidoresupd"]);
  }

}
