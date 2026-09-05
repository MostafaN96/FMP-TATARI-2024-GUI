import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consigment-dyeing-history-report-wd',
  templateUrl: './consigment-dyeing-history-report-wd.component.html',
  styleUrls: ['./consigment-dyeing-history-report-wd.component.css']
})
export class ConsigmentDyeingHistoryReportWdComponent implements OnInit {

  reportData: any[] = [];
  consigmentNumber: string = "";
  consigmentDyeingId: string = "";

  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedTypeOfRequisition: any[] = [];
  selectedFabricName: any[] = [];
  selectedDyerName: any[] = [];
  selectedColorName: any[] = [];
  selectedGradeItemName: any[] = [];
  dateFilters: any;

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.customFilterForTypeOfRequisition();
    this.customFilterForFabricName();
    this.customFilterForDyerName();
    this.customFilterForColorName();
    this.customFilterForGradeItemName();
  }

  getData() {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.consigmentDyeingId = params['consigmentDyeingId'];
      this.consigmentNumber = params['consigmentNumber'];
      this._reportWdService.selectAllMovementsByConsigmentDyeing(this.consigmentDyeingId)
        .subscribe((response: any) => {
          this.reportData = response;
          this.primengConfig.ripple = true;
          this.loading = false;
        });
    });
  }

  customFilterForTypeOfRequisition() {
    this.filterService.register("type-of-requisition-filter-cd", (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypeOfRequisition;
      if (this.selectedTypeOfRequisition[0] != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].type_of_requisition) return true;
        }
        return false;
      }
      return true;
    });
  }

  customFilterForFabricName() {
    this.filterService.register("fabric-name-filter-cd", (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricName;
      if (this.selectedFabricName[0] != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].fabric_name) return true;
        }
        return false;
      }
      return true;
    });
  }

  customFilterForDyerName() {
    this.filterService.register("dyer-name-filter-cd", (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyerName;
      if (this.selectedDyerName[0] != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].bussinessman_name) return true;
        }
        return false;
      }
      return true;
    });
  }

  customFilterForColorName() {
    this.filterService.register("color-name-filter-cd", (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorName;
      if (this.selectedColorName[0] != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].color_name) return true;
        }
        return false;
      }
      return true;
    });
  }

  customFilterForGradeItemName() {
    this.filterService.register("grade-item-name-filter-cd", (value: any[], filter: any[]): boolean => {
      filter = this.selectedGradeItemName;
      if (this.selectedGradeItemName[0] != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        for (let j = 0; j < filter.length; j++) {
          if (value == filter[j].grade_item_name) return true;
        }
        return false;
      }
      return true;
    });
  }

  selectedDate(event) {
    this.filterService.register("date-filter-cd", (value: any, filter: any[]): boolean => {
      filter = this.dateFilters;
      if (event != null) {
        if (!filter || !filter.length) return true;
        if (!value) return false;
        if (filter[0] != null && filter[1] != null) {
          return moment(value).format('YYYY-MM-DD') >= moment(filter[0]).format('YYYY-MM-DD') &&
                 moment(value).format('YYYY-MM-DD') <= moment(filter[1]).format('YYYY-MM-DD');
        } else if (filter[0] != null && filter[1] == null) {
          return moment(value).format('YYYY-MM-DD') == moment(filter[0]).format('YYYY-MM-DD');
        }
        return false;
      }
      return true;
    });
    this.dt1?.filter(event, "date", "date-filter-cd");
  }

  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedTypeOfRequisition = [];
    this.selectedFabricName = [];
    this.selectedDyerName = [];
    this.selectedColorName = [];
    this.selectedGradeItemName = [];
  }

  onMultiselectedTypeOfRequisition(event) { this.selectedTypeOfRequisition = event; this.dt1?._filter(); }
  onMultiselectedFabricName(event) { this.selectedFabricName = event; this.dt1?._filter(); }
  onMultiselectedDyerName(event) { this.selectedDyerName = event; this.dt1?._filter(); }
  onMultiselectedColorName(event) { this.selectedColorName = event; this.dt1?._filter(); }
  onMultiselectedGradeItemName(event) { this.selectedGradeItemName = event; this.dt1?._filter(); }

  getRunningBalance(index) {
    let balance = parseFloat(this.reportData[0]?.quantity) || 0;
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportData[i + 1].quantity) || 0;
      if (this.reportData[i + 1].input_output == '1') {
        balance = balance + quantity;
      } else if (this.reportData[i + 1].input_output == '2') {
        // form dyeing - no balance change
      } else {
        balance = balance - quantity;
      }
    }
    return balance;
  }

  getWast(quantity: number, dyeingQuantity: number) {
    let result = quantity - dyeingQuantity;
    return ((result / quantity) * 100) >= 0 ? ((result / quantity) * 100) : 0;
  }

  goToRequisitionPage(typeOfRequisition = '') {
    if (typeOfRequisition == 'اذن نقل من (C) الى (D)') return `/dashboard/show-all-transport-wc-wd-requisition/details`;
    else if (typeOfRequisition == 'اذن نقل من (D) الى (C)') return `/dashboard/show-all-transport-wd-wc-requisition/details`;
    else if (typeOfRequisition == 'اذن تسوية') return `/dashboard/show-all-reconciliation-requisition-wd/details`;
    else if (typeOfRequisition == 'اذن تشكيل') return `/dashboard/show-all-form-dyeing-requisition-wd/details`;
    else if (typeOfRequisition == 'اذن صباغة') return `/dashboard/show-all-dyeing-requisition-wd/details`;
    else if (typeOfRequisition == 'اذن نقل بين المصابغ') return `/dashboard/show-all-transport-between-dyers-requisition/details`;
    return ``;
  }
}
