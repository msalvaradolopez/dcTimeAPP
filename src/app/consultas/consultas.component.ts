import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  conPorDiasList: any[] = null;
  conPorSurtidorList: any [] = null;
  conGeneralList: any[] = null;

  rangoAnnios: number[] = [];
  rangoMeses: any[] = [{idMes: 1, nomMes: "Enero"},
                        {idMes: 2, nomMes: "Febrero"},
                        {idMes: 3, nomMes: "Marzo"},
                        {idMes: 4, nomMes: "Abril"},
                        {idMes: 5, nomMes: "Mayo"},
                        {idMes: 6, nomMes: "Junio"},
                        {idMes: 7, nomMes: "Julio"},
                        {idMes: 8, nomMes: "Agoso"},
                        {idMes: 9, nomMes: "Septiembre"},
                        {idMes: 10, nomMes: "Octubre"},
                        {idMes: 11, nomMes: "Noviembre"},
                        {idMes: 12, nomMes: "Diciembre"}];

  annioSelected: number = 0;
  mesSelected: number = 0;

  constructor(private _toastr: ToastrService, private _servicios: ServiciosService) { }

  ngOnInit(): void {

    let fechaActual = new Date();
    let annioActual = fechaActual.getFullYear();
    for (let i = annioActual-5; i < annioActual+5; i++) 
      this.rangoAnnios.push(i);
  
    this.annioSelected = annioActual;
    this.mesSelected = fechaActual.getMonth()+1;
    this.getIndicadores();

  }

  getIndicadores() {

    this._servicios.wsGeneral("getConPorDias", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected})
    .subscribe(x => {
      this.conPorDiasList = x;
      this._servicios.wsGeneral("getConPorSurtidor", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected})
      .subscribe(x => {
      this.conPorSurtidorList = x;
      console.log(this.conPorSurtidorList);
        this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected, dia: 0, empID: 0})
        .subscribe(x => {
        this.conGeneralList = x;
        
        });
      
      });
    }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta general."));
  }

  getConGeneralPorDia(fecha: string) {
    var _fechaAux = new Date(fecha);
    var _annio = _fechaAux.getFullYear();
    var _dia = _fechaAux.getDate();
    var _mes = _fechaAux.getMonth() + 1;

    this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: _annio, mes: _mes, dia: _dia, empID: 0})
    .subscribe(x => {
    this.conGeneralList = x;
    
    }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta por dias."));

  }

  getConGeneralPorSurtidor(empID: string) {
    
    this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected, dia: 0, empID: empID})
    .subscribe(x => {
    this.conGeneralList = x;
    
    }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta surtidor."));

  }

  cambiosFiltros() {
    this.getIndicadores();
  }

}
