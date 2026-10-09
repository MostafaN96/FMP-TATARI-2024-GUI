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
import { wcInputRequisitionRoute } from '../wc-input-details-dialog/wc-input-details-dialog.component';

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
        headerName: 'رقم الرسالة',
        field: 'consigment_manufacturing_number',
        filter: 'agSetColumnFilter',
        filterParams: {
          excelMode: 'windows',
        },
        excludeFromFooter: true,
      },
      {
      headerName: 'الطلبية',
      field: 'wc_fabric_order_requisition_name',
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
      // يظهران فقط مع فلتر التاريخ (الإدخال والإخراج عندها حركات الفترة)
      {
        headerName: 'رصيد أول المدة',
        field: 'opening_balance',
        valueFormatter: (params: any) => this.formatNumber(params.value),
        hide: true,
        type: 'numericColumn',
      },
      {
        headerName: 'رصيد آخر المدة',
        field: 'closing_balance',
        valueFormatter: (params: any) => this.formatNumber(params.value),
        hide: true,
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

    // الأعمدة الخمسة التالية سطرٌ لكل ماكينة (السطر i في كل منها لنفس الماكينة)
    {
      headerName: 'الماكينة',
      field: 'receipt_machine_names',
      filter: false,
      minWidth: 220,
      flex: 5,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: true,
      autoHeight: true,
      excludeFromFooter: true,
      cellRenderer: (p: any) => this.machineLinesRenderer(p.value),
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
      cellRenderer: (p: any) => this.machineLinesRenderer(p.value),
    },

        {
      headerName: 'رقم الاستاند',
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
      cellRenderer: (p: any) => this.machineLinesRenderer(p.value, true),
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
      cellRenderer: (p: any) => this.machineLinesRenderer(p.value, true),
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
      cellRenderer: (p: any) => this.machineLinesRenderer(p.value, true),
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

      // حركات الإدخال التي حسب منها السطر «إجمالي الإدخال» (حركات الفترة إن طُبّق التاريخ).
      // مخفي افتراضياً ويُظهَر بزر «إظهار حركات الإدخال»
      {
        headerName: 'حركات الإدخال',
        colId: 'input_movements',
        field: 'input_movements',
        hide: true,
        filter: false,
        sortable: false,
        // عرض ثابت لا flex: يضاف لعرض الجدول فيظهر التمرير الأفقي بدل أن يُضغط العمود
        width: 460,
        minWidth: 380,
        flex: 0,
        wrapText: true,
        autoHeight: true,
        // لا details-cell: ارتفاع الخلية محدود وتمرير داخلي (انظر .input-movements-box).
        // سطر بمئات الحركات كان يصير بآلاف البكسلات فيتعطّل تمرير الجدول
        cellClass: 'input-movements-cell',
        excludeFromFooter: true,
        // نص للتصدير إلى إكسل/PDF، والعرض من cellRenderer
        valueGetter: (p: any) => this.inputMovements(p.data)
          .map((d: any) => `${d.type_of_requisition} ${d.number ?? ''} (${this._sharedComponentService.formatDate(d.date)}): ${this.formatNumber(d.quantity)}`)
          .join(' | '),
        cellRenderer: (p: any) => this.inputMovementsRenderer(p),
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
      // كل ايصال على حدة (documents نصٌّ واحد لكل ماكينة قد يجمع عدة ايصالات)
      filterValueGetter: (p: any) => (p.data?.documents_flat || []),

      filterParams: {

      refreshValuesOnOpen: true,

      // ✅ هون السحر
      buttons: ['apply', 'reset'],   // أو ['apply'] فقط

        values: (params: any) => {
          const set = new Set<string>();

          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.documents_flat || []).forEach((v: string) => v && set.add(v));
          });

          params.success([...set].sort());
        },
      },
    },

    {
      headerName: 'الماكينة',
      colId: 'receipt_machine_filter',
      hide: true,
      filter: 'agSetColumnFilter',
      filterValueGetter: (p: any) => (p.data?.receipt_machine_names || []),
      filterParams: {
        refreshValuesOnOpen: true,
        buttons: ['apply', 'reset'],
        values: (params: any) => {
          const set = new Set<string>();
          params.api.forEachNodeAfterFilterAndSort((node: any) => {
            (node.data?.receipt_machine_names || []).forEach((v: string) => v && set.add(v));
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
      minWidth: 150,
      resizable: true,
      sortable: true,
      wrapText: true,
      autoHeight: true,
      cellClass: 'ag-cell-wrap',
      suppressMenu: false,
      headerClass: 'ag-header-wrap'
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

    ///////////////////// فلتر التاريخ /////////////////////
    // YYYY-MM-DD من <input type="date">؛ الفارغ يعني بلا حد
    fromDate = ''
    toDate = ''
    // التاريخ المطبّق فعلاً على البيانات المعروضة (لا ما كُتب في الحقل ولم يُطبَّق)
    appliedDateRange: { fromDate: string, toDate: string } | null = null

    applyDateFilter() {
      if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
        [this.fromDate, this.toDate] = [this.toDate, this.fromDate];
      }
      this.loadData(this.gridParams, this.isShowClosedBalances);
    }

    clearDateFilter() {
      this.fromDate = '';
      this.toDate = '';
      this.loadData(this.gridParams, this.isShowClosedBalances);
    }

    ///////////////////// تعليم الأسطر /////////////////////
    // بعد تفعيل «وضع التعليم»، الضغط على سطر يعلّمه أو يلغي تعليمه ليسهل تتبّعه أثناء المراجعة
    isMarkingMode = false
    markedRows = new Set<any>()
    rowClassRules = {
      'row-marked': (params: any) => !!params.data && this.markedRows.has(params.data),
    }

    toggleMarkingMode() {
      this.isMarkingMode = !this.isMarkingMode;
    }

    onRowClicked(event: any) {
      if (!this.isMarkingMode || !event.data || event.node?.rowPinned) return;
      // الضغط على رابط (حركة الصنف، رقم إذن) لا يعلّم السطر
      if ((event.event?.target as HTMLElement)?.closest?.('a, button')) return;
      if (this.markedRows.has(event.data)) {
        this.markedRows.delete(event.data);
      } else {
        this.markedRows.add(event.data);
      }
      this.gridApi.redrawRows({ rowNodes: [event.node] });
    }

    clearMarkedRows() {
      this.markedRows.clear();
      this.gridApi?.redrawRows();
    }

    ///////////////////// عمود حركات الإدخال /////////////////////
    isShowInputMovements = false

    toggleInputMovements() {
      this.isShowInputMovements = !this.isShowInputMovements;
      this.gridColumnApi?.setColumnsVisible(['input_movements'], this.isShowInputMovements);
      this.gridApi?.resetRowHeights();
    }

    private inputMovements(row: any): any[] {
      return (row?.details || []).filter((d: any) => d?.input_output == 1);
    }

    // جدول صغير داخل الخلية: النوع | رقم الإذن (رابط) | التاريخ | الكمية
    private inputMovementsRenderer(p: any): HTMLElement | string {
      if (!p.data) return '';
      // سطر الإجمالي: مجموع حركات الإدخال لكل الأسطر الظاهرة (بعد الفلاتر)
      if (p.node?.rowPinned) {
        const totals = p.data.__inputMovementsTotals;
        if (!totals) return '';
        return `${this.formatNumber(totals.quantity)} (${totals.count} حركة)`;
      }
      const movements = this.inputMovements(p.data);
      if (!movements.length) return '—';

      const table = document.createElement('table');
      table.className = 'input-movements-table';
      const body = document.createElement('tbody');
      for (const d of movements) {
        const tr = document.createElement('tr');

        const type = document.createElement('td');
        type.textContent = d.type_of_requisition || '';

        const number = document.createElement('td');
        const route = wcInputRequisitionRoute(d.type_of_requisition);
        if (route && d.requisition_id) {
          const link = document.createElement('a');
          link.href = `${route}?id=${encodeURIComponent(d.requisition_id)}`;
          link.target = '_blank';
          link.textContent = d.number ?? '';
          number.appendChild(link);
        } else {
          number.textContent = d.number ?? '';
        }

        const date = document.createElement('td');
        date.textContent = this._sharedComponentService.formatDate(d.date);

        const quantity = document.createElement('td');
        quantity.className = 'num';
        quantity.textContent = this.formatNumber(d.quantity);

        tr.append(type, number, date, quantity);
        body.appendChild(tr);
      }
      table.appendChild(body);

      const box = document.createElement('div');
      box.className = 'input-movements-box';
      box.appendChild(table);
      return box;
    }

    // سطر لكل ماكينة. الأسطر لا تلتفّ (والنص الكامل في التلميح) حتى تبقى متقابلة بين الأعمدة
    private machineLinesRenderer(value: any, isNumber = false) {
      const host = document.createElement('div');
      host.className = 'machine-lines';
      for (const v of Array.isArray(value) ? value : []) {
        const line = document.createElement('div');
        line.className = 'machine-line';
        const text = isNumber ? this.formatNumber(v) : String(v || '—');
        line.textContent = text;
        line.title = text;
        host.appendChild(line);
      }
      return host;
    }

    private formatNumber(value: any) {
      if (!value) return '0';
      return Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    private loadData(params: GridReadyEvent, isShowClosedBalances: boolean) {
      this.isLoading = true;
      const dateRange = (this.fromDate || this.toDate)
        ? { fromDate: this.fromDate, toDate: this.toDate }
        : null;
      this._inventoryReportService.fetchData(
        (options) => this._reportWcService.selectInverntoryDetails(options),
        params,
        (response) => {
          this.appliedDateRange = dateRange;
          this.applyGridData(params, response);
        },
        () => this.isLoading = false,
        { isShowClosedBalances, ...(dateRange || {}) }
      );
    }

    applyGridData(params: GridReadyEvent, data: any) {
      this.fabrics = data;
      this.markedRows.clear();
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridColumnApi.setColumnsVisible(['opening_balance', 'closing_balance'], !!this.appliedDateRange);
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
    
    
      // setPinnedBottomRowData يُطلق modelUpdated من جديد؛ بدون هذا الحارس تدخل الشاشة
      // حلقة تغذية راجعة تمنع اكتمال العرض بعد الفلترة
      private isUpdatingFooter = false;

      onModelUpdated() {
        if (this.isUpdatingFooter) return;
        this.updateFooter();
      }


      updateFooter() {
        if (!this.gridApi || this.isUpdatingFooter) return;
        this.isUpdatingFooter = true;

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
    
    
    
          // إجمالي عمود «حركات الإدخال» (الأسطر الظاهرة بعد الفلاتر)
          const inputTotals = { quantity: 0, count: 0 };
          this.gridApi.forEachNodeAfterFilterAndSort((node) => {
            for (const d of this.inputMovements(node.data)) {
              inputTotals.quantity += Number(d.quantity) || 0;
              inputTotals.count++;
            }
          });
          summary.__inputMovementsTotals = inputTotals;

          this.pinnedBottomRowData = [summary];
          this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
          this.isUpdatingFooter = false;
        });
      }
  
    ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  
}
