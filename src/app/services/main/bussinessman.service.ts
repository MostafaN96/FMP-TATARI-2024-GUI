import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BussinessmanService {

  urlService: string = "bussinessman/"
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

  selectSupplier(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}supplier`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectSupplierBuyingYarn(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}yarn-suppliers-bought-from`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectSupplierBuyingFabric(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}fabric-suppliers-bought-from`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectSuppliersBoughtFromWe(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}suppliers-bought-from-we`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectSellersSellFromWe(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}sellers-sell-from-we`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  

  selectSeller(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}seller`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectManufacturer(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturer`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectTransportedManufacturersInWb(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}transported-manufacturers-wb`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectTransportedManufacturerWd(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}transported-manufactured-wd`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  

  selectTransportedManufacturersNotSelectedInWb(industryId:string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}transported-manufacturers-not-selected-wb/${industryId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectManufacturerManufactured(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}manufacturer-manufactured`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectDyer(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyer`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyerDyeing(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyer-dyeing`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyeingFromWd(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-from-wd`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectSellersOrderedFromDyeing(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}sellers-ordered-from-dyeing`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyerHasForm(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyer-has-form`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectSellerManufacturingOrdered(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}seller-manufacturing-ordered`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectNotSelectedDyeing(dyeingId:string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}not-selected-dyer-wd/${dyeingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectDyerHasServices(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyer-has-services`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyersAndRequisitions(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyers-and-requisitions`;
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
