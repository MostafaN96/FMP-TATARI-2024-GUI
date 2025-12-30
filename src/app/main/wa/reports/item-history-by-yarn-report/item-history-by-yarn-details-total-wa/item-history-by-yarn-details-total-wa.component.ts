import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, ColGroupDef, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-history-by-yarn-details-total-wa',
  templateUrl: './item-history-by-yarn-details-total-wa.component.html',
  styleUrls: ['./item-history-by-yarn-details-total-wa.component.css']
})
export class ItemHistoryByYarnDetailsTotalWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByYranWaDetails: any[] = []
  balance: number = 0
  warehouseName: string = ""
  yarnCode: string = ""
  yarnName: string = ""
  yarnLotCode: string = ""

  //////////////////////////////////// Grid Angular /////////////////////////////////
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  gridApi!: GridApi;
  public columnDefs: ColDef[] = [

    // التسلسل
    {
      headerName: 'التسلسل',
      field: 'index',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      cellClass: 'text-center',
      excludeFromFooter: true,
      filter: false,
    },

    {
      headerName: 'ادخال',
      field: 'input',
      type: 'numericColumn',
      valueGetter: (p: any) => (p.data?.input_output == '1' ? Number(p.data?.quantity || 0) : 0),
      valueFormatter: this.format2.bind(this),
      filter: false,
    },

    {
      headerName: 'اخراج',
      field: 'output',
      type: 'numericColumn',
      valueGetter: (p: any) => (p.data?.input_output == '0' ? Number(p.data?.quantity || 0) : 0),
      valueFormatter: this.format2.bind(this),
      filter: false,
    },

    {
      headerName: 'رصيد',
      field: 'balance',
      type: 'numericColumn',
      valueGetter: (p: any) => this.getBalanceForDisplayedRow(p.node.rowIndex, 'quantity'),
      valueFormatter: this.format2.bind(this),
      filter: false,
    },

    {
      headerName: 'سعر الإدخال',
      field: 'input_price',
      type: 'numericColumn',
      hide: !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      valueGetter: (p: any) => (p.data?.input_output == '1' ? Number(p.data?.price || 0) : 0),
      valueFormatter: this.format2.bind(this),
      excludeFromFooter: true,
      filter: false,
    },

    {
      headerName: 'سعر الإخراج',
      field: 'output_price',
      type: 'numericColumn',
      hide: !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      valueGetter: (p: any) => (p.data?.input_output == '0' ? Number(p.data?.price || 0) : 0),
      valueFormatter: this.format2.bind(this),
      excludeFromFooter: true, // مثل جدولك الفوتر فاضي هون
      filter: false,
    },

    // قيمة المخرجات/المدخلات (شرط صلاحية)
    {
      headerName: 'قيمة المدخلات',
      field: 'input_amount',
      type: 'numericColumn',
      hide: !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      valueGetter: (p: any) => (p.data?.input_output == '1' ? Number(this._sharedComponentService.getCollectTimes(p.data?.quantity, p.data?.price)) : 0),
      valueFormatter: this.format2.bind(this),
      filter: false,
    },

    {
      headerName: 'قيمة المخرجات',
      field: 'output_amount',
      type: 'numericColumn',
      hide: !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      valueGetter: (p: any) => (p.data?.input_output == '0' ? Number(this._sharedComponentService.getCollectTimes(p.data?.quantity, p.data?.price)) : 0),
      valueFormatter: this.format2.bind(this),
      filter: false,
    },
    { headerName: 'المخزن', field: 'warehouse_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'اللوط', field: 'yarn_lot_code', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'رقم طلب الغزل', field: 'consigment_yarn_number', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true , 
    wrapText: true,        // ✅ لفّ النص
  autoHeight: true,      // ✅ ارتفاع الصف يتعدل 
   },
    { headerName: 'الى رقم طلب الغزل', field: 'to_consigment_yarn_number', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },

    // رقم الإذن (مع لينك)
    {
      headerName: 'رقم الاذن',
      field: 'number',
      cellRenderer: (params: any) => {
        const a = document.createElement('a');
        a.textContent = params.value ?? '';
        a.style.cursor = 'pointer';
        a.style.color = '#007bff';

        a.addEventListener('click', (event: MouseEvent) => {
          const url = this.buildRequisitionUrl(params.data);
          if ((event as any).ctrlKey || (event as any).button === 1) window.open(url, '_blank');
          else window.location.href = url;
        });

        return a;
      },
      excludeFromFooter: true,
      filter: false,
    },

    {
      headerName: 'التاريخ',
      field: 'date',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      valueFormatter: (p: any) => this.formatDateArabic(p.value),
      excludeFromFooter: true,
    },

    {
      headerName: 'نوع الاذن',
      field: 'type_of_requisition',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      valueGetter: (p: any) => `${p.data?.type_of_requisition ?? ''} ${p.data?.from_manufacturer_name ?? ''}`.trim(),
      excludeFromFooter: true,
    },
    { headerName: 'الجهة', field: 'side_of', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true, 
    wrapText: true,        // ✅ لفّ النص
  autoHeight: true,      // ✅ ارتفاع الصف يتعدل 
   },

    { headerName: 'طلبية شراء', field: 'order_purchase_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true, 
    wrapText: true,        // ✅ لفّ النص
  autoHeight: true,      // ✅ ارتفاع الصف يتعدل 
},
    { headerName: 'الوثيقة', field: 'document', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },


    // تفاصيل الإذن (أيقونة)
    {
      headerName: 'تفاصيل الإذن',
      field: 'requisition_details',
      cellRenderer: (params: any) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.addEventListener('click', (event: MouseEvent) => {
          const url = this.buildRequisitionUrl(params.data);
          if ((event as any).ctrlKey || (event as any).button === 1) window.open(url, '_blank');
          else window.location.href = url;
        });

        return link;
      },
      excludeFromFooter: true,
      sortable: false,
      filter: false,
      width: 120,
      cellClass: 'text-center',
    },

  ].reverse();
  gridColumnApi: any;
  totalFooterValues = {}
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // ⬅️ كان 160 أو 200    resizable: true,
    sortable: true,
    filter: 'agSetColumnFilter',
    filterParams: {
      excelMode: 'windows',
    },
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...',
  };
  pinnedBottomRowData: any
  gridParams!: GridReadyEvent;
  gridOptions: GridOptions = {
    domLayout: 'normal',
    ensureDomOrder: true,
    suppressHorizontalScroll: false,
    alwaysShowVerticalScroll: false,
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }
  };

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
  }

  ngOnInit(): void {
  }

  format2(params: any): string {
    const v = Number(params?.value ?? 0);
    return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatDateArabic(value: any): string {
    if (!value) return '';
    // إذا عندك date جاهز كـ string من API خليها مثل ما هي
    // أو استخدم Date pipe بنفس منطقك:
    try {
      const d = new Date(value);
      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
    } catch {
      return String(value);
    }
  }



  getRowHeight = (params: any) => {
    if (params.node.rowPinned) return 45;

    const count = params.data?.details?.length || 1;

    // هيدر + صفوف التفاصيل + فوتر
    return 35 + (count * 28) + 35;
  };


  onGridReady(params: GridReadyEvent) {
    this.gridParams = params;
    this.route.queryParams
      .subscribe(headerParams => {
        this.getData(this.gridParams, headerParams); // أول تحميل يكون العادية

      })
  }

  getData(params: GridReadyEvent, headerParams) {
    this._reportWaService.selectInventoryTotalByYarnByWarehouse(headerParams['id'], headerParams['warehouseId']).subscribe((response: any) => {
      this.warehouseName = headerParams['warehouseName']
      this.yarnCode = headerParams['code']
      this.yarnName = headerParams['name']
      this.yarnLotCode = headerParams['yarnLotCode']
      this.applyGridData(params, response);
    });
  }

  applyGridData(params: GridReadyEvent, data: any) {
    this.reportByYranWaDetails = data;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.reportByYranWaDetails);

    requestAnimationFrame(() => setTimeout(() => this.updateFooter(), 100));

    setTimeout(() => {
      const viewport = this.agGridElement.nativeElement.querySelector('.ag-center-cols-viewport');
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 100);
  }


  onModelUpdated() {
    this.updateFooter();
    // this.gridApi?.refreshCells({ force: true, columns: ['balance'] });
  }

  updateFooter() {
    if (!this.gridApi) return;

    requestAnimationFrame(() => {
      const summary: any = {};

      // ✅ Type Guards
      const isColDef = (c: ColDef | ColGroupDef): c is ColDef => {
        return (c as ColDef).field !== undefined;
      };

      const isNumeric = (c: ColDef) => c.type === 'numericColumn' && !c['excludeFromFooter'];

      // ✅ فقط ColDef اللي عنده field
      const columns: ColDef[] = (this.gridApi.getColumnDefs() || [])
        .filter((c): c is ColDef | ColGroupDef => !!c)
        .filter(isColDef);

      // 🧹 تفريغ القيم القديمة
      this.totalFooterValues = {};

      // ✅ helper: running balance حسب ترتيب الصفوف الظاهر
      const getBalanceForRowIndex = (rowIndex: number, typeQuantity: string = 'quantity'): number => {
        let balance = 0;
        let firstDone = false;

        this.gridApi.forEachNodeAfterFilterAndSort((node) => {
          if (!node?.data || node.rowIndex == null) return;
          if (node.rowIndex > rowIndex) return;

          const qty = parseFloat(node.data?.[typeQuantity] ?? 0) || 0;

          // نفس منطقك: البداية من أول صف بدون شرط input_output
          if (!firstDone) {
            balance = qty;
            firstDone = true;
            return;
          }

          if (node.data?.input_output == '1') balance += qty;
          else balance -= qty;
        });

        return balance;
      };

      // ✅ 1) SUM لكل الأعمدة الرقمية
      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node.data) return;

        columns.forEach((col: ColDef) => {
          const field = col.field;
          if (!field) return;

          if (col['excludeFromFooter']) return;

          let val = 0;

          if (typeof col.valueGetter === 'function') {
            try {
              const params: any = {
                data: node.data,
                node,
                colDef: col,
                api: this.gridApi,
                columnApi: this.gridColumnApi,
              };
              val = Number(col.valueGetter(params)) || 0;
            } catch {
              val = 0;
            }
          } else if ((node.data as any)[field] != null) {
            val = Number(String((node.data as any)[field]).replace(/[^\d.-]/g, '')) || 0;
          }

          this.totalFooterValues[field] = (this.totalFooterValues[field] || 0) + val;
        });
      });

      // ✅ 2) الرصيد بالفوتر = آخر رصيد (Closing Balance)
      let lastBalance = 0;
      let lastIdx = -1;

      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node?.data || node.rowIndex == null) return;
        if (node.rowIndex >= lastIdx) {
          lastIdx = node.rowIndex;
          lastBalance = getBalanceForRowIndex(node.rowIndex, 'quantity');
        }
      });

      // إذا عمود الرصيد اسمه field='balance'
      this.totalFooterValues['balance'] = lastBalance;

      // ✅ 3) صياغة الأرقام للفوتر
      columns
        .filter(isNumeric)
        .forEach((col: ColDef) => {
          const field = col.field!;
          summary[field] = Number(this.totalFooterValues[field] || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          // (اختياري) نفس طريقتك لكتابة الرقم داخل خلية pinned
          setTimeout(() => {
            const cell = document.querySelector(
              `.ag-floating-bottom-viewport .ag-cell-value[col-id="${field}"]`
            );
            if (cell) (cell as HTMLElement).innerText = summary[field];
          }, 500);
        });

      // 🏷️ "الإجمالي" بأول عمود نصي
      const firstTextCol: ColDef | undefined = columns.find(
        (c) => !c['excludeFromFooter'] && c.type !== 'numericColumn'
      );

      if (firstTextCol?.field) {
        summary[firstTextCol.field] = 'الإجمالي';
      }

      // ✅ 4) Set pinned bottom row
      this.pinnedBottomRowData = [summary];
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
      this.gridApi.refreshCells({ force: true });
    });
  }


  /** Gets the total quantity of all transactions. */
  getInputQuantity(index, typeQuantity) {
    let balance = parseFloat(this.reportByYranWaDetails[0][typeQuantity])
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByYranWaDetails[i + 1][typeQuantity]);
      if (this.reportByYranWaDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  private getBalanceForDisplayedRow(rowIndex: number, field: string = 'quantity'): number {
    let balance = 0;

    // اجمع من أول صف لحد الصف الحالي (مثل منطقك)
    this.gridApi.forEachNodeAfterFilterAndSort((node) => {
      if (!node?.data) return;
      if (node.rowIndex == null) return;

      const qty = Number(node.data?.[field] || 0);

      if (node.rowIndex === 0) {
        // نفس منطقك: البداية من أول صف
        balance = qty;
      } else if (node.rowIndex <= rowIndex) {
        if (node.data?.input_output == '1') balance += qty;
        else balance -= qty;
      }
    });

    return balance;
  }

  getAvgInputesPrice() {
    return this._sharedComponentService.getInputAmount(this.reportByYranWaDetails) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(this.reportByYranWaDetails))
  }

  private buildRequisitionUrl(row: any): string {
    const path = this.goToRequisitionPage(row?.type_of_requisition, row?.is_order);
    if (!path) return '#';

    const qp = new URLSearchParams({ id: String(row?.requisition_id ?? '') }).toString();

    // إذا عندك baseHref مختلف قلّي، بس غالبًا هيك تمام
    return `${window.location.origin}${path}?${qp}`;
  }

  goToRequisitionPage(typeOfRequisition, isOrder = "0") {
    if (typeOfRequisition == 'اذن اضافة' && isOrder == "0") {
      return `/dashboard/show-all-add-requisition/details`
    }
    else if (typeOfRequisition == 'اذن اضافة' && isOrder == "1") {
      return `/dashboard/show-all-add-requisition/order-details`
    }
    else if (typeOfRequisition == 'اذن نقل من (A) الى (B)') {
      return `/dashboard/show-all-transport-wa-wb-requisition/details`
    }
    else if (typeOfRequisition == 'اذن بيع') {
      return `/dashboard/show-all-sell-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition/details`
    }
    else if (typeOfRequisition == 'اذن مرتجع') {
      return `/dashboard/show-all-return-requisition/details`
    }
    else if (typeOfRequisition == 'اذن نقل من (B) الى (A)') {
      return `/dashboard/show-all-transport-wb-wa-requisition/details`
    }
    else if (typeOfRequisition == 'اذن تنفيذ طلبية') {
      return `/dashboard/show-all-execute-order-requisition-wa/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-wa/details`
    }
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
