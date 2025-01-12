import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WbService {

  urlService: string = "wb/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select
  selectOne(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url);
  }

  selectShortDetails(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-short-details/${id}`;
    return this._http.get(url);
  }

  selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
    yarnId: string, 
    industryId: string, 
    yarnLotId: string, 
    yarnOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-consigment-yarn-by-yarn-by-industry-by-lot/${yarnId}/${industryId}/${yarnLotId}/${yarnOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectNotIncludedYarnLotQuantityByYarnByIndustryWb(yarnId: string, industryId: string, obj: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-not-included-yarn-lot-by-yarn-by-industry/${yarnId}/${industryId}`;
    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectQuantityByIndustryWb(industryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-industry/${industryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectQuantityandFabricToBeManufacturedByIndustryWb(industryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-quantity-and-fabric-to-be-manufactured-by-industry/${industryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectQuantityByIndustryByFabricWb(industryId: string, fabricId: string, yarnOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-industry-by-fabric/${industryId}/${fabricId}/${yarnOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByIndustryByNeededFabricToBeManufacturedNotIncludedYarnsAndLotsWb(industryId: string, neededFabricId: string, obj: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-industry-by-nedded-fabric-not-included-yarns-and-lots/${industryId}/${neededFabricId}`;
    return this._http.post(url, obj,
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

  updateFabricToBeManufacture(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-fabric-to-be-manufactured/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}
