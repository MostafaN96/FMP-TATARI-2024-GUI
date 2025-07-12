import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YarnOrderRequisitionWaService {

  urlService: string = "wa-yarn-order-requisition/"
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

  // selectYarnsOfYarnOrderRequisition
  selectYarnsOfYarnOrderRequisition(yarnOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}yarns-by-yarn-order-requisition/${yarnOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // inquireYarnsOfFabricForOrderWa
  inquireYarnsOfFabricForOrderWa(dyeingOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}inquire-yarns-by-yarn-order-requisition/${dyeingOrderRequisitionId}`;

    return this._http.get(url,
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

  closeOrderByRequisition(id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}close-order-by-requisition/${id}`;

    return this._http.put(url, [],
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  selectByYarnWa(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-yarn-wa/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectByWarehouseWa(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-warehouse-wa/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectByIndustryWb(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-industry-wb/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectByIndustryByFabricWb(id: string, fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-industry-by-fabric-wb/${id}/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}

