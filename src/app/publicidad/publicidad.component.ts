import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
declare var $: any;

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {
  @ViewChild('videoRef') videoRef: ElementRef;

  _video: string = ""
  _archivo: any = null;

  constructor(private _servicios: ServiciosService, private _router: Router, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this._video = "assets/video/eléctrico_corporativo_2021_(corta) (720p).mp4";
    this._servicios.downloadFile("getPublicidad", {claUN: "ALT"})
    .subscribe(resp => {
          let _this = this;
        // Cogemos el primer archivo
        var 
          // Creamos la instancia de FileReader
          reader = new FileReader(),
          urlBase64;
        // Os esperábais algo más complicado?
        _this._archivo = resp;
        reader.onload = function () {
          urlBase64 = reader.result;
          // _this.validaCaptura.IMAGEN = urlBase64;
          _this._video = urlBase64;
          // Hacer lo que se quiera con la url
          _this.videoRef.nativeElement.src = _this._video;
          _this.videoRef.nativeElement.load;
        }
        reader.readAsDataURL(_this._archivo);
        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
    }
    , error => {}
    , () => {
      this.videoRef.nativeElement.src = this._video;
      this.videoRef.nativeElement.load;
    });
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
    _this._archivo = archivo;
    reader.onload = function () {
      urlBase64 = reader.result;
      // _this.validaCaptura.IMAGEN = urlBase64;
      _this._video = urlBase64;
      // Hacer lo que se quiera con la url
      _this.videoRef.nativeElement.src = _this._video;
      _this.videoRef.nativeElement.load;
    }
    reader.readAsDataURL(archivo);
    // need to run CD since file load runs outside of zone
    this._cd.markForCheck();
  }

  guardar() {
    let lformData = new FormData();
    lformData.append("File", this._archivo);
    lformData.append("FileName", "xxx.mp4");

    
    this._servicios.wsGeneral("setPublicidad", lformData)
    .subscribe(resp => console.log(resp));
    
  }

}
