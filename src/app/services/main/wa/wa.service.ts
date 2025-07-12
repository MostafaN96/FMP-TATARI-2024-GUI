import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaService {

  urlService: string = "wa/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

    
  selectRemainingByWarehouseByYarnByLotWa(warehouseId: string, yarnId: string, yarnLotId: string, yarnOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-by-warehouse-by-yarn-by-lot-wa/${warehouseId}/${yarnId}/${yarnLotId}/${yarnOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  
  selectRemainingBySupplierByWarehouseByYarnByLotForReturn(id: string, warehouseId: string, yarnId: string, yarnLotId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-by-warehouse-by-yarn-by-lot-by-supplier-for-return-wa/${id}/${warehouseId}/${yarnId}/${yarnLotId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectOne(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}
