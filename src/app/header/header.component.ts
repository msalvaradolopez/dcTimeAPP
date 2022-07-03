import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  _menu: Subscription;
  activarMenu: boolean = false;

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {
    this._menu = this._servicios.menu$
    .subscribe(resp => resp ?  this.activarMenu = true : this.activarMenu = false);
  }

}
