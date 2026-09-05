import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FabricOrderRequisitionWcService {

  urlService: string = "wc-fabric-order-requisition/"
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

  // Add Details
  addDetails(obj: any): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}add-details`;

    return this._http.post(url, obj,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // selectFabricsOrderRequisition
  selectFabricsOrderRequisition(fabricOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}fabrics-order-requisition/${fabricOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // inquireFabricsForOrderWc
  inquireFabricsForOrderWc(dyeingOrderRequisitionId: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}inquire-fabrics-order-requisition/${dyeingOrderRequisitionId}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // Select
  selectAll(isClosed): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}opened-orders`;
    if(isClosed == "closed") {
      url = `${this._constantsService.BASE_URL}${this.urlService}closed-orders`;
    }
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  closeOrderByRequisition(id: string): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}close-order-by-requisition/${id}`;

    return this._http.put(url, [],
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByWarehouseWc(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-warehouse-wc/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  selectByDyeingWd(id: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}by-dyeing-wd/${id}`;
    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
  }

  // ===================== Parent Orders System =====================
  
  // جلب جميع الطلبيات مع معلومات الـ Parent
  getOrdersWithParentInfo(isClosed: string = 'opened'): Observable<any> {
    let url = `${this._constantsService.BASE_URL}${this.urlService}with-parent-info/opened`;
    if (isClosed === 'closed') {
      url = `${this._constantsService.BASE_URL}${this.urlService}with-parent-info/closed`;
    }
    return this._http.get(url, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // دمج طلبيات
  mergeOrders(orderIds: string[], parentOrderId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}merge-orders`;
    return this._http.put(url, { orderIds, parentOrderId }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // فصل طلبية
  detachOrder(orderId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}detach-order/${orderId}`;
    return this._http.put(url, {}, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // تغيير الطلبية الأم
  changeParent(currentParentId: string, newParentId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}change-parent`;
    return this._http.put(url, { currentParentId, newParentId }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // فصل طلبية واحدة فقط من الدمج
  detachSingleOrder(orderId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}detach-single-order/${orderId}`;
    return this._http.put(url, {}, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // جلب الطلبيات المدموجة تحت طلبية معينة
  getMergedOrders(parentId: string): Observable<any> {
    const url = `${this._constantsService.BASE_URL}${this.urlService}merged-orders/${parentId}`;
    return this._http.get(url, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  getAllWithMergeInfo(status?: string): Observable<any> {
  const params = status ? `?status=${status}` : '';
  return this._http.get(`${this._constantsService.BASE_URL}${this.urlService}all-with-merge-info${params}`, {
    headers: new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}

}

