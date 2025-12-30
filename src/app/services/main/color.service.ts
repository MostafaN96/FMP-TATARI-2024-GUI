import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  urlService: string = "color/"
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
    const url = `${this._constantsService.BASE_URL}${this.urlService}/deleted`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  selectByDeying(deyingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${deyingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByCategoryAndDeying(deyingId: string, colorCategoryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${deyingId}/${colorCategoryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByCategory(colorCategoryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-category/${colorCategoryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyersAndRequisitionsColorOfFabrics(fabricId: string, supplierId: string, colorCategoryId?: string, requisitionId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}${fabricId}/${supplierId}/${colorCategoryId}/${requisitionId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectByOrderByDyedFabricByColorCategoryWe(orderRequisitionId: string, dyedFabricId: string, colorCategoryId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-order-by-dyed-fabric-by-color-category/${orderRequisitionId}/${dyedFabricId}/${colorCategoryId}`;
    return this._http.get(url,
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
