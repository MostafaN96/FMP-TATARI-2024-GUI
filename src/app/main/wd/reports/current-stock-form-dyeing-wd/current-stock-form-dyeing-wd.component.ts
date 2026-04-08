import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowSelectedEvent,
  SideBarDef,
  ValueFormatterParams
} from 'ag-grid-community';

import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-stock-form-dyeing-wd',
  templateUrl: './current-stock-form-dyeing-wd.component.html',
  styleUrls: ['./current-stock-form-dyeing-wd.component.css']
})
export class CurrentStockFormDyeingWdComponent implements OnInit {

  showDyeingServciesUpdate = false
  selectedDataToUpdate: any
  isShowCheckBox = false

  @Output() parentFun = new EventEmitter<any>();

  loading: boolean = true;
  selection = new SelectionModel(true);

  ///////////////////////////////// General ////////////////////////////////////////////////
  formDyeingFabricsByDyer: any
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;

  gridApi: GridApi | null = null;
  rowSelection: 'single' | 'multiple' = 'multiple';
  public sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };
  gridOptions: GridOptions = {
    domLayout: 'normal',
    ensureDomOrder: true,
    suppressHorizontalScroll: false,
    alwaysShowVerticalScroll: false,
  };
  defaultColDef: ColDef = {
    sortable: true,
    filter: 'agSetColumnFilter',
    floatingFilter: false,
    resizable: true,
    minWidth: 110,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    wrapText: false,
    autoHeight: false,
    filterParams: {
      excelMode: 'windows'
    }
  };
  public columnDefs: ColDef[] = [
    {
      colId: 'selectAction',
      headerName: 'اختيار',
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      filter: false,
      sortable: false,
      suppressMenu: true,
      pinned: 'right' as const,
      checkboxSelection: () => this.isShowCheckBox,
      headerCheckboxSelection: () => this.isShowCheckBox,
      cellRenderer: () => this.isShowCheckBox ? '' : '<i class="fas fa-plus update-symbol"></i>'
    },
    { field: 'work_order_number_details', headerName: 'امر التشغيل', width: 105, minWidth: 105, maxWidth: 105 },
    { field: 'wc_fabric_order_requisition_name', headerName: 'الطلبية', cellClass: 'ag-cell-wrap' },
    { field: 'fabric_name', headerName: 'نوع القماش الخام', cellClass: 'ag-cell-wrap' },
    { field: 'fabric_code', headerName: 'كود المادة', width: 95, minWidth: 95, maxWidth: 95 },
    // { field: 'fabric_dyeing_code', headerName: 'كود المصبغة' },
    { field: 'consigment_dyeing_number', headerName: 'رقم الرسالة' },
    {
      field: 'is_prepare_dyeing',
      headerName: 'نزل المصبغة',
      width: 85,
      minWidth: 85,
      maxWidth: 85,
      valueFormatter: (params) => Number(params.value) === 1 ? '✓' : '✗'
    },
    { field: 'quantity', headerName: 'الكمية المشكلة', width: 95, minWidth: 95, maxWidth: 95, valueFormatter: this.numberFormatter.bind(this) },
    { field: 'current_quantity', headerName: 'الكمية التشكيل المتبقية', width: 110, minWidth: 110, maxWidth: 110, valueFormatter: this.numberFormatter.bind(this) },
    { field: 'price', headerName: 'السعر', width: 85, minWidth: 85, maxWidth: 85, valueFormatter: this.numberFormatter.bind(this) },
    { field: 'price_dollar', headerName: 'السعر دولار', width: 90, minWidth: 90, maxWidth: 90, valueFormatter: this.numberFormatter.bind(this) },
    {
      colId: 'amount',
      headerName: 'القيمة',
      width: 95,
      minWidth: 95,
      maxWidth: 95,
      valueGetter: (params) => this._sharedComponentService.getCollectTimes(params.data?.current_quantity, params.data?.price),
      valueFormatter: this.numberFormatter.bind(this)
    },
    {
      colId: 'amount_dollar',
      headerName: 'القيمة دولار',
      width: 105,
      minWidth: 105,
      maxWidth: 105,
      valueGetter: (params) => this._sharedComponentService.getCollectTimes(params.data?.current_quantity, params.data?.price_dollar),
      valueFormatter: this.numberFormatter.bind(this)
    },
    {
      field: 'date',
      headerName: 'التاريخ',
      valueFormatter: (params) => this._sharedComponentService.formatDate(params.value)
    },
    {
      colId: 'requisitionLink',
      field: 'number',
      headerName: 'رقم الاذن',
      width: 90,
      minWidth: 90,
      maxWidth: 90,
      cellClass: 'ag-link-cell',
      cellRenderer: (params) => {
        const href = this.getRequisitionLink(params.data);
        if (!href) {
          return params.value || '';
        }
        return `<a href="${href}">${params.value || ''}</a>`;
      }
    },
    { field: 'color_category_name', headerName: 'فئة اللون' },
    { field: 'color_name', headerName: 'اللون' },
    { field: 'color_code', headerName: 'كود اللون' },
    {
      field: 'dyeingServices',
      headerName: 'المعالجات',
      minWidth: 190,
      cellClass: 'ag-cell-wrap',
      autoHeight: true,
      wrapText: true,
      valueGetter: (params) => this.getDyeingServicesText(params.data),
      cellRenderer: (params) => this.getDyeingServicesHtml(params.data)
    },
    { field: 'dyed_fabric_name', headerName: 'القماش المصبوغ', cellClass: 'ag-cell-wrap' },
    { field: 'dyed_fabric_code', headerName: 'كود القماش المصبوغ', width: 90, minWidth: 90, maxWidth: 90 },
    { field: 'fabric_width', headerName: 'عرض القماش', width: 75, minWidth: 75, maxWidth: 75 },
    { field: 'fabric_quantity_m2', headerName: 'وزن القماش م2', width: 85, minWidth: 85, maxWidth: 85 },
    // { field: 'seller_name', headerName: 'العميل', cellClass: 'ag-cell-wrap' },
    // { field: 'order_quantity', headerName: 'الكمية المطلوبة', valueFormatter: this.numberFormatter.bind(this) },
    // { field: 'dyeing_current_quantity', headerName: 'الكمية المتبقية', valueFormatter: this.numberFormatter.bind(this) },
    // { field: 'order_number', headerName: 'رقم طلبية العميل' },
    {
      colId: 'updateAction',
      headerName: 'تعديل المعالجات',
      filter: false,
      sortable: false,
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      suppressMenu: true,
      cellRenderer: () => '<i class="fas fa-edit update-symbol"></i>'
    }
  ];
  gridColumnApi: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    public _exportDataService: ExportDataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
  }

  listen() {
    this.getData()
  }

  getData() {
    this.loading = false;

    if (this.gridApi) {
      setTimeout(() => {
        this.gridApi?.refreshHeader();
        this.scrollCenterViewportToEnd();
      });
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getData();
    this.scrollCenterViewportToEnd();
  }

  private scrollCenterViewportToEnd() {
    setTimeout(() => {
      const viewport = this.agGridElement?.nativeElement?.querySelector('.ag-center-cols-viewport');
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 100);
  }

  onRowSelected(event: RowSelectedEvent) {
    if (!event.data || !this.isShowCheckBox) {
      return;
    }

    this.parentFun.emit(event.data);

    if (event.node.isSelected()) {
      this.selection.select(event.data);
    } else {
      this.selection.deselect(event.data);
    }
  }

  onCellClicked(event: CellClickedEvent) {
    if (!event.data) {
      return;
    }

    if (event.colDef.colId === 'selectAction' && !this.isShowCheckBox) {
      this.parentFun.emit(event.data);
      return;
    }

    if (event.colDef.colId === 'updateAction') {
      this.getSelectedData(event.data);
      setTimeout(() => {
        document.getElementById('update-form')?.scrollIntoView();
      });
    }
  }

  clear() {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.deselectAll();
    this.selection.clear();
  }

  exportAgGridToExcel() {
    this.gridApi?.exportDataAsExcel({
      fileName: 'جرد_التشكيل_المتبقي.xlsx'
    });
  }

  private numberFormatter(params: ValueFormatterParams): string {
    if (params.value === null || params.value === undefined || params.value === '') {
      return '';
    }

    const value = Number(params.value);
    if (isNaN(value)) {
      return params.value;
    }

    return value.toLocaleString('en-US');
  }

  private formatDate(value: any): string {
    if (!value) {
      return '';
    }

    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toLocaleDateString('ar-EG', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }

  private getRequisitionLink(data: any): string | null {
    const route = this.goToRequisitionPage(data?.type_of_requisition, data?.wd_form_dyeing_order_requisition_id);
    const requisitionId = data?.requisition_id;

    if (!route || !requisitionId) {
      return null;
    }

    const urlTree = this.router.createUrlTree([route], { queryParams: { id: requisitionId } });
    return this.router.serializeUrl(urlTree);
  }

  private getDyeingServicesText(data: any): string {
    return (data?.dyeingServices || [])
      .map((item) => `${item?.name || ''}${item?.price !== undefined && item?.price !== null ? ` (${this.numberFormatter({ value: item.price } as ValueFormatterParams)})` : ''}`)
      .filter((item) => !!item)
      .join(' | ');
  }

  private getDyeingServicesHtml(data: any): string {
    const services = data?.dyeingServices || [];
    if (!services.length) {
      return '';
    }

    return services
      .map((item) => {
        const name = item?.name || '';
        const price = item?.price !== undefined && item?.price !== null
          ? this.numberFormatter({ value: item.price } as ValueFormatterParams)
          : '';

        return `
          <div class="wd-service-row">
            <span class="wd-service-name">${name}</span>
            <span class="wd-service-price">${price}</span>
          </div>
        `;
      })
      .join('');
  }

  getSelectedData(selectedData: any) {
    this.showDyeingServciesUpdate = true
    selectedData.wd_form_dyeing_requisition_details_id = selectedData.id
    this.selectedDataToUpdate = selectedData
  }

  goToRequisitionPage(typeOfRequisition, wdFormDyeingOrderRequisitionId) {
    if(wdFormDyeingOrderRequisitionId != null) {
      return `/dashboard/show-all-form-dyeing-order-requisition-wd/order-details`
    } else {
      return `/dashboard/show-all-form-dyeing-requisition-wd/details`
    }

    // if (typeOfRequisition == 'اذن تشكيل') {
      // return `/dashboard/show-all-form-dyeing-requisition-wd/details`
    // }
    // else if (typeOfRequisition == 'اذن صباغة') {
    //   return `/dashboard/show-all-dyeing-requisition-wd/details`
    // }
    return
  }
}
