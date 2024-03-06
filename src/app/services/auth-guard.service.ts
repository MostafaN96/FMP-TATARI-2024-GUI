import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  isLoggin = localStorage.getItem("token")
  constructor() { }
}
