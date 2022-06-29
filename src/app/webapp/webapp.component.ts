import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {

  constructor(private _router: Router, private _query: ActivatedRoute) {}

  ngOnInit(): void {

    this._query.queryParams.subscribe(params => {
      if (params.id == "M")
        this._router.navigate(["/mostradorTime"]);
      else
        this._router.navigate(["/almacenTime"]);
    });

    if(this._query.snapshot.queryParams.id == "M")
        this._router.navigate(["/mostradorTime"]);
    else
        this._router.navigate(["/almacenTime"]);


  }


}
