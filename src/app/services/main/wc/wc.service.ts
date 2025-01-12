import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WcService {

  urlService: string = "wc/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Select
  selectOne(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url);
  }

  selectConsigmentManufacturingQuantityByWarehouseByFabricWc(warehouseId: string, fabricId: string, fabricOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-warehouse-by-fabric-wc/${warehouseId}/${fabricId}/${fabricOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  selectConsigmentManufacturingQuantityByWarehouseByFabricForReturn(id: string, warehouseId: string, fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-warehouse-by-fabric-by-supplier-for-return-wc/${id}/${warehouseId}/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}