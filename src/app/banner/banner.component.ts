import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerListAux: any[] = null;
  bannerList: any[] = [];

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {

    // setTimeout(()=> this.bannerRun(), 5000);

    this._servicios.wsGeneral("getBanners", {claUN: "ALT"})
    .subscribe(x => {
      this.bannerListAux = x;

      if(this.bannerListAux) {
        this.bannerListAux.forEach(renglon => {
            this.bannerList.push(renglon.texto);
            this.bannerList.push("");
        });
      }
    }
    , error => {

    }, () => setTimeout(()=> this.bannerRun(), 5000));
     
  }

  bannerRun () {
    console.log("bannerRun");

    const root = document.documentElement;
    const marqueeElementsDisplayed = parseInt(getComputedStyle(root).getPropertyValue("--marquee-elements-displayed"));
    const marqueeContent = document.querySelector("ul.marquee-content");

    root.style.setProperty("--marquee-elements", marqueeContent.children.length.toString());

    for(let i=0; i<marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  }

}
