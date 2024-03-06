import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsigmentManufacturingService {

  urlService: string = "consigment-manufacturing/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

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
      const url = `${this._constantsService.BASE_URL}${this.urlService}/deleted`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

  selectByWarehouseByFabricWc(warehouseId: string, fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-warehouse-by-fabric-wc/${warehouseId}/${fabricId}`;
    return this._http.get(url);
  }

  selectByWarehouseByFabricBySupplierWc(warehouseId: string, fabricId: string, supplierId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-warehouse-by-fabric-by-supplier-wc/${warehouseId}/${fabricId}/${supplierId}`;
    return this._http.get(url);
  }

  selectByDyeingByFabricWd(dyeingId: string, fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-dyeing-by-fabric-wd/${dyeingId}/${fabricId}`;
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
