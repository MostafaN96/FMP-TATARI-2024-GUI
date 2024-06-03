import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  public exchangeRate = new BehaviorSubject<any>({
    dollarPrice: 0
  });
}
