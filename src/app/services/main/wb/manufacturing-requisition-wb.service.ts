import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingRequisitionWbService {

  urlService: string = "wb-manufactiring-requisition/"
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

  addByOrder(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}add-by-order`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectAllLazy(body: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-lazy`;
    return this._http.post(url, body, {
      headers: new HttpHeaders({ 'authorization': `Bearer ${localStorage.getItem('token')}` })
    });
  }

  // Select
  selectAll(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectOrders(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}orders`;
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

  // سكان الإيصال بالذكاء الاصطناعي
  scanReceipt(image: string, mimeType: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}scan-receipt/`;
    return this._http.post(url, { image, mimeType }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // إثراء البيانات من قاعدة البيانات
  enrichScanReceipt(manufacturerName: string, fabricName: string, orderNumber?: number | null): Observable<any> {
    const url = `${this._constantsService.BASE_URL}scan-receipt/enrich`;
    return this._http.post(url, { manufacturerName, fabricName, orderNumber }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

}
