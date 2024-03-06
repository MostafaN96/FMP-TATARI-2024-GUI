import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  urlService: string = "user-permissions/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  update(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectAddedUsersPermissions(userId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-added-users-permissions/${userId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectNewUsersPermissions(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-new-users-permissions/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }


}

