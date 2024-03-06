import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WdFormDyeingRequisitionDetailsDyeingServicesService {

  urlService: string = "wd-form-dyeing-requisition-details-dyeing-services/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }
  
  updateDyeingServices(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-dyeing-services`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}
