import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YarnService {

  urlService: string = "yarn/"
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


  selectAll(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectAllDeleted(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}deleted`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectMaxCode(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}max-code`;
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

  selectRemaining(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}/remaining`;
    return this._http.get(url);
  }

  selectStoredWaYarns(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-wa-yarns`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectStoredWaYarnsBySupplier(id: string, warehouseId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-wa-yarns/${id}/${warehouseId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectStoredWaYarnsByYarnId(yarnId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-wa-yarns-by-yarn/${yarnId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectRemainingInWb(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}/remaining-in-wb`;
    return this._http.get(url);
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

  selectRemainingFabricToBeManufacturedInWbOfIndustry(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-fabric-to-be-manufactured-in-wb-of-industry/${id}`;
    return this._http.get(url);
  }

  selectRemainingInWbOfIndustryAndNeededFabric(industryId: string, neededFabricId): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-in-wb-of-industry-and-needed-fabric/${industryId}/${neededFabricId}`;
    return this._http.get(url);
  }


  selectAllInWA(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}/yarns-in-wa`;
    return this._http.get(url);
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

  delete(obj: any): Observable<any> {

    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.request("DELETE", url,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${localStorage.getItem('token')}` }),
        body: obj
      });
  }

  restore(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.request("PATCH",url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        body: obj
      });
  }

}
