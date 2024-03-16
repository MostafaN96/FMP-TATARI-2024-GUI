import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FabricOrderRequisitionDetailsWcService {

  urlService: string = "wc-fabric-order-requisition-details/"
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
  
  // Select
  select(id: string, isClosed): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}opened-orders/${id}`;
    if (isClosed == "closed") {
      url = `${this._constantsService.BASE_URL}${this.urlService}closed-orders/${id}`;
    }
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

  closeOrder(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}close-order/${id}`;
    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  openOrder(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}open-order/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }


  selectByFabricBySeller(fabricId: string, sellerId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-fabric-by-seller/${fabricId}/${sellerId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}