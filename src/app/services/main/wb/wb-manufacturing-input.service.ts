import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WbManufacturingInputService {

  
  urlService: string = "wb-manufactiring-input/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }
  
    selectByRequisitionId(requisitionId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${requisitionId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
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
  
  // Add Details
  add(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}

