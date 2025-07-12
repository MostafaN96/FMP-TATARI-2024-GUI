import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeService {

  urlService: string = "we/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select
  selectStoreWe(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-store-we`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectStoreWeByWeDyedFabricOrderRequisitionIdOfOrderDyedFabrics(weDyedFabricOrderRequisitionId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-order-store-we-of-order-dyed-fabrics/${weDyedFabricOrderRequisitionId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectStoreBySupplierForReturnWe(supplierId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-store-by-supplier-for-return-we/${supplierId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectSoldedBySellerForReturnSellWe(sellerId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-solded-by-seller-for-return-sell-we/${sellerId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectStoreWithDyeingServicesWe(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-store-with-dyeing-services-we`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectStoreForDirectSellWe(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-store-for-direct-sell-we/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectOne(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url);
  }

  updateWEOutsideRequisition(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-outside-requisition/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  updateWEData(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;
    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}