import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { SharedCashService } from 'src/app/services/main/shared-cash.service';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

// grid angular Table
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-item-history-by-yarn',
  templateUrl: './item-history-by-yarn.component.html',
  styleUrls: ['./item-history-by-yarn.component.css']
})
export class ItemHistoryByYarnComponent implements OnInit {

  /////////////////// Variables ///////////////////
  public yarns: any[] = []
  gridApi!: GridApi;
  isShowTotalInput = true
  iShowTotalOutput = true
  iShowTotalBalance = true
  isShowTotalAmountInput = false
  iShowTotalAmountOutput = false
  iShowItemValue = false
  isShowAvgPrice = false
  isShowAvgInputes = false
  isShowLatestPrice = true
  isShowLatestPriceDollar = true
  isShowClosedBalances = false

  //////////////////////////////////// Grid Angular /////////////////////////////////
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  public columnDefs: ColDef[] = [
    {
      headerName: 'التسلسل',
      field: 'index',
      valueGetter: 'node.rowIndex + 1', // يعطي رقم الصف (يبدأ من 1)
      width: 80,
      cellClass: 'text-center',
      excludeFromFooter: true,
    },
    {
      headerName: 'المخزن',
      field: 'warehouse_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'كود المادة',
      field: 'yarn_code',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'اسم المادة',
      field: 'yarn_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'اللوط',
      field: 'yarn_lot_code',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'رقم طلب الغزل',
      field: 'consigment_yarn_number',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'الطلبية',
      field: 'wa_yarn_order_requisition_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'المورد',
      field: 'supplier_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'إجمالي الإدخال',
        valueFormatter: (params: any) => {
            if (!params.value) return '0';
            return Number(params.value).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          },
      field: 'input_quantity',
      hide: !this.isShowTotalInput,
      type: 'numericColumn',
    },
    {
      headerName: 'إجمالي الإخراج',
      field: 'output_quantity',
        valueFormatter: (params: any) => {
            if (!params.value) return '0';
            return Number(params.value).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          },
      hide: !this.iShowTotalOutput,
      type: 'numericColumn',
    },
    {
      headerName: 'الرصيد',
      field: 'current_quantity',
        valueFormatter: (params: any) => {
            if (!params.value) return '0';
            return Number(params.value).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          },
      hide: !this.iShowTotalBalance,
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة المدخلات',
      field: 'total_amount_input',
      valueGetter: params => Number(this._sharedComponentService.getInputAmount(params.data.details || [])),
      valueFormatter: (params: any) => {
          if (!params.value) return '0';
          return Number(params.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
      hide: !this.isShowTotalAmountInput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      type: 'numericColumn',
      aggFunc: 'sum',
    },
    {
      headerName: 'قيمة المخرجات',
      field: 'total_amount_output',
      valueGetter: params => Number(this._sharedComponentService.getOutputAmount(params.data.details || [])),
      valueFormatter: (params: any) => {
          if (!params.value) return '0';
          return Number(params.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
      hide: !this.iShowTotalAmountOutput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      type: 'numericColumn',
      aggFunc: 'sum',
    },
    {
      headerName: 'قيمة الصنف',
      field: 'item_amount',
      valueGetter: params => Number(this._sharedComponentService.getItemAmount(params.data.details || [])),
      valueFormatter: (params: any) => {
          if (!params.value) return '0';
          return Number(params.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
      hide: !this.iShowItemValue || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      type: 'numericColumn',
      aggFunc: 'sum',
    },
    {
      headerName: 'وسطي السعر',
      field: 'avg_price',
      valueGetter: params => Number(this._sharedComponentService.getAvgPrice(params.data.details || [])),
      valueFormatter: (params: any) => {
          if (!params.value) return '0';
          return Number(params.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
      hide: !this.isShowAvgPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      type: 'numericColumn',
      excludeFromFooter: true,
    },
    {
      headerName: 'وسطي سعر المدخلات',
      field: 'avg_inputes',
      valueGetter: params => Number(this.getAvgInputesPrice(params.data || [])),
      valueFormatter: (params: any) => {
          if (!params.value) return '0';
          return Number(params.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
      hide: !this.isShowAvgInputes || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      type: 'numericColumn',
      excludeFromFooter: true,
    },
    {
      headerName: 'آخر سعر',
      field: 'latest_price',
      hide: !this.isShowLatestPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      excludeFromFooter: true,
    },
    {
      headerName: 'آخر سعر دولار',
      field: 'latest_price_dollar',
      hide: !this.isShowLatestPriceDollar || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[5]),
      excludeFromFooter: true,
    },
    {
      headerName: 'حركة الصنف',
      field: 'details',
      cellRenderer: (params) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({
            id: params.data.yarn_id,
            code: params.data.yarn_code,
            name: params.data.yarn_name,
            warehouseId: params.data.warehouse_id,
            warehouseName: params.data.warehouse_name,
            yarnLotId: params.data.yarn_lot_id,
            yarnLotCode: params.data.yarn_lot_code,
            consigmentYarnId: params.data.consigment_yarn_id,
            consigmentYarnNumber: params.data.consigment_yarn_number,
            yarnOrderId: params.data.wa_yarn_order_requisition_id
          }).toString();

          const currentUrl = window.location.origin + window.location.pathname;
          const fullUrl = `${currentUrl}/details?${queryParams}`;

          if (event.ctrlKey || event.button === 1) {
            // Ctrl + Click أو Middle Click → تبويب جديد
            window.open(fullUrl, '_blank');
          } else {
            // Click عادي → بنفس الصفحة
            window.location.href = fullUrl;
          }
        });

        return link;
      },
      excludeFromFooter: true,
    }
  ].reverse(); gridColumnApi: any;
  ;
  totalFooterValues = {}
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    sortable: true,
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
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWaService: ReportWaService,
    public _exportDataService: ExportDataService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,

  ) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
  this.gridParams = params;
  this.getData(this.gridParams, "regular"); // أول تحميل يكون العادية
}

onToggleBalanceType(event: MatCheckboxChange) {
  const balanceType = event.checked ? "closed" : "regular";
  this.getData(this.gridParams, balanceType);
}

getData(params: GridReadyEvent, balanceType: string) {
  if (balanceType === "closed") {
    this.getClosedBalances(params);
  } else {
    this.getRegularBalances(params);
  }
}

getRegularBalances(params: GridReadyEvent) {
  this._reportWaService
    .selectInverntoryDetails({ isShowClosedBalances: false })
    .subscribe((response: any) => {
      this.applyGridData(params, response);
    });
}

getClosedBalances(params: GridReadyEvent) {
  this._reportWaService
    .selectInverntoryDetails({ isShowClosedBalances: true })
    .subscribe((response: any) => {
      this.applyGridData(params, response);
    });
}

applyGridData(params: GridReadyEvent, data: any) {
  this.yarns = data;
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.gridApi.setRowData(this.yarns);

  requestAnimationFrame(() => setTimeout(() => this.updateFooter(), 100));

  setTimeout(() => {
    const viewport = this.agGridElement.nativeElement.querySelector('.ag-center-cols-viewport');
    if (viewport) viewport.scrollLeft = viewport.scrollWidth;
  }, 100);
}

  onModelUpdated() {
    this.updateFooter();
  }

  updateFooter() {
    if (!this.gridApi) return;

    requestAnimationFrame(() => {
      const summary: any = {};
      const columns = (this.gridApi.getColumnDefs() || []).filter((c: any) => 'field' in c);

      // 🧹 تفريغ القيم القديمة
      this.totalFooterValues = {};

      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node.data) return;

        columns.forEach((col: any) => {
          const field = col.field;
          if (!field) return;

          // تجاهل الأعمدة غير الرقمية
          if (col.excludeFromFooter) return;

          let val = 0;

          // 🔹 لو عنده valueGetter
          if (typeof col.valueGetter === 'function') {
            try {
              const params = {
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
          } else if (node.data[field] != null) {
            val = Number(String(node.data[field]).replace(/[^\d.-]/g, '')) || 0;
          }

          if (!this.totalFooterValues[field]) {
            this.totalFooterValues[field] = 0;
          }

          this.totalFooterValues[field] += val;
        });
      });

      // 🔢 صياغة الأرقام بالفوتر
      columns
        .filter(col => col['type'] === 'numericColumn' && !col['excludeFromFooter'])
        .forEach((col: any) => {
          const field = col.field;
          if (!field) return;

          if (col.type === 'numericColumn' && !col.excludeFromFooter) {
            // console.log("field :::::::::: ", field);

            summary[field] = Number(this.totalFooterValues[field] || 0).toLocaleString(
                'en-US',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }
              );
          } else {
            summary[field] = '';
          }
          // console.log("summary[field] :::: ", summary[field]);

          // أولاً: انتظر شوي لتتأكد أن الجدول رسم حاله
          setTimeout(() => {
            // اختار خلية الـ footer (pinned bottom row)
            const inputQuantityFooterCell = document.querySelector(`.ag-floating-bottom-viewport .ag-cell-value[col-id="${field}"]`);

            if (inputQuantityFooterCell) {

              (inputQuantityFooterCell as HTMLElement).innerText = summary[field]; // 👈 الرقم اللي بدك تحطه
            }

          }, 500);

        });



      // 🏷️ ضع كلمة "الإجمالي" في أول عمود نصي
      const firstTextCol = columns.find(
        (c: any) => !c.type || c.type !== 'numericColumn'
      );
      if (firstTextCol && firstTextCol['field']) {
        summary[firstTextCol['field']] = 'الإجمالي';
      }



      //     console.log('📊 Final footer summary:', summary);
      this.pinnedBottomRowData = [summary];
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
      console.log('✅ pinned row set in grid:', this.gridApi.getPinnedBottomRowCount());
      this.gridApi.refreshCells({ force: true });


    });
  }

  getAvgInputesPrice(yarns) {
    return this._sharedComponentService.getInputAmount(yarns.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(yarns.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
