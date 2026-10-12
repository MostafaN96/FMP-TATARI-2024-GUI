import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharedComponentService } from 'src/app/services/shared-component.service';

// صفحة تفاصيل كل نوع إذن في جرد الخام (تُفتح بـ ?id=<معرّف الإذن>).
// يقبل نص نوع الإذن كما في التقرير، أو مفتاح نوع حركة الدفعة (sell, transport_wc_wd ...)
export function wcInputRequisitionRoute(type: string): string {
  switch (type) {
    case 'اذن اضافة': return '/dashboard/show-all-add-requisition-wc/details';
    case 'اذن تسوية':
    case 'reconciliation': return '/dashboard/show-all-reconciliation-requisition-wc/details';
    case 'اذن تصنيع': return '/dashboard/show-all-manufacturing-requisition-wb/details';
    case 'اذن نقل من (D) الى (C)': return '/dashboard/show-all-transport-wd-wc-requisition/details';
    case 'اذن نقل من (C) الى (D)':
    case 'transport_wc_wd': return '/dashboard/show-all-transport-wc-wd-requisition/details';
    case 'اذن بيع':
    case 'sell': return '/dashboard/show-all-sell-requisition-wc/details';
    case 'اذن مرتجع':
    case 'return': return '/dashboard/show-all-return-requisition-wc/details';
    case 'اذن نقل بين المخازن':
    case 'transition_wh': return '/dashboard/show-all-transition-between-wh-requisition-wc/details';
    case 'اذن نقل بين الطلبيات':
    case 'transition_orders': return '/dashboard/show-all-transition-between-orders-requisition-wc/details';
    default: return '';
  }
}

/**
 * نافذة «تفاصيل الإدخال» لتقريري جرد الخام (التفصيلي والإجمالي).
 * تعرض حركات الإدخال التي حسب منها التقرير «إجمالي الإدخال» للسطر نفسه
 * (وضمن فترة التاريخ إن كانت مطبّقة)، فيتطابق مجموعها مع رقم السطر.
 */
@Component({
  selector: 'app-wc-input-details-dialog',
  templateUrl: './wc-input-details-dialog.component.html',
  styleUrls: ['./wc-input-details-dialog.component.css']
})
export class WcInputDetailsDialogComponent {

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  // [{ label, value }] تعريف السطر في رأس النافذة
  @Input() headerItems: { label: string, value: any }[] = [];
  @Input() dateRange: { fromDate: string, toDate: string } | null = null;

  private _movements: any[] = [];
  @Input() set movements(rows: any[]) {
    this._movements = (rows || []).filter((d: any) => d?.input_output == 1);
  }
  get movements(): any[] { return this._movements; }

  constructor(public _sharedComponentService: SharedComponentService) { }

  get total(): number {
    return this._movements.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
  }

  close(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  requisitionRoute(type: string): string {
    return wcInputRequisitionRoute(type);
  }
}
