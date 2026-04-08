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
import { InventoryReportService } from 'src/app/services/inventory-report.service';

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

@Component({
  selector: 'app-item-history-by-fabric-total-wc',
  templateUrl: './item-history-by-fabric-total-wc.component.html',
  styleUrls: ['./item-history-by-fabric-total-wc.component.css']
})
export class ItemHistoryByFabricTotalWcComponent implements OnInit {

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
  isShowLatestManufacturingPrice = true
  isShowClosedBalances = false
  isLoading = false

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  gridApi!: GridApi;

  selectedYarns: string[] = [];

  sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };

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
      headerName: 'نوع الخيط',
      field: 'yarns_flat',
      filter: false,
      minWidth: 400,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: false,
      autoHeight: false,
      excludeFromFooter: true,
      cellRenderer: (p: any) => {
        const host = document.createElement('div');
        host.className = 'yarns-host';

        const arr = Array.isArray(p.value) ? p.value : [];
        host.innerHTML = arr.map((v: string) => `<div class="yarn-line">${v}</div>`).join('');
        return host;
      },
    },

    {
      headerName: 'كود المادة',
      field: 'code',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },
    {
      headerName: 'اسم المادة',
      field: 'name',
      filter: 'agSetColumnFilter',
      filterParams: {
        popupWidth: 520,
        excelMode: 'windows',
      },
      excludeFromFooter: true,
      wrapText: true,        // ✅ لفّ النص
      autoHeight: true,      // ✅ ارتفاع الصف يتعدل 

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
      headerName: 'حركة الصنف',
      field: 'details',
      cellRenderer: (element) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({
            id: element.data.id,
            code: element.data.code,
            name: element.data.name
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
    },

    {
      headerName: 'نوع الخيط',
      colId: 'yarn_filter',
      hide: true,
      filter: 'agSetColumnFilter',

      // ✅ هاي أهم سطر: هي اللي بتخلي الفلتر "يشوف" كل عناصر المصفوفة
      filterValueGetter: (p: any) => (p.data?.yarns_flat || []),

      filterParams: {
        
      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط
      
        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.yarns_flat || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
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
  // public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
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
    private _inventoryReportService: InventoryReportService,
  ) {
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
      (options) => this._reportWcService.selectInverntoryTotal(options),
      params,
      (response) => this.applyGridData(params, response),
      () => this.isLoading = false,
      { isShowClosedBalances: false }
    );
  }

  getClosedBalances(params: GridReadyEvent) {
    this.isLoading = true;
    this._inventoryReportService.fetchData(
      (options) => this._reportWcService.selectInverntoryTotal(options),
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
        this.calculateFooter();
        this.isLoading = false;
      }
    );
  }

  onModelUpdated() {
    this.calculateFooter();
  }

  calculateFooter() {
    if (!this.gridApi) return;

    const summary: any = {};
    const columns = this.gridApi.getColumnDefs() || [];

    // Filter numeric columns with aggFunc
    const numericColumns = columns.filter((col: any) => 
      col.type === 'numericColumn' && !col.excludeFromFooter
    );

    // Calculate totals
    numericColumns.forEach((col: any) => {
      const field = col.field;
      if (!field) return;

      let total = 0;
      this.gridApi.forEachNodeAfterFilterAndSort((node: any) => {
        if (!node.data) return;

        let value = 0;
        
        // Handle valueGetter
        if (typeof col.valueGetter === 'function') {
          try {
            value = Number(col.valueGetter({
              data: node.data,
              node: node,
              colDef: col,
              api: this.gridApi,
              columnApi: this.gridColumnApi
            })) || 0;
          } catch (e) {
            console.error('Error in valueGetter for field:', field, e);
            value = 0;
          }
        } else {
          // Get raw numeric value
          const rawValue = node.data[field];
          value = Number(rawValue) || 0;
        }

        total += value;
      });

      // Store the numeric total (not formatted)
      // The valueFormatter will format it automatically
      summary[field] = total;
    });

    // Add label to first text column
    const firstTextCol = columns.find((c: any) => !c.type || c.type !== 'numericColumn');
    if (firstTextCol && firstTextCol['field']) {
      summary[firstTextCol['field']] = 'الإجمالي';
    }

    this.pinnedBottomRowData = [summary];
    this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  // private heightRaf: number | null = null;

  // private scheduleRowHeightChanged(api: any) {
  //   if (this.heightRaf) return;
  //   this.heightRaf = requestAnimationFrame(() => {
  //     this.heightRaf = null;
  //     api.onRowHeightChanged();
  //   });
  // }

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.yarns) ? row.yarns : [];

    const rowsHtml = details.map((d: any) => `
    <tr>
      <td class="c-wo">${d.yarn_code ?? ''}</td>
      <td class="c-fabric-code">${d.yarn_name ?? ''}</td>
      <td class="c-fabric">${d.ratio ?? ''}</td>
      <td class="c-color">${d.wast_ratio ?? ''}</td>
    </tr>
  `).join('');

    return `
    <table class="details-table">
      <colgroup>
        <col class="c-yarn-code" />
        <col class="c-yarn" />
        <col class="c-q-ratio" />
        <col class="c-w-ratio" />
      </colgroup>

      <thead>
        <tr>
          <th>نوع الخيط</th>
          <th>كود الخيط</th>
          <th>نسبة الكمية</th>
          <th>نسبة الهالك</th>
        </tr>
      </thead>

      <tbody>${rowsHtml}</tbody>

    </table>
  `;
  }

}
