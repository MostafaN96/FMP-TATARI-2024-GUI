import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";

@Component({
  selector: 'app-item-hostory-by-dyed-fabric-total-we',
  templateUrl: './item-hostory-by-dyed-fabric-total-we.component.html',
  styleUrls: ['./item-hostory-by-dyed-fabric-total-we.component.css']
})
export class ItemHostoryByDyedFabricTotalWeComponent implements OnInit {

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
  isShowClosedBalances  = false

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
            if (!params.value) return '0';;
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
              name: element.data.dyed_fabric_name
            }).toString();
  
            const currentUrl = window.location.origin + window.location.pathname;
            const fullUrl = `${currentUrl}/details-total?${queryParams}`;
  
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
  

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
        public _sessionManagerService: SessionManagerService,
        public _constantsService: ConstantsService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
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
    this._reportWeService
      .selectInverntoryTotal({ isShowClosedBalances: false })
      .subscribe((response: any) => {
        this.applyGridData(params, response);
      });
  }
  
  getClosedBalances(params: GridReadyEvent) {
    this._reportWeService
      .selectInverntoryTotal({ isShowClosedBalances: true })
      .subscribe((response: any) => {
        this.applyGridData(params, response);
      });
  }
  
  applyGridData(params: GridReadyEvent, data: any) {
    this.fabrics = data;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.fabrics);
  
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
  
  //
  getAvgInputesPrice(fabrics){
    return this._sharedComponentService.getInputAmount(fabrics.details) / this._sharedComponentService.notZero(this._sharedComponentService.getTotalAmountQuantityInput(fabrics.details))
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
