import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellRequisitionDetalisWeService {

  urlService: string = "we-sell-requisition-details/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

    // Add
  add(obj: any, isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct-details/"
    }
    else {
      this.urlService = "we-sell-requisition-details/"
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectByRequisitionId(id: string, isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct-details/"
    }
    else {
      this.urlService = "we-sell-requisition-details/"
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  update(obj: any, id: string, isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct-details/"
    }
    else {
      this.urlService = "we-sell-requisition-details/"
    }

    let url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  confirm(obj: any): Observable<any> {
    this.urlService = "we-sell-requisition-direct-details/"
    let url = `${this._constantsService.BASE_URL}${this.urlService}confirm`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
}