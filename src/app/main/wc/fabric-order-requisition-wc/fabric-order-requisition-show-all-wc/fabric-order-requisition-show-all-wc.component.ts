import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

import { ConfirmationService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { FabricOrderRequisitionWcService } from "src/app/services/main/wc/fabric-order-requisition-wc.service";
import { ConstantsService } from "src/app/services/constants.service";

@Component({
  selector: 'app-fabric-order-requisition-show-all-wc',
  templateUrl: './fabric-order-requisition-show-all-wc.component.html',
  styleUrls: ['./fabric-order-requisition-show-all-wc.component.css'],
  providers: [ConfirmationService]
})
export class FabricOrderRequisitionShowAllWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  
  // Parent Orders System Variables
  selectedOrders: string[] = []
  selectedParentOrderId: string = ''
  showMergeDialog: boolean = false
  showMergedOrdersDialog: boolean = false
  mergedOrders: any[] = []
  currentParentOrder: any = null

   //////////////////////////////////// PrimeNG /////////////////////////////////
   @ViewChild('dt1') dt1: Table | undefined;
   loading: boolean = true;
   selectedSellerName: any[] = []
   startDate: any
   endDate: any
   dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    private router: Router,
    private _constantsService: ConstantsService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

    
  }

  ngOnInit(): void {
    if(this.router.url === '/dashboard/show-all-closed-fabric-order-requisition-wc') {
      this.getData("closed")
    }
    else {
      this.getData()
    }
    this.customFilterForSellerName();

  }

getData(isClosed?: string) {
  const status = isClosed === 'closed' ? 'closed' : 'opened';
  
  console.log('📡 استدعاء API: GET /wc-fabric-order-requisition/all-with-merge-info?status=' + status);
  
  this._constantsService.spinner.show();
  this._fabricOrderRequisitionWcService.getAllWithMergeInfo(status)
    .subscribe({
      next: (response: any) => {
        this._constantsService.spinner.hide();
        console.log('✅ البيانات المستلمة (فقط Parent + Regular):', response);
        console.log('عدد الطلبيات:', response.length);
        
        // عرض إحصائيات
        const parents = response.filter(o => o.is_parent && o.merged_count > 1);
        const regular = response.filter(o => !o.is_parent);
        console.log(`📊 Parent Orders: ${parents.length}, Regular Orders: ${regular.length}`);
        
        this.fabrics = response;
        this.primengConfig.ripple = true;
        this.loading = false;
      },
      error: (error) => {
        this._constantsService.spinner.hide();
        console.error('❌ خطأ:', error);
        
        if (error.status === 404) {
          this._constantsService.errorMessage('Backend API endpoint غير موجود');
        } else {
          this._constantsService.errorMessage('حدث خطأ في جلب البيانات');
        }
        
        this.loading = false;
      }
    });
}

  // ===================== Parent Orders System Methods =====================
  
  // تحديد/إلغاء تحديد طلبية للدمج
  toggleOrderSelection(orderId: string): void {
    const index = this.selectedOrders.indexOf(orderId);
    if (index > -1) {
      this.selectedOrders.splice(index, 1);
    } else {
      this.selectedOrders.push(orderId);
    }
    
    // تعيين أول طلبية محددة كـ Parent افتراضياً
    if (this.selectedOrders.length > 0 && !this.selectedParentOrderId) {
      this.selectedParentOrderId = this.selectedOrders[0];
    }
  }

  // فتح نافذة دمج الطلبيات
  openMergeDialog(): void {
    if (this.selectedOrders.length < 2) {
      this._constantsService.errorMessage('يجب اختيار طلبيتين على الأقل للدمج');
      return;
    }
    this.showMergeDialog = true;
  }

  // دمج الطلبيات المحددة
  mergeSelectedOrders(): void {
    if (!this.selectedParentOrderId) {
      this._constantsService.errorMessage('يجب اختيار الطلبية الأم');
      return;
    }

    if (!this.selectedOrders.includes(this.selectedParentOrderId)) {
      this._constantsService.errorMessage('الطلبية الأم يجب أن تكون من ضمن الطلبيات المختارة');
      return;
    }

    // عرض تفاصيل الدمج
    const parentOrder = this.fabrics.find(f => f.id === this.selectedParentOrderId);
    const childOrders = this.selectedOrders
      .filter(id => id !== this.selectedParentOrderId)
      .map(id => this.fabrics.find(f => f.id === id));

    console.log('==================== عملية الدمج ====================');
    console.log('🔹 الطلبية الأم (Parent):');
    console.log('   - ID:', this.selectedParentOrderId);
    console.log('   - الاسم:', parentOrder?.name);
    console.log('   - الرقم:', parentOrder?.number);
    console.log('');
    console.log('🔹 الطلبيات المدموجة (Children):');
    childOrders.forEach((order, index) => {
      console.log(`   ${index + 1}. ID: ${order?.id}, الاسم: ${order?.name}, الرقم: ${order?.number}`);
    });
    console.log('');
    console.log('🔹 البيانات المرسلة للـ API:');
    const apiPayload = {
      orderIds: this.selectedOrders,
      parentOrderId: this.selectedParentOrderId
    };
    console.log('   Endpoint: PUT /wc-fabric-order-requisition/merge-orders');
    console.log('   Request Body:', JSON.stringify(apiPayload, null, 2));
    console.log('=====================================================');

    this._constantsService.spinner.show();
    this._fabricOrderRequisitionWcService.mergeOrders(this.selectedOrders, this.selectedParentOrderId)
      .subscribe({
        next: (response: any) => {
          this._constantsService.spinner.hide();
          console.log('✅ استجابة الـ API:', response);
          
          if (response && response.status === 1) {
            this._constantsService.successMessage(response.message || 'تم دمج الطلبيات بنجاح');
            this.showMergeDialog = false;
            this.selectedOrders = [];
            this.selectedParentOrderId = '';
            this.getData(this.router.url.includes('closed') ? 'closed' : undefined);
          } else {
            // حتى في حالة الخطأ، نغلق الـ dialog
            this.showMergeDialog = false;
            this._constantsService.errorMessage(response?.message || 'حدث خطأ أثناء الدمج');
            // تحديث البيانات في كل الأحوال
            this.getData(this.router.url.includes('closed') ? 'closed' : undefined);
          }
        },
        error: (error) => {
          this._constantsService.spinner.hide();
          this.showMergeDialog = false; // إغلاق الـ dialog في حالة الخطأ
          
          console.error('❌ خطأ من الـ API:', error);
          
          if (error.status === 404 || error.status === 0) {
            this._constantsService.errorMessage('Backend API غير موجود بعد. يرجى تطبيق endpoint: PUT /wc-fabric-order-requisition/merge-orders');
          } else {
            this._constantsService.errorMessage('حدث خطأ أثناء الدمج');
          }
          console.error('Merge error:', error);
        }
      });
  }

  // إلغاء عملية الدمج
  cancelMerge(): void {
    this.showMergeDialog = false;
    this.selectedParentOrderId = this.selectedOrders.length > 0 ? this.selectedOrders[0] : '';
  }

  // فصل طلبية
  detachOrder(event: Event, order: any): void {
    // التحقق إذا كان الـ Backend API موجود
    this.confirmationService.confirm({
      target: event.target!,
      message: `هل تريد فصل جميع الطلبيات المدموجة تحت "${order.name}"؟\n\nسيتم فصل ${order.merged_count - 1} طلبية وتحويلها إلى طلبيات منفصلة.\n\nملاحظة: يتطلب تطبيق Backend API أولاً`,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('==================== عملية الفصل ====================');
        console.log('🔹 الطلبية الأم (Parent) المراد فصل طلبياتها:');
        console.log('   - ID:', order.id);
        console.log('   - الاسم:', order.name);
        console.log('   - الرقم:', order.number);
        console.log('   - عدد الطلبيات المدموجة:', order.merged_count);
        console.log('');
        console.log('🔹 البيانات المرسلة للـ API:');
        console.log('   Endpoint: PUT /wc-fabric-order-requisition/detach-order/' + order.id);
        console.log('   URL Parameter: parentOrderId = ' + order.id);
        console.log('   الوظيفة: فصل جميع الطلبيات الـ Children تحت هذا الـ Parent');
        console.log('=====================================================');
        
        this._constantsService.spinner.show();
        this._fabricOrderRequisitionWcService.detachOrder(order.id).subscribe({
          next: (response: any) => {
            this._constantsService.spinner.hide();
            console.log('✅ استجابة الـ API:', response);
            
            if (response.status === 1) {
              this._constantsService.successMessage(response.message || 'تم فصل الطلبيات بنجاح');
              
              // إغلاق نافذة الطلبيات المدموجة إذا كانت مفتوحة
              if (this.showMergedOrdersDialog) {
                this.closeMergedOrdersDialog();
              }
              
              // تحديث القائمة
              this.getData(this.router.url.includes('closed') ? 'closed' : undefined);
            } else {
              this._constantsService.errorMessage(response.message || 'حدث خطأ أثناء الفصل');
            }
          },
          error: (error) => {
            this._constantsService.spinner.hide();
            
            console.error('❌ خطأ من الـ API:', error);
            
            // رسالة واضحة للمستخدم
            if (error.status === 404 || error.status === 0) {
              this._constantsService.errorMessage('Backend API غير موجود بعد. يرجى تطبيق endpoint: PUT /wc-fabric-order-requisition/detach-all/:parentId');
            } else {
              this._constantsService.errorMessage('حدث خطأ أثناء الفصل: ' + (error.message || 'خطأ غير معروف'));
            }
            console.error('Detach error:', error);
          }
        });
      }
    });
  }

  // عرض الطلبيات المدموجة
  showMergedOrders(order: any): void {
    if (!order.is_parent || order.merged_count <= 1) {
      return;
    }

    // console.log('==================== عرض الطلبيات المدموجة ====================');
    // console.log('🔹 الطلبية الأم (Parent):');
    // console.log('   - ID:', order.id);
    // console.log('   - الاسم:', order.name);
    // console.log('   - عدد الطلبيات المدموجة:', order.merged_count);
    // console.log('');
    // console.log('🔹 البيانات المرسلة للـ API:');
    // console.log('   Endpoint: GET /wc-fabric-order-requisition/merged-orders/' + order.id);
    // console.log('   URL Parameter: parentId = ' + order.id);
    // console.log('================================================================');

    this._constantsService.spinner.show();
    this._fabricOrderRequisitionWcService.getMergedOrders(order.id).subscribe({
      next: (response: any) => {
        this._constantsService.spinner.hide();
        // console.log('✅ استجابة الـ API (الطلبيات المدموجة):');
        // console.log(response);
        
        this.mergedOrders = response;
        this.currentParentOrder = order;
        this.showMergedOrdersDialog = true;
      },
      error: (error) => {
        this._constantsService.spinner.hide();
        console.error('❌ خطأ من الـ API:', error);
        
        if (error.status === 404 || error.status === 0) {
          this._constantsService.errorMessage('Backend API غير موجود بعد. يرجى تطبيق endpoint: GET /wc-fabric-order-requisition/merged-orders/:parentId');
        } else {
          this._constantsService.errorMessage('حدث خطأ أثناء جلب البيانات');
        }
        console.error('Get merged orders error:', error);
      }
    });
  }

  // حساب الكمية الإجمالية للطلبيات المدموجة
  getTotalMergedQuantity(): number {
    return this.mergedOrders.reduce((sum, order) => sum + (order.current_quantity || 0), 0);
  }

  // إغلاق نافذة الطلبيات المدموجة
  closeMergedOrdersDialog(): void {
    this.showMergedOrdersDialog = false;
    this.mergedOrders = [];
    this.currentParentOrder = null;
  }

  // الحصول على الكمية المعروضة (إجمالي أو عادي)
  getDisplayQuantity(order: any): number {
    return order.total_quantity || order.current_quantity || 0;
  }

  // الحصول على طلبية بواسطة ID (Helper method for template)
  getOrderById(id: string): any {
    return this.fabrics.find(f => f.id === id);
  }


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForSellerName() {
    const customFilterName = "seller-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSellerName

      if (this.selectedSellerName[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].seller_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }
  
   ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
   selectedDate(event) {
    this.filterService.register("date-filter", (value: any, filter: any[]): boolean => {
      filter = this.dateFilters
      
      if (event != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0
          if(filter[0] != null && filter[1] != null) {
            
            if (moment(value).format('YYYY-MM-DD') >= moment(filter[0]).format('YYYY-MM-DD') &&  
            moment(value).format('YYYY-MM-DD') <= moment(filter[1]).format('YYYY-MM-DD')) {
              return true;
              }
            
          } else if (filter[0] != null && filter[1] == null) {
            
            if (moment(value).format('YYYY-MM-DD') > moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
              } else if (moment(value).format('YYYY-MM-DD') < moment(filter[0]).format('YYYY-MM-DD')) {
                return false;
              } else {
                return true;
              }
          }

        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedSellerName = []
    this.dateFilters = []
  }


  onMultiselectedSellerName(event) {
    this.selectedSellerName = event
    this.dt1?._filter()
  }


  confirm(event: Event, element) {
    console.log("dfgsdffdsf");
    
    this.confirmationService.confirm({
        target: event.target!,
        message: 'تأكيد إغلاق الطلبية؟',
        acceptLabel: 'نعم',
        rejectLabel: 'لا',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.closeOrder(element);
        },
        reject: () => {
        }
    });
  }
  
  closeOrder(data) {
    this._constantsService.spinner.show()
    this._fabricOrderRequisitionWcService.closeOrderByRequisition(data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this.getData()
      }
      else {
          this._constantsService.userErrorMessage()
      }
    })
  }

}

