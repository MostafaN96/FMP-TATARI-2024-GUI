import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';

// AG Grid Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

type MyColDef<TData = any> = ColDef<TData> & { excludeFromFooter?: boolean };

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

@Component({
  selector: 'app-item-history-report-wd',
  templateUrl: './item-history-report-wd.component.html',
  styleUrls: ['./item-history-report-wd.component.css']
})

export class ItemHistoryReportWdComponent implements OnInit {

  fabrics: any[] = [];
  loading = true;
  isLoading = false;

  // نفس المتغيرات
  isShowTotalInput = true;
  iShowTotalOutput = true;
  iShowTotalBalance = true;
  iShowTotalBalanceWithForm = true;
  iShowTotalBalanceForm = true;
  iShowTotalBalanceFormPreparedDyeing = true;
  isShowTotalAmountInput = false;
  iShowTotalAmountOutput = false;
  iShowItemValue = false;
  isShowAvgPrice = false;
  isShowAvgInputes = false;
  isShowAvgWast = true;
  isShowLatestPrice = true;
  isShowLatestPriceDollar = true;
  isShowClosedBalances  = false;

  startDate: any;
  endDate: any;

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  gridApi!: GridApi;
  gridColumnApi: any;

  pinnedBottomRowData: any[] = [];
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
    minWidth: 180,
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
      cellClass: 'text-center',
      excludeFromFooter: true,
      filter: false,
      sortable: false,
    },

    // ✅ فلاتر set مثل PrimeNG multiSelect
    { headerName: 'المصبغة', field: 'dyeing_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'رقم المادة', field: 'fabric_code', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    // { headerName: 'كود المصبغة', field: 'fabric_dyeing_code', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'اسم المادة', field: 'fabric_name', cellClass: 'details-cell ag-wrap-cell', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'رقم الرسالة', field: 'consigment_dyeing_number', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'الطلبية', field: 'wc_fabric_order_requisition_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },

    // ✅ أعمدة أرقام محسوبة من details
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
      valueGetter: p => Number(this.getCurrentQuantity(p.data)) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalBalance,
      type: 'numericColumn',
    },
    {
      headerName: 'رصيد القابل للتشكيل',
      field: 'current_quantity_with_form',
      valueGetter: p => Number((p.data?.current_quantity >= 0) ? p.data.current_quantity : 0) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalBalanceWithForm,
      type: 'numericColumn',
    },
    {
      headerName: 'المشكل',
      field: 'form_current_quantity',
      // valueGetter: p =>
      //   Number(this._sharedComponentService.getTotalQuantityWithCondition(
      //     p.data?.details || [],
      //     "form_current_quantity",
      //     "type_of_requisition",
      //     "اذن تشكيل"
      //   )) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalBalanceForm,
      type: 'numericColumn',
    },
    {
      headerName: 'المشكل نزل المصبغة',
      field: 'form_prepare_dyeing_current_quantity',
      // valueGetter: p =>
      //   Number(this._sharedComponentService.getTotalQuantityWithCondition(
      //     p.data?.details || [],
      //     "form_prepare_dyeing_current_quantity",
      //     "type_of_requisition",
      //     "اذن تشكيل"
      //   )) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalBalanceFormPreparedDyeing,
      type: 'numericColumn',
    },

    // ✅ أعمدة نصية multi-line من details مثل جدول داخل خلية
    {
  headerName: 'اللون',
  colId: 'color_name',
  field: 'color_name',
  hide: !this.iShowTotalBalanceFormPreparedDyeing,
  excludeFromFooter: true,
  cellClass: 'ag-wrap-cell',
  autoHeight: true,

  valueGetter: (p: any) => this.getColorList(p.data),
  cellRenderer: (p: any) => (p.value || []).join('<br/>'),

  filter: 'agSetColumnFilter',
  filterParams: {
    excelMode: 'windows',
    values: (params: any) => {
      const set = new Set<string>();
      params.api.forEachNode((node: any) => {
        this.getColorList(node.data).forEach((x: string) => set.add(x));
      });
      params.success(Array.from(set));
    },
    keyCreator: (p: any) => String(p.value),
  },
},

    {
  headerName: 'امر الشغل',
  colId: 'work_order_number',
  field: 'work_order_number',
  hide: !this.iShowTotalBalanceFormPreparedDyeing,
  excludeFromFooter: true,
  cellClass: 'ag-wrap-cell',
  autoHeight: true,

  // ✅ القيمة الحقيقية للعمود: Array (كل بند لوحده)
  valueGetter: (p: any) => this.getWorkOrderList(p.data),

  // ✅ العرض فقط (متعدد الأسطر)
  cellRenderer: (p: any) => (p.value || []).join('<br/>'),

  // ✅ فلتر Set
  filter: 'agSetColumnFilter',
  filterParams: {
    excelMode: 'windows',

    // ✅ أهم شي: قيم الفلتر تكون مفصّلة (مش مجمّعة)
    values: (params: any) => {
      const set = new Set<string>();
      params.api.forEachNode((node: any) => {
        this.getWorkOrderList(node.data).forEach((x: string) => set.add(x));
      });
      params.success(Array.from(set));
    },

    // حتى ما يصير في مشاكل تحويل
    keyCreator: (p: any) => String(p.value),
  },
    },

    {
      headerName: 'قيمة المدخلات',
      field: 'total_amount_input',
      valueGetter: p => Number(this._sharedComponentService.getInputAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowTotalAmountInput,
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة المخرجات',
      field: 'total_amount_output',
      valueGetter: p => Number(this._sharedComponentService.getOutputAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowTotalAmountOutput,
      type: 'numericColumn',
    },
    {
      headerName: 'قيمة الصنف',
      field: 'item_amount',
      valueGetter: p => Number(this._sharedComponentService.getItemAmount(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.iShowItemValue,
      type: 'numericColumn',
    },
    {
      headerName: 'وسطي السعر',
      field: 'avg_price',
      valueGetter: p => Number(this._sharedComponentService.getAvgPrice(p.data?.details || [])) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowAvgPrice,
      excludeFromFooter: true,
      type: 'numericColumn',
    },
    {
      headerName: 'وسطي سعر المدخلات',
      field: 'avg_inputes',
      valueGetter: p => Number(this.getAvgInputesPrice(p.data)) || 0,
      valueFormatter: this.num2,
      hide: !this.isShowAvgInputes,
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
    { headerName: 'آخر سعر', field: 'latest_price', valueFormatter: this.num2, hide: !this.isShowLatestPrice, excludeFromFooter: true, type: 'numericColumn' },
    { headerName: 'آخر سعر دولار', field: 'latest_price_dollar', valueFormatter: this.num2, hide: !this.isShowLatestPriceDollar, excludeFromFooter: true, type: 'numericColumn' },

    // ✅ رابط التفاصيل
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
          id: p.data.fabric_id,
          code: p.data.fabric_code,
          name: p.data.fabric_name,
          dyerId: p.data.dyeing_id,
          dyerName: p.data.dyeing_name,
          consigmentDyeingId: p.data.consigment_dyeing_id,
          consigmentNumber: p.data.consigment_dyeing_number,
          fabricOrderId: p.data.wc_fabric_order_requisition_id
        }).toString();

        const currentUrl = window.location.origin + window.location.pathname;
        const fullUrl = `${currentUrl}/details?${queryParams}`;
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

  totalFooterValues = {}

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService
  ) {
    this._sharedComponentService.angularMaterialTableConfig();
  }

  ngOnInit(): void {
    this.getData();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.isLoading) {
      this.gridApi.showLoadingOverlay();
      return;
    }

    if (!this.fabrics?.length) {
      this.gridApi.showNoRowsOverlay();
    }
  }

  // ✅ جلب داتا مثل PrimeNG
  getData() {
    this.loadData({
      isShowClosedBalances: this.isShowClosedBalances,
      startDate: undefined,
      endDate: undefined
    });
  }

  filterByDate() {
    this.loadData({
      isShowClosedBalances: this.isShowClosedBalances,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  private loadData(payload: { isShowClosedBalances: boolean; startDate: any; endDate: any }) {
    this.loading = true;
    this.isLoading = true;
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }

    this._reportWdService.selectInverntoryDetails(payload)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.isLoading = false;
        })
      )
      .subscribe((res: any) => {
        this.fabrics = res || [];

        if (!this.gridApi) {
          return;
        }

        this.gridApi.setRowData(this.fabrics);
        requestAnimationFrame(() => this.updateFooter());

        if (this.fabrics.length) {
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.showNoRowsOverlay();
        }
      }, () => {
        this.fabrics = [];

        if (!this.gridApi) {
          return;
        }

        this.gridApi.setRowData([]);
        this.gridApi.showNoRowsOverlay();
      });
  }

  getClosedBalances() {
    // نفس getData بس يعتمد على isShowClosedBalances
    this.getData();
  }

  resetFilters() {
    this.clearAll();
  }

  // ✅ زر clear مثل PrimeNG clear(dt1)
clearAll() {
  if (!this.gridApi || !this.gridColumnApi) return;

  // clear filters
  this.gridApi.setFilterModel(null);
  this.gridApi.onFilterChanged();

  // ✅ clear sorting (AG Grid v31+)
  this.gridColumnApi.applyColumnState({
    defaultState: { sort: null, sortIndex: null }
  });

  this.updateFooter();
}


  // ✅ إظهار/إخفاء أعمدة بحسب checkboxes
  applyColumnVisibility() {
    if (!this.gridColumnApi) return;

    const set = (colId: string, v: boolean) => this.gridColumnApi.setColumnVisible(colId, v);

    set('total_amount_quantity_input', this.isShowTotalInput);
    set('total_amount_quantity_output', this.iShowTotalOutput);
    set('current_quantity', this.iShowTotalBalance);
    set('current_quantity_with_form', this.iShowTotalBalanceWithForm);
    set('diff_current_quantity_with_form', this.iShowTotalBalanceForm);
    set('form_prepare_dyeing_current_quantity', this.iShowTotalBalanceFormPreparedDyeing);
    set('color_name', this.iShowTotalBalanceFormPreparedDyeing);
    set('work_order_number', this.iShowTotalBalanceFormPreparedDyeing);

    set('total_amount_input', this.isShowTotalAmountInput);
    set('total_amount_output', this.iShowTotalAmountOutput);
    set('item_amount', this.iShowItemValue);
    set('avg_price', this.isShowAvgPrice);
    set('avg_inputes', this.isShowAvgInputes);
    set('avg_wast', this.isShowAvgWast);
    set('latest_price', this.isShowLatestPrice);
    set('latest_price_dollar', this.isShowLatestPriceDollar);

    this.updateFooter();
  }

  onModelUpdated() {
    this.updateFooter();
  }

  // ✅ pinned footer مثل اللي بعتته إنت

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


private uniq(arr: any[]) {
  return Array.from(new Set(arr.filter(x => x != null && String(x).trim() !== '')));
}

getColorList(row: any): string[] {
  const details = Array.isArray(row?.details) ? row.details : [];
  return this.uniq(details.map((d: any) => d?.color_name));
}

getWorkOrderList(row: any): string[] {
  const details = Array.isArray(row?.details) ? row.details : [];
  return this.uniq(details.map((d: any) => d?.work_order_number));
}

  // ====== دوالك كما هي ======
  notZero(n: any) {
    n = +n;
    if (!n) n = 1;
    return n;
  }

  getCurrentQuantity(data: any) {
    if (!data) return 0;
    let current = (data.current_quantity >= 0) ? data.current_quantity : 0;
    let hasDyeingRequesition = false;

    for (let i = 0; i < (data.details?.length || 0); i++) {
      const el = data.details[i];
      if (el.type_of_requisition === 'اذن تشكيل') {
        hasDyeingRequesition = true;
        current = current + parseFloat(el.form_quantity);
      } else if (el.type_of_requisition === 'اذن صباغة') {
        hasDyeingRequesition = true;
        current = current - parseFloat(el.quantity);
      }
    }

    if (!hasDyeingRequesition) current = parseFloat((data.current_quantity >= 0) ? data.current_quantity : 0);
    return current;
  }

  getTotalInputesPrice(fabrics: any) {
    return fabrics?.details?.map((a: any) => (a.input_output == '1') ? parseFloat(a['price']) : 0)
      .reduce((acc: number, value: number) => acc + value, 0) || 0;
  }

  getAvgInputesPrice(fabrics: any) {
    return this._sharedComponentService.getInputAmount(fabrics?.details || []) /
      this.notZero(this._sharedComponentService.getTotalAmountQuantityInput(fabrics?.details || []));
  }

  // ✅ formatter موحد
  num2(params: any) {
    const v = (params && params.value != null) ? Number(params.value) : 0;
    return (Number.isFinite(v) ? v : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}