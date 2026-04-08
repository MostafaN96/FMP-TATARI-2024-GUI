import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ExportDataService } from 'src/app/services/export-data.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ReportWbService } from 'src/app/services/main/wb/report-wb.service';

type MyColDef<TData = any> = ColDef<TData> & { excludeFromFooter?: boolean };

@Component({
  selector: 'app-item-history-total-report-wb',
  templateUrl: './item-history-total-report-wb.component.html',
  styleUrls: ['./item-history-total-report-wb.component.css']
})
export class ItemHistoryTotalReportWbComponent implements OnInit {
  yarns: any[] = [];
  isLoading = false;

  isShowTotalInput = true;
  iShowTotalOutput = true;
  iShowTotalBalance = true;
  isShowTotalAmountInput = false;
  iShowTotalAmountOutput = false;
  iShowItemValue = false;
  isShowAvgPrice = false;
  isShowAvgInputes = false;
  isShowAvgWast = true;
  isShowLatestPrice = true;
  isShowLatestPriceDollar = true;
  isShowClosedBalances = false;

  gridApi!: GridApi;
  gridColumnApi: any;

  pinnedBottomRowData: any[] = [];
  totalFooterValues: any = {};

  loadingOverlayTemplate = `
    <div class="ag-custom-loading-overlay">
      <div class="ag-custom-spinner"></div>
      <div>جاري تحميل البيانات...</div>
    </div>
  `;
  noRowsOverlayTemplate = `<span class="ag-overlay-loading-center">لا توجد بيانات لعرضها</span>`;

  public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
  public loadingCellRendererParams: any = { loadingMessage: 'One moment please...' };

  public defaultColDef: MyColDef = {
    flex: 1,
    minWidth: 160,
    resizable: true,
    sortable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    wrapText: false,
    autoHeight: false,
  };

  public sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };

  public columnDefs: MyColDef[] = [
    {
      headerName: 'التسلسل',
      field: 'index',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      maxWidth: 90,
      cellClass: 'text-center',
      excludeFromFooter: true,
      filter: false,
      sortable: false,
    },
    { headerName: 'المصنع', field: 'manufacturer_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'رقم المادة', field: 'yarn_code', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'اسم المادة', field: 'yarn_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    {
      headerName: 'إجمالي الإدخال',
      field: 'input_quantity',
      valueFormatter: this.num2,
      hide: !this.isShowTotalInput,
      type: 'numericColumn',
    },
    {
      headerName: 'إجمالي الإخراج',
      field: 'output_quantity',
      valueFormatter: this.num2,
      hide: !this.iShowTotalOutput,
      type: 'numericColumn',
    },
    {
      headerName: 'الرصيد',
      field: 'current_quantity',
      valueFormatter: this.num2,
      hide: !this.iShowTotalBalance,
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة المدخلات',
      field: 'total_amount_input',
      valueGetter: p => Number(this._sharedComponentService.getInputAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowTotalAmountInput || !this.canViewPrices(),
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة المخرجات',
      field: 'total_amount_output',
      valueGetter: p => Number(this._sharedComponentService.getOutputAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalAmountOutput || !this.canViewPrices(),
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة الصنف',
      field: 'item_amount',
      valueGetter: p => Number(this._sharedComponentService.getItemAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowItemValue || !this.canViewPrices(),
      type: 'numericColumn',
    },
    {
      headerName: 'وسطي السعر',
      field: 'avg_price',
      valueGetter: p => Number(this._sharedComponentService.getAvgPrice(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowAvgPrice || !this.canViewPrices(),
      excludeFromFooter: true,
      type: 'numericColumn',
    },
    {
      headerName: 'وسطي سعر المدخلات',
      field: 'avg_inputes',
      valueGetter: p => Number(this.getAvgInputesPrice(p.data)) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowAvgInputes || !this.canViewPrices(),
      excludeFromFooter: true,
      type: 'numericColumn',
    },
    {
      headerName: 'وسطي الهالك',
      field: 'avg_wast',
      valueGetter: p => Number(this._sharedComponentService.getAvgWast(p.data?.details || [], 'quantity', 'dyeing_quantity')) || 0,
      valueFormatter: (p: any) => `${this.num2(p)}%`,
      hide: !this.isShowAvgWast,
      excludeFromFooter: true,
      type: 'numericColumn',
    },
    { headerName: 'آخر سعر', field: 'latest_price', valueFormatter: this.num2, hide: !this.isShowLatestPrice || !this.canViewPrices(), excludeFromFooter: true, type: 'numericColumn' },
    { headerName: 'آخر سعر دولار', field: 'latest_price_dollar', valueFormatter: this.num2, hide: !this.isShowLatestPriceDollar || !this.canViewPrices(), excludeFromFooter: true, type: 'numericColumn' },
    {
      headerName: 'حركة المادة',
      field: 'details_link',
      excludeFromFooter: true,
      filter: false,
      sortable: false,
      cellRenderer: (p: any) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        const queryParams = new URLSearchParams({
          id: p.data.yarn_id,
          code: p.data.yarn_code,
          name: p.data.yarn_name,
          manufacturerId: p.data.manufacturer_id,
          manufacturerName: p.data.manufacturer_name
        }).toString();

        const currentUrl = window.location.origin + window.location.pathname;
        const fullUrl = `${currentUrl}/details-total?${queryParams}`;
        link.href = fullUrl;

        link.addEventListener('click', (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          window.location.href = fullUrl;
        });

        return link;
      }
    }
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
    this._sharedComponentService.angularMaterialTableConfig();
  }

  ngOnInit(): void {
    this.getData();
  }

  canViewPrices() {
    return this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[8]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.isLoading) {
      this.gridApi.showLoadingOverlay();
      return;
    }

    if (!this.yarns?.length) {
      this.gridApi.showNoRowsOverlay();
    }
  }

  getData() {
    this.loadData({ isShowClosedBalances: this.isShowClosedBalances });
  }

  onToggleBalanceType(event: any) {
    this.getData();
  }

  resetFilters() {
    this.clearAll();
  }

  clearAll() {
    if (!this.gridApi || !this.gridColumnApi) return;

    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridColumnApi.applyColumnState({ defaultState: { sort: null, sortIndex: null } });

    this.updateFooter();
  }

  onModelUpdated() {
    this.updateFooter();
  }

  private loadData(payload: { isShowClosedBalances: boolean }) {
    this.isLoading = true;

    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }

    this._reportWbService.selectInverntoryTotal(payload)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res: any) => {
        this.yarns = res || [];

        if (!this.gridApi) {
          return;
        }

        this.gridApi.setRowData(this.yarns);
        requestAnimationFrame(() => this.updateFooter());

        if (this.yarns.length) {
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.showNoRowsOverlay();
        }
      }, () => {
        this.yarns = [];

        if (!this.gridApi) {
          return;
        }

        this.gridApi.setRowData([]);
        this.gridApi.showNoRowsOverlay();
      });
  }

  updateFooter() {
    if (!this.gridApi) return;

    requestAnimationFrame(() => {
      const summary: any = {};
      const columns = (this.gridApi.getColumnDefs() || []).filter((c: any) => 'field' in c);

      this.totalFooterValues = {};

      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node.data) return;

        columns.forEach((col: any) => {
          const field = col.field;
          if (!field || col.excludeFromFooter) return;

          let val = 0;
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

      columns
        .filter(col => col['type'] === 'numericColumn' && !col['excludeFromFooter'])
        .forEach((col: any) => {
          const field = col.field;
          if (!field) return;

          summary[field] = Number(this.totalFooterValues[field] || 0);
        });

      const firstTextCol = columns.find((c: any) => !c.type || c.type !== 'numericColumn');
      if (firstTextCol && firstTextCol['field']) {
        summary[firstTextCol['field']] = 'الإجمالي';
      }

      this.pinnedBottomRowData = [summary];
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
      this.gridApi.refreshCells({ force: true });
    });
  }

  notZero(n: any) {
    n = +n;
    if (!n) n = 1;
    return n;
  }

  getAvgInputesPrice(yarns: any) {
    return this._sharedComponentService.getInputAmount(yarns?.details || []) /
      this.notZero(this._sharedComponentService.getTotalAmountQuantityInput(yarns?.details || []));
  }

  num2(params: any) {
    const v = (params && params.value != null) ? Number(params.value) : 0;
    return (Number.isFinite(v) ? v : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
