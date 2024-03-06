import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportWbWaRequisitionDetailsWbService {

  urlService: string = "transport-wb-wa-requisition-details-wb/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select
  selectOne(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url);
  }

  update(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}