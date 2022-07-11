import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-surtidoresupd',
  templateUrl: './surtidoresupd.component.html',
  styleUrls: ['./surtidoresupd.component.css']
})
export class SurtidoresupdComponent implements OnInit {

  surtidorItem: any = null;
  imagen: string = "";


  constructor(private _toastr: ToastrService, private _servicios: ServiciosService, private _router: Router, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.surtidorItem = JSON.parse(sessionStorage.getItem("surtidorItem"));
  }

  regresar() {
    this._router.navigate(["/surtidores"]);
  }

  guardarFoto() {
    this._servicios.wsGeneral("setFoto", {claUN: "ALT", empID: this.surtidorItem.empID, Foto: this.imagen})
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
