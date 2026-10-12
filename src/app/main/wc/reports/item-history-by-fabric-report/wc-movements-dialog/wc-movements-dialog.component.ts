import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { SharedComponentService } from 'src/app/services/shared-component.service';
import { wcInputRequisitionRoute } from '../wc-input-details-dialog/wc-input-details-dialog.component';

// حركة واحدة كما تعرضها النافذة
export interface WcMovement {
  typeKey: string;      // لرابط الإذن: نص النوع في التقرير أو مفتاح نوع حركة الدفعة
  typeLabel: string;
  number: any;
  requisitionId: string | null;
  date: any;
  inQty: number;
  outQty: number;
}

/**
 * نافذة «حركة السطر» في تقرير جرد الخام: الإدخال والإخراج بالتاريخ مع الرصيد المتراكم،
 * ومقارنة الرصيد الأخير بالرصيد المتوقع (رصيد السطر أو الدفعة).
 */
@Component({
  selector: 'app-wc-movements-dialog',
  templateUrl: './wc-movements-dialog.component.html',
  styleUrls: ['./wc-movements-dialog.component.css']
})
export class WcMovementsDialogComponent implements OnChanges {

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() title = 'حركة السطر';
  @Input() headerItems: { label: string, value: any }[] = [];
  @Input() movements: WcMovement[] = [];
  @Input() openingBalance = 0;     // رصيد أول المدة (مع فلتر التاريخ)
  @Input() expectedBalance: number | null = null; // للمقارنة في آخر الجدول
  @Input() expectedLabel = 'الرصيد الحالي';
  @Input() loading = false;
  @Input() note = '';

  rows: (WcMovement & { balance: number })[] = [];
  totalIn = 0;
  totalOut = 0;

  constructor(public _sharedComponentService: SharedComponentService) { }

  ngOnChanges(): void {
    let balance = Number(this.openingBalance) || 0;
    this.totalIn = 0;
    this.totalOut = 0;
    this.rows = [...(this.movements || [])]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || Number(a.number) - Number(b.number))
      .map((m) => {
        balance += (Number(m.inQty) || 0) - (Number(m.outQty) || 0);
        this.totalIn += Number(m.inQty) || 0;
        this.totalOut += Number(m.outQty) || 0;
        return { ...m, balance };
      });
  }

  get finalBalance() { return this.rows.length ? this.rows[this.rows.length - 1].balance : Number(this.openingBalance) || 0; }

  get matchesExpected() {
    return this.expectedBalance == null || Math.abs(this.finalBalance - Number(this.expectedBalance)) < 0.05;
  }

  route(m: WcMovement) { return m.requisitionId ? wcInputRequisitionRoute(m.typeKey) : ''; }

  close(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }
}
