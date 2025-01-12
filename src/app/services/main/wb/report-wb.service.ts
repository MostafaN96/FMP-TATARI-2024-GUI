import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportWbService {

  urlService: string = "wb-report/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select

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
  
  selectByIndustryByYarnTotal(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-industry-yarn-total/${object.industryId}/${object.yarnId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectInverntoryDetailsByIndustryByYarnByLot(industryId: string, yarnId: string, yarnLotId: string, consigmentYarnId: string, yarnOrderId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details-by-industry-by-yarn-by-lot/${industryId}/${yarnId}/${yarnLotId}/${consigmentYarnId}/${yarnOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectPriceInWb(yarnId: string, industryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-price-by-yarn-and-industry/${yarnId}/${industryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  circularKnittingMachinesManufacturingReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}circular-knitting-machine-manufacturing-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  circularKnittingMachineReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}circular-knitting-machine-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  manufacturingOrdersReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-orders-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  manufacturingOrdersDetailsReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturing-orders-details-report`;
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

  selectByFabricByConsigmentManufacturing(fabricId: string, consigmentManufacturingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric-by-consigment-manufacturing-report/${fabricId}/${consigmentManufacturingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectByYarn(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-yarn/${object.yarnId}/${object.industryId}/${object.yarnLotId}`;
    return this._http.get(url);
  }

  selectInverntoryByYarnAndIndustryInWb(yarnId: string, industryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-by-yarn-and-industry/${yarnId}/${industryId}`;
    return this._http.get(url);
  }


  selectAddedByIndustry(industryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-added-by-industry/${industryId}`;
    return this._http.get(url);
  }

  selectManufacturedByIndustries(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-manufactured-by-industries`;
    return this._http.get(url);
  }

  selectInverntoryYarn(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-yarn`;
    return this._http.post(url,object);
  }

  selectInverntoryYarnTotal(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-yarn-total`;
    return this._http.post(url,object);
  }

  selectFabricOrder(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-fabric-order`;
    return this._http.get(url);
  }
  
}