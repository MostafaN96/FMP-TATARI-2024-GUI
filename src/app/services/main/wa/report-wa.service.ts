import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportWaService {

  urlService: string = "wa-report/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }


  selectByYarnDetails(id: string, warehouseId: string, yarnLotId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-yarn-details/${id}/${warehouseId}/${yarnLotId}`;
    return this._http.get(url);
  }

  selectByYarn(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-yarn/${id}`;
    return this._http.get(url);
  }

  selectPriceWa(id: string, consigmentYarnId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-price/${id}/${consigmentYarnId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  purchasesByYarn(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}purchases-by-yarn/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  purchasesBySupplier(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}purchases-by-supplier/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  purchasesBySuppliers(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}purchases-by-suppliers`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInverntoryTotal(object: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total`;
    return this._http.post(url, object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInventoryTotalByYarnByWarehouse(yarnId: string, warehouseId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total-by-yarn-by-warehouse/${yarnId}/${warehouseId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInverntoryDetails(object: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details`;
    return this._http.post(url, object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInverntoryDetailsByWarehouseByYarnByLot(warehouseId: string, yarnId: string, yarnLotId: string, consigmentYarnId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details-by-warehouse-by-yarn-by-lot/${warehouseId}/${yarnId}/${yarnLotId}/${consigmentYarnId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInventoryTotalByDate(object: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total-by-date`;
    return this._http.post(url, object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}