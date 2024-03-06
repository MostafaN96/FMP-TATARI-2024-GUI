import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import jwt_decode from "jwt-decode";
import { ConstantsService } from '../constants.service'

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  private _userPrivilegeArray = null

  constructor(private session: SessionStorageService,
    private _constantsService: ConstantsService
  ) {
    this.getUserPrivilege()
  }

  private getUserPrivilege() {
    const token = localStorage.getItem(this._constantsService.TOKEN_SESSION_KEY)

    if (token) {
      const secret = this._constantsService.TOKEN_KEY
      try {
        this._userPrivilegeArray = jwt_decode(token);
      }
      catch (error) {
        this._userPrivilegeArray = null
      }
    }
  }

  checkAuth(link: any) {    
    return this.USER_PRIVILEGE_ARRAY['links'].includes(String(link));
  }

  get USER_PRIVILEGE_ARRAY(): {} {
    if(localStorage.getItem('privilege') != null) {
      return JSON.parse(localStorage.getItem('privilege') || '') ?? [];
    } 
    return []
  }

  get USER_ID() {
    return this._userPrivilegeArray?.['user_id'];
  }

  get USER_NAME() {
    return this._userPrivilegeArray?.['user_name'];
  }

  get IP_ADDRESS(): any {
    return "12345"
  }

  get Person_ID(): string {
    return String(this._userPrivilegeArray?.['user_email']);
  }
}
