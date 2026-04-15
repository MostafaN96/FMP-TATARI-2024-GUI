import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DyedFabricOrderRequisitionWeService {

  urlService: string = "we-dyed-fabric-order-requisition/"
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

  // Add Details
  addDetails(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}add-details`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // selectDyedFabricsOrderRequisition
  selectDyedFabricsOrderRequisition(dyedFabricOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}dyed-fabrics-order-requisition/${dyedFabricOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // inquireFabricsForOrderWc
  inquireFabricsForOrderWc(dyeingOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabrics-order-requisition/${dyeingOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // selectDyedFabricsByWcFabricOrderIds
  selectDyedFabricsByWcFabricOrderIds(wcFabricOrderIds: string[], dyedFabricId?: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}by-wc-fabric-order-ids`;

    return this._http.post(url, { wcFabricOrderIds, dyedFabricId },
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // selectDyedFabricsByOrdersRequisitionsIds
  selectDyedFabricsByOrdersRequisitionsIds(ordersRequisitionsIds: string[]): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}by-orders-requisitions-ids`;

    return this._http.post(url, { ordersRequisitionsIds },
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectAll(isClosed): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}opened-orders`;
    if(isClosed == "closed") {
      url = `${this._constantsService.BASE_URL}${this.urlService}closed-orders`;
    }
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectOrdersForAddPurchaseWa(isClosed): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}opened-orders-for-purchase-wa`;
    if(isClosed == "closed") {
      url = `${this._constantsService.BASE_URL}${this.urlService}closed-orders-for-purchase-wa`;
    }
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  closeOrderByRequisition(id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}close-order-by-requisition/${id}`;

    return this._http.put(url, [],
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}

