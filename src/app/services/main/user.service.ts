import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlService:string = "user/"
  constructor(private _http: HttpClient, 
    private localStorage: LocalStorageService,
    private _constantsService: ConstantsService) { }

  login(login:any):Observable<any>{
    return this._http.post(`${this._constantsService.BASE_URL}${this.urlService}login`,login) 
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
}
