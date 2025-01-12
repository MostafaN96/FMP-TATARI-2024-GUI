import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportWdService {

  urlService: string = "wd-report/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

    selectInverntoryTotal(object: any): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total`;
      return this._http.post(url, object,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

    selectInverntoryDetails(object: any): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details`;
      return this._http.post(url, object,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

    
  selectInventoryDetailsByDyeingByFabricByConsigmentDyeing(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details-by-dyeing-by-fabric-by-lot/${object.dyeingId}/${object.fabricId}/${object.consigmentDyeingId}/${object.fabricOrderId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

    selectByDyeingByFabricTotal(object:any): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-dyeing-fabric-total/${object.fabricId}/${object.dyeingId}`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

    selectPriceInWd(fabricId: string, dyeingId: string): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-price-by-fabric-and-dyeing/${fabricId}/${dyeingId}`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

    selectPriceByFabricByDyeingByConsigmentDyeingInWd(fabricId: string, dyeingId: string, consigmentDyeingId: string): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-price-by-fabric-and-dyeing/${fabricId}/${dyeingId}/${consigmentDyeingId}`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }

    selectInventoryTotalByDate(object: any): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total-by-date`;
      return this._http.post(url, object,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }
    
    
    dyeingReportByDyeing(dyeingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-report-by-dyeing/${dyeingId}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  dyeingReportByDyes(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-report-by-dyes`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  
  dyeingOrdersReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-orders-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  dyeingOrdersDetailsReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-orders-details-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  formReportByFabric(object: any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}form-report-by-fabric`;
    return this._http.post(url, object,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
  }

  // Select
  selectByFabricOfRequisition(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric-of-requisition/${id}`;
    return this._http.get(url);
  }

  selectInverntoryByFabricAndDyeingForPriceInWd(fabricId: string, dyeingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-by-fabric-and-dyeing-for-price/${fabricId}/${dyeingId}`;
    return this._http.get(url);
  }
  
  selectByFabric(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric/${object.fabricId}/${object.dyeingId}`;
    return this._http.get(url);
  }
  
  selectByFabricDetails(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric-details/${object.fabricId}/${object.dyeingId}/${object.consigmentDyeingId}`;
    return this._http.get(url);
  }

  selectInverntoryByFabricAndDyeingInWd(fabricId: string, dyeingId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-by-fabric-and-dyeing/${fabricId}/${dyeingId}`;
    return this._http.get(url);
  }

  selectInverntoryFabric(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-fabric`;
    return this._http.post(url,object);
  }

  selectInverntoryFabricDetails(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-fabric-details`;
    return this._http.post(url,object);
  }


  selectInverntoryFormFabricByDyeing(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-by-form-fabric-and-dyeing`;
    return this._http.get(url);
  }

  
  
  

}
