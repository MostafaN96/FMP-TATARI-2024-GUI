import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WbManufacturingOutputService {

  urlService: string = "wb-manufactiring-output/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  selectLatestManufacturingFeeByIndustryByFabric(IndustryId: string, fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}latest-manufacturing-fee-by-industry-by-fabric/${IndustryId}/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByRequisitionId(requisitionId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${requisitionId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByRequisitionIdForOrder(requisitionId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}for-order/${requisitionId}`;
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

  updateForOrder(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-for-order/${id}`;
    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectConsigmentManufacturingByFabric(fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-consigment-manufacturing-by-fabric/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}
