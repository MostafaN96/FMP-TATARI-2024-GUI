import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportWeService {

  urlService: string = "we-report/"
  constructor(private _http: HttpClient,
    private _constantsService: ConstantsService) { }

    selectPriceWe(id: string, colorId: string, colorCode: string): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-price/${id}/${colorId}/${colorCode}`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }
  
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
  
    selectInventoryTotalByFabric(fabricId: string): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-total-by-fabric/${fabricId}`;
      return this._http.get(url,
        {
          headers: new HttpHeaders({
            'authorization': `Bearer ${localStorage.getItem('token')}`
          })
        });
    }
  
    selectInventoryDetailsByWarehouseByFabric(fabricId: string, warehouseId: string): Observable<any> {
      const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-details-by-warehouse-by-fabric/${fabricId}/${warehouseId}`;
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

    
    dyeingReportByFabric(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyeing-report-by-fabric/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
    
  dyedFabricReportByOrderBySeller(orderId: string, sellerId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}dyed-fabric-order-by-order-by-seller/${orderId}/${sellerId}`;
    return this._http.get(url,
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

  selectDyersAndRequisitions(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-dyers-requisitions`;
    return this._http.get(url);
  }

  selectDyersAndRequisitionsForDirectSell(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-dyers-requisitions/${id}`;
    return this._http.get(url);
  }
  
  selectByFabric(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-by-fabric/${id}`;
    return this._http.get(url);
  }

  selectSellByFabric(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-sell-by-fabric/${id}`;
    return this._http.get(url);
  }

  selectSellBySeller(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-sell-by-seller/${id}`;
    return this._http.get(url);
  }

  selectSellBySellers(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-sell-by-sellers`;
    return this._http.get(url);
  }

  selectInverntoryFabric(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}select-inventory-fabric`;
    return this._http.post(url,object);
  }



  salesReport(): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}sales-report`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  inquireFabricAvilabilityReportWe(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabric-avilability-report-we`;
    return this._http.post(url,object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  inquireFabricAvilabilityTotalReportWe(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabric-avilability-total-report-we`;
    return this._http.post(url,object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  inquireFabricAvilabilityByDyeingOrderRequisitionReportWe(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabric-avilability-by-dyeing-order-requisition-report-we`;
    return this._http.post(url,object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  inquireFabricAvilabilityByDyeingOrderRequisitionTotalReportWe(object:any): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabric-avilability-by-dyeing-order-requisition-total-report-we`;
    return this._http.post(url,object,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }
}