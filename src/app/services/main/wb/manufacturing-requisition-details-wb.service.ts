import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingRequisitionDetailsWbService {

  urlService: string = "manufactiring-requisition-details-wb/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select
  selectManufacturingInput(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-input/${id}`;
    return this._http.get(url);
  }

  selectManufacturingOutput(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-output/${id}`;
    return this._http.get(url);
  }

  selectManufacturingOutputForOrder(id: string, manufacturingOrderRequisitionDetailsId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-output-order/${id}/${manufacturingOrderRequisitionDetailsId}`;
    return this._http.get(url);
  }

  updateManufacturingOutput(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-output/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}