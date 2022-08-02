import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';
declare var $: any;

@Component({
  selector: 'app-surtidoresupd',
  templateUrl: './surtidoresupd.component.html',
  styleUrls: ['./surtidoresupd.component.css']
})
export class SurtidoresupdComponent implements OnInit {

  surtidorItem: any = null;
  imagen: string = "";
  _imagenOld: string = "";

  constructor(private _toastr: ToastrService, private _servicios: ServiciosService, private _router: Router, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.surtidorItem = JSON.parse(sessionStorage.getItem("surtidorItem"));
    this._imagenOld = this.surtidorItem.Foto;
  }

  regresar() {
    this._router.navigate(["/surtidores"]);
  }

  guardarFoto() {
    if(this.imagen == ""){
      this._toastr.error("Se requiere una imagen.");
      return;
    }

    let recursoToCall = "insFoto";

    if(this._imagenOld == "assets/img/worker01.jpg")
      recursoToCall = "insFoto";
    else 
      recursoToCall = "updFoto";

      this._servicios.wsGeneral(recursoToCall, {claUN: "ALT", empID: this.surtidorItem.empID, Foto: this.imagen})
      .subscribe(resp => this._router.navigate(["/surtidores"])
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar imagen.")
      ,() => this._toastr.success("Imagen guardada."));
  }

  loadIMG() {
    var input = $("#myInputFile");
    input.replaceWith(input.val('').clone(true));
    $('#myInputFile').click();
  }

  getFile(fileList: FileList): void {
    let _this = this;
    // Cogemos el primer archivo
    var archivo = fileList[0],
      // Creamos la instancia de FileReader
      reader = new FileReader(),
      urlBase64;
    // Os esperábais algo más complicado?
    reader.onload = function () {
      urlBase64 = reader.result;
      // _this.validaCaptura.IMAGEN = urlBase64;
      _this.imagen = urlBase64;
      _this.surtidorItem.Foto = urlBase64
      // Hacer lo que se quiera con la url
    }
    reader.readAsDataURL(archivo);
    // need to run CD since file load runs outside of zone
    this._cd.markForCheck();
  }


}
