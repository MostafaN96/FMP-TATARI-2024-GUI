import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FabricService {

  urlService: string = "fabric/"
  urlServiceDyed: string = "dyed-fabric/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

  // Add
  add(obj: any, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;

    this.urlService = "fabric/"
    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }


  selectAll(urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}`;
    this.urlService = "fabric/"
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectMaxCode(urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}max-code`;
    this.urlService = "fabric/"
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectRemainingInWbByIndustry(industryId: string, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-wb-by-industry/${industryId}`;
    this.urlService = "fabric/"
    return this._http.get(url);
  }
  
  selectFabricToBeManufacturedWb(industryId: string, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-fabric-to-be-manufactured-by-industry/${industryId}`;
    this.urlService = "fabric/"
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectRemaining(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining`;
    return this._http.get(url);
  }

  selectByWarehouseWc(warehouseId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-warehouse-wc/${warehouseId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectStoredFabricsByFabricIdWc(fabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-fabrics-by-fabric-wc/${fabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectBySupplierByWarehouseWc(supplierId: string, warehouseId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-wc-fabrics/${supplierId}/${warehouseId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectManufacturedFabricWb(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-manufactured-fabric`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectDyerDyeing(urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyed-fabric`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectRemainingByWarehouseByConsigmentWc(warehouseId: string, consigmentManufacturingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-by-warehouse-by-consigment-wc/${warehouseId}/${consigmentManufacturingId}`;
    return this._http.get(url);
  }
  
  selectRemainingInWe(urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-in-we`;
    this.urlService = "fabric/"
    return this._http.get(url);
  }

  selectRemainingWeBySupplier(id: string, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-we-by-supplier/${id}`;
    this.urlService = "fabric/"
    return this._http.get(url);
  }

  selectStoredDyedFabricsByDyedFabricByColorByColorCodeWe(dyedFabricId: string, colorId: string, colorCode: string): Observable<any> {
    this.urlService = this.urlServiceDyed
    const url = `${this._constantsService.BASE_URL}${this.urlService}stored-dyed-fabrics-by-dyed-fabric-by-color-by-color-code-we/${dyedFabricId}/${colorId}/${colorCode}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectRemainingInWdOfDyeing(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}remaining-in-wd-of-dyeing/${id}`;
    return this._http.get(url);
  }

  selectByDyeingWd(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-dyeing-wd/${id}`;
    return this._http.get(url);
  }

  
  selectDyersAndRequisitionsFabrics(id: string, requisitionId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyers-and-requisitions-fabrics/${id}/${requisitionId}`;
    return this._http.get(url);
  }

  selectSoldOutFabricsBySeller(id: string, isDyed): Observable<any> {
    if(isDyed == "dyed") {
      this.urlService = "dyed-fabric/"
    }
    else {
      this.urlService = "fabric/"
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}soldout-fabrics-by-seller/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
  
  selectAllDeleted(urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    const url = `${this._constantsService.BASE_URL}${this.urlService}/deleted`;
    this.urlService = "fabric/"
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  selectFabricByDyedFabric(dyedFabricId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-fabric-by-dyed-fabric/${dyedFabricId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  update(obj: any, id: string, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}${id}`;
    this.urlService = "fabric/"
    return this._http.put(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  delete(obj: any, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;
    this.urlService = "fabric/"
    return this._http.request("DELETE", url,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${localStorage.getItem('token')}` }),
        body: obj
      });
  }

  restore(obj: any, urlService?:string): Observable<any> {
    if(urlService == "dyed") {
      this.urlService = this.urlServiceDyed
    }
    let url = `${this._constantsService.BASE_URL}${this.urlService}`;
    this.urlService = "fabric/"
    return this._http.request("PATCH",url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        body: obj
      });
  }

}
