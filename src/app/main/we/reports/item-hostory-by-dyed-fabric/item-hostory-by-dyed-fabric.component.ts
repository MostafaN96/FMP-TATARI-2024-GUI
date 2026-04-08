import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { InventoryReportService } from 'src/app/services/inventory-report.service';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-item-hostory-by-dyed-fabric',
  templateUrl: './item-hostory-by-dyed-fabric.component.html',
  styleUrls: ['./item-hostory-by-dyed-fabric.component.css']
})
export class ItemHostoryByDyedFabricComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
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
  isLoading = false


  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
    gridApi!: GridApi;
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
      field: 'dyed_fabric_code',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'اسم المادة',
      field: 'dyed_fabric_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'إجمالي الإدخال',
      field: 'input_quantity',
        valueFormatter: (params: any) => {
            if (!params.value) return '0';
            return Number(params.value).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          },
      hide: !this.isShowTotalInput,
      type: 'numericColumn',
      aggFunc: 'sum',
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
      aggFunc: 'sum',
      // ⚠️ لا تضع excludeFromFooter هون
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
      hide: !this.isShowTotalAmountInput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
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
      hide: !this.iShowTotalAmountOutput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
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
      hide: !this.iShowItemValue || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
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
      hide: !this.isShowAvgPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
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
      hide: !this.isShowAvgInputes || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
      type: 'numericColumn',
      excludeFromFooter: true,
    },
    {
      headerName: 'آخر سعر',
      field: 'latest_price',
      hide: !this.isShowLatestPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
      excludeFromFooter: true,
    },
    {
      headerName: 'آخر سعر دولار',
      field: 'latest_price_dollar',
      hide: !this.isShowLatestPriceDollar || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]),
      excludeFromFooter: true,
    },
    {
      headerName: 'حركة الصنف',
      field: 'details',
      cellRenderer: (element) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({
            id: element.data.dyed_fabric_id,
            code: element.data.dyed_fabric_code,
            name: element.data.dyed_fabric_name,
            warehouseName: element.data.warehouse_name,
            warehouseId: element.data.warehouse_id
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
    minWidth: 150,
    resizable: true,
    sortable: true,
    wrapText: true,
    autoHeight: true,
    cellClass: 'ag-cell-wrap',
    suppressMenu: false,
    headerClass: 'ag-header-wrap'
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...',
  };
  pinnedBottomRowData: any
gridParams!: GridReadyEvent;


  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    public _sessionManagerService: SessionManagerService,
    public _constantsService: ConstantsService,
    private _inventoryReportService: InventoryReportService,
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridParams = params;
    this.loadData(params, false);
  }

  onToggleBalanceType(event: MatCheckboxChange) {
    this.loadData(this.gridParams, event.checked);
  }

  resetFilters() {
    if (this.gridApi) {
      this.gridApi.setFilterModel(null);
    }
  }

  private loadData(params: GridReadyEvent, isShowClosedBalances: boolean) {
    if (isShowClosedBalances) {
      this.getClosedBalances(params);
    } else {
      this.getRegularBalances(params);
    }
  }

getRegularBalances(params: GridReadyEvent) {
  this.isLoading = true;
  this._inventoryReportService.fetchData(
    (options) => this._reportWeService.selectInverntoryDetails(options),
    params,
    (response) => this.applyGridData(params, response),
    () => this.isLoading = false,
    { isShowClosedBalances: false }
  );
}

getClosedBalances(params: GridReadyEvent) {
  this.isLoading = true;
  this._inventoryReportService.fetchData(
    (options) => this._reportWeService.selectInverntoryDetails(options),
    params,
    (response) => this.applyGridData(params, response),
    () => this.isLoading = false,
    { isShowClosedBalances: true }
  );
}

applyGridData(params: GridReadyEvent, data: any) {
  this.fabrics = data;
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this._inventoryReportService.applyDataToGrid(
    data,
    this.gridApi,
    this.gridColumnApi,
    this.agGridElement,
    () => {
      this.updateFooter();
      this.isLoading = false;
    }
  );
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
            // Store numeric value - valueFormatter will format it automatically
            summary[field] = Number(this.totalFooterValues[field] || 0);
          } else {
            summary[field] = '';
          }
          // console.log("summary[field] :::: ", summary[field]);

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

  //
  getAvgInputesPrice(fabrics) {
    return this._sharedComponentService.getInputAmount(fabrics.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(fabrics.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
