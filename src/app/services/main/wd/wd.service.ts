import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WdService {

  urlService: string = "wd/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  selectConsigmentDyeingQuantityByFabricByDyeingWd(fabricId: string, dyeingId: string, fabricOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-consigment-dyeing-by-fabric-by-dyeing/${fabricId}/${dyeingId}/${fabricOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectQuantityByDyeingWd(dyeingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-dyeing/${dyeingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectQuantityByDyeingByFabricOrderWd(dyeingId: string, fabricOrderId?: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-dyeing-by-fabric-order/${dyeingId}/${fabricOrderId}`;
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
    return this._http.get(url);
  }

  selectTransitionBetweenDayers(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}transition-between-dayers/${id}`;
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

  updateTransitionBetweenDayers(obj: any, id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}update-transition-between-dayers/${id}`;

    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}
