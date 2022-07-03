import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  conPorDiasList: any[] = null;
  conPorSurtidorList: any [] = null;
  conGeneralList: any[] = null;

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {
    this.getIndicadores();
  }

  getIndicadores() {
    this._servicios.wsGeneral("getConPorDias", {claUN: "ALT", annio: 2022, mes: 6})
    .subscribe(x => {
      this.conPorDiasList = x;
      this._servicios.wsGeneral("getConPorSurtidor", {claUN: "ALT", annio: 2022, mes: 6})
      .subscribe(x => {
      this.conPorSurtidorList = x;
      console.log(this.conPorSurtidorList);
        this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: 2022, mes: 6, dia: 30, empID: 0})
        .subscribe(x => {
        this.conGeneralList = x;
        
        });
      
      });
    });
  }

  getConGeneralPorDia(fecha: string) {
    var _fechaAux = new Date(fecha);
    var _dia = _fechaAux.getDate();
    var _mes = _fechaAux.getMonth() + 1;

    console.log("FECHA :" , _fechaAux);
    console.log("DIA :" , _dia);
    console.log("MES :" , _mes);

    this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: 2022, mes: _mes, dia: _dia, empID: 0})
    .subscribe(x => {
    this.conGeneralList = x;
    
    });

  }

  getConGeneralPorSurtidor(empID: string) {
    
    this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: 2022, mes: 6, dia: 0, empID: empID})
    .subscribe(x => {
    this.conGeneralList = x;
    
    });

  }

}
