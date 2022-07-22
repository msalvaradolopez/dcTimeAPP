import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { WorkBook, WorkSheet, WritingOptions, read, writeFileXLSX as writeFile, utils, version, set_cptable } from 'xlsx';
// declare var $:any;
import { Table2Excel } from 'table2excel';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  @ViewChild("tablaPorDias", { static: true, read: ElementRef }) tablaPorDias: ElementRef

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

  /* EXPORTAR A EXCEL*/
  
	wopts: WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
	ver: string = version;

  //
  _todosDias: boolean = true;
  _todosSurtidores: boolean = true;

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
    let diasList: number[] = [0];
    let surtidoresList: number[] = [0];

    this._servicios.wsGeneral("getConPorDias", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected})
    .subscribe(x => {
      this.conPorDiasList = x;
      this._servicios.wsGeneral("getConPorSurtidor", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected})
      .subscribe(x => {
      this.conPorSurtidorList = x;
        this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected, diasList: diasList, surtidoresList: surtidoresList})
        .subscribe(x => {
        this.conGeneralList = x;
        
        });
      
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta general.")
      , () => this.conPorSurtidorList.forEach(x => x.check = true));
    }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta general.")
    , () => this.conPorDiasList.forEach(x => x.check = true));
  }

  getConsulta() {

    let dias = this.conPorDiasList.filter(x => x.check == true).map(x => {
      var fechaAux = new Date(x.fechaOrigen);
      return fechaAux.getDate();
    });
    let surtidores = this.conPorSurtidorList.filter(x => x.check == true).map(x => x.empID);

    console.log(dias);
    console.log(surtidores);
    
    this._servicios.wsGeneral("getConGeneral", {claUN: "ALT", annio: this.annioSelected, mes: this.mesSelected, diasList: dias, surtidoresList: surtidores})
    .subscribe(x => {
    this.conGeneralList = x;
    
    }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Consulta surtidor."));

  }

  cambiosFiltros() {
    this.getIndicadores();
  }

  exportToExcel() {
    const table1 = document.getElementById('tablaDetalle');

    /* create new workbook */
    var workbook = utils.book_new();

    /* convert table "table1" to worksheet named "Sheet2" */
    var sheet1 = utils.table_to_sheet(table1, { raw: true });
    utils.book_append_sheet(workbook, sheet1, "Sheet1");

		/* save to file */
		writeFile(workbook, this.fileName);
  }

  todosDias(param: any) {
    this.conPorDiasList.forEach(x => x.check = this._todosDias);
  }

  todosSurtidores(param: any) {
    this.conPorSurtidorList.forEach(x => x.check = this._todosSurtidores);
  }
}
