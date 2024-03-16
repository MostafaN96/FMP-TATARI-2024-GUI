import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingOrderRequisitionWbService {

  urlService: string = "wb-manufactiring-order-requisition/"
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

  // inquireFabricsForOrderWb
  inquireFabricsByDyeingOrderForOrderWb(dyeingOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabrics-by-dyeing-order-requisition/${dyeingOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

}
