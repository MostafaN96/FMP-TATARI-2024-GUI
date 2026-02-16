import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

@Component({
  selector: 'app-item-history-by-fabric',
  templateUrl: './item-history-by-fabric.component.html',
  styleUrls: ['./item-history-by-fabric.component.css']
})
export class ItemHistoryByFabricComponent implements OnInit {

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
  isShowLatestPrice = false
  isShowLatestPriceDollar = false
  isShowLatestManufacturingPrice = false
  isShowClosedBalances = false

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
        field: 'fabric_code',
        filter: 'agSetColumnFilter',
        filterParams: {
          excelMode: 'windows',
        },
        excludeFromFooter: true,
      },
      {
        headerName: 'اسم المادة',
        field: 'fabric_name',
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
        hide: !this.isShowTotalAmountInput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
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
        hide: !this.iShowTotalAmountOutput || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
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
        hide: !this.iShowItemValue || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
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
        hide: !this.isShowAvgPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
        type: 'numericColumn',
        excludeFromFooter: true,
      },
      {
        headerName: 'وسطي سعر المدخلات',
        field: 'avg_inputes',
        valueGetter: params => Number(this._sharedComponentService.getAvgInputesPrice(params.data || [])),
        valueFormatter: (params: any) => {
            if (!params.value) return '0';
            return Number(params.value).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          },
        hide: !this.isShowAvgInputes || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
        type: 'numericColumn',
        excludeFromFooter: true,
      },
      {
        headerName: 'آخر سعر',
        field: 'latest_price',
        hide: !this.isShowLatestPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
        excludeFromFooter: true,
      },
      {
        headerName: 'آخر سعر دولار',
        field: 'latest_price_dollar',
        hide: !this.isShowLatestPriceDollar || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
        excludeFromFooter: true,
      },
      {
          headerName: 'آخر سعر تصنيع',
          field: 'latest_manufacturing_price',
          hide: !this.isShowLatestManufacturingPrice || !this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[11]),
          excludeFromFooter: true,
        },

        {
      headerName: 'ايصال التصنيع',
      field: 'documents',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'document-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="document-line">${v}</div>`).join('');
        return host;
      },
    },

        {
      headerName: 'رقم الا ستاند',
      field: 'storage_place',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'storage-place-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="storage-place-line">${v}</div>`).join('');
        return host;
      },
    },

        {
      headerName: 'اجمالي الايصال',
      field: 'manufacturing_quantity',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'manufacturing-quantity-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="manufacturing-quantity-line">${v}</div>`).join('');
        return host;
      },
    },

        {
      headerName: 'اجمالي الاخراج',
      field: 'output_current_quantity',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'manufacturing-current-quantity-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="manufacturing-current-quantity-line">${v}</div>`).join('');
        return host;
      },
    },

        {
      headerName: 'الرصيد المتبقي',
      field: 'manufacturing_current_quantity',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'current-quantity-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="current-quantity-line">${v}</div>`).join('');
        return host;
      },
    },

        {
      headerName: 'حالة الجودة',
      field: 'status_grade',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'status-grade-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="status-grade-line">${v}</div>`).join('');
        return host;
      },
    },
        {
      headerName: 'ملاحظات الجودة',
      field: 'statement',
      filter: false,
      minWidth: 200,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'statement-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="statement-line">${v}</div>`).join('');
        return host;
      },
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
              id: element.data.fabric_id,
              code: element.data.fabric_code,
              name: element.data.fabric_name,
              warehouseName: element.data.warehouse_name,
              warehouseId: element.data.warehouse_id,
              consigmentManufacturingId: element.data.consigment_manufacturing_id,  
              consigmentNumber: element.data.consigment_manufacturing_number,
              fabricOrderId: element.data.wc_fabric_order_requisition_id
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
      },
      
    {
      headerName: 'ايصال التصنيع',
      colId: 'documents',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.documents || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.documents || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'رقم الاستند',
      colId: 'storage_place',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.storage_place || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.storage_place || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'حالة الجودة',
      colId: 'status_grade',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.status_grade || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.status_grade || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'ملاحظات الجودة',
      colId: 'statement',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.statement || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.statement || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'اجمالي الايصال',
      colId: 'manufacturing_quantity',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.manufacturing_quantity || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.manufacturing_quantity || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'اجمالي الاخراج',
      colId: 'output_current_quantity',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.output_current_quantity || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.output_current_quantity || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
      
    {
      headerName: 'الرصيد المتبقي',
      colId: 'manufacturing_current_quantity',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.manufacturing_current_quantity || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.manufacturing_current_quantity || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },
    
    ].reverse(); 
    gridColumnApi: any;
    totalFooterValues = {}
    public defaultColDef: ColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
    sortable: true,
    };
    sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };
    public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
    public loadingCellRendererParams: any = {
      loadingMessage: 'One moment please...',
    };
    pinnedBottomRowData: any
  gridParams!: GridReadyEvent;
  
  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWcService: ReportWcService,
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
      this._reportWcService
        .selectInverntoryDetails({ isShowClosedBalances: false })
        .subscribe((response: any) => {
          this.applyGridData(params, response);
        });
    }
    
    getClosedBalances(params: GridReadyEvent) {
      this._reportWcService
        .selectInverntoryDetails({ isShowClosedBalances: true })
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
  
    ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  
}
