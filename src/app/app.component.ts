import { Component, OnInit, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("documentElement") docElement: ElementRef

  globalInstance: any;    
  title = 'dcTimeApp';

  constructor(private _render: Renderer2, private _elem: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this._elem.nativeElement.click();
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.globalInstance = this._render.listen(this._elem.nativeElement, 'click', () => {
      if(this._elem.nativeElement.requestFullScreen) {
        this._elem.nativeElement.requestFullScreen();
      } else if(this._elem.nativeElement.mozRequestFullScreen) {
        this._elem.nativeElement.mozRequestFullScreen();
      } else if(this._elem.nativeElement.webkitRequestFullScreen) {
        this._elem.nativeElement.webkitRequestFullScreen();
      }
  });
  }

}
