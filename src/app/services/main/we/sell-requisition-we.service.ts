import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellRequisitionWeService {

  urlService: string = "we-sell-requisition/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Add
  add(obj: any, isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct/"
    }
    else {
      this.urlService = "we-sell-requisition/"
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Add Details
  addDetails(obj: any, isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct/"
    }
    else {
      this.urlService = "we-sell-requisition/"
    }

    let url = `${this._constantsService.BASE_URL}${this.urlService}add-details`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectAll(isDirect?): Observable<any> {
    if(isDirect == "direct") {
      this.urlService = "we-sell-requisition-direct/"
    }
    else {
      this.urlService = "we-sell-requisition/"
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  upload(obj: any, id:any): Observable<any> {
      this.urlService = "we-sell-requisition/"
    let url = `${this._constantsService.BASE_URL}${this.urlService}upload/${id}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  getImage(id: any): Observable<any> {
    this.urlService = "we-sell-requisition/"
    const url = `${this._constantsService.BASE_URL}${this.urlService}image/${id}`;
    return this._http.get(url);
  }

}
