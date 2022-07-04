import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-surtidores',
  templateUrl: './surtidores.component.html',
  styleUrls: ['./surtidores.component.css']
})
export class SurtidoresComponent implements OnInit {

  surtidoresList: any [] = [];
  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {
    this._servicios.wsGeneral("getSurtidores", {claUN: "ALT"})
    .subscribe(x => this.surtidoresList = x.map(datos => {datos.Foto == null ? datos.Foto = 'assets/img/worker01.jpg' : datos.Foto; return  datos;}));
  }

}
