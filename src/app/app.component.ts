import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ViewChild("documentElement") docElement: ElementRef

  globalInstance: any;    
  title = 'dcTimeApp';

  // constructor(private _render: Renderer2, private _elem: ElementRef) { }
  constructor() {}

  ngOnInit() {
    
  }

}
