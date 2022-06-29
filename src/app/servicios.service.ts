import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  apiURL: string = environment.apiURL;

  constructor(private _http: HttpClient) { }

  wsGeneral(ws: string, param: any): Observable<any> {
    return this._http.post(this.apiURL + "/" + ws, param);
  }
}
