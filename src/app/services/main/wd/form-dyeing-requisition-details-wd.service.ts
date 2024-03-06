import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormDyeingRequisitionDetailsWdService {

  urlService: string = "wd-form-dyeing-requisition-details/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

    // Add
  add(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Add
  addByOrder(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}add-by-order`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  // Select
  selectByRequisitionId(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  // Select
  selectOrderByRequisitionId(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}order-by-requisition/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectByDyeing(dyeingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-dyeing/${dyeingId}`;
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

  updateByOrder(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-by-order/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
}