import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportWcService {

  urlService: string = "wc-report/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select


  selectPriceWc(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-price/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectPriceByFabricByConsigmentManufacturingInWc(fabricId: string, consigmentManufacturingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-price-by-fabric-and-consigmnet/${fabricId}/${consigmentManufacturingId}`;
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

  selectInverntoryDetails(object: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details`;
    return this._http.post(url, object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInventoryTotalByFabric(fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total-by-fabric/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInventoryDetailsByWarehouseByFabricByConsigmentManufacturing(
    fabricId: string, 
    warehouseId: string,  
    consigmentManufacturingId: string, 
    fabricOrderId: string
  ): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details-by-warehouse-by-fabric-by-consigment-manufacturing/${fabricId}/${warehouseId}/${consigmentManufacturingId}/${fabricOrderId}`;
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
  
  manufacturingReportByFabric(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-report-by-fabric/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByFabric(fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric/${fabricId}`;
    return this._http.get(url);
  }

  selectByFabricDetails(fabricId: string, warehouseId: string, consigmentManufacturingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric-details/${fabricId}/${warehouseId}/${consigmentManufacturingId}`;
    return this._http.get(url);
  }

  selectByWarehouseByConsigmentForPriceWc(fabricId: string, consigmentManufacturingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric-by-consigment-for-price/${fabricId}/${consigmentManufacturingId}`;
    return this._http.get(url);
  }
  
  selectInverntoryFabric(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-fabric`;
    return this._http.post(url,object);
  }

  selectInverntoryFabricDetails(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-fabric-details`;
    return this._http.post(url,object);
  }

}