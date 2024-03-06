import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DyeingServicesService {


  urlService: string = "dyeing-services/"
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


  selectAll(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByDeying(deyingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${deyingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }


  selectAdded(deyingrequisitionDetailsId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-added/${deyingrequisitionDetailsId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectNotIn(obj: any) {
    let url = `${this._constantsService.BASE_URL}${this.urlService}select-not-in`;
    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectAllDeleted(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}deleted`;
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

  delete(obj: any): Observable<any> {

    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.request("DELETE", url,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${localStorage.getItem('token')}` }),
        body: obj
      });
  }

  restore(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.request("PATCH", url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        body: obj
      });
  }

}
