import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

@Component({
  selector: 'app-fabric-orders-report-wc',
  templateUrl: './fabric-orders-report-wc.component.html',
  styleUrls: ['./fabric-orders-report-wc.component.css']
})
export class FabricOrdersReportWcComponent implements OnInit {

  /////////////////// Variables ///////////////////
    results: any[] = []

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
            headerName: 'العميل',
            field: 'bussiness_man_name',
            filter: 'agSetColumnFilter',
            filterParams: {
              excelMode: 'windows',
            },
            excludeFromFooter: true,
          },
          {
            headerName: 'رقم العقد',
            field: 'wc_fabric_order_requisition_name',
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
            headerName: 'المطلوب',
            field: 'needed_quantity',
            valueFormatter: (p: any) => this.fmtNum(p.value),
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            aggFunc: 'sum',
          },
          {
            headerName: 'المنتهي',
            field: 'net_current_quantity',
            valueFormatter: (p: any) => this.fmtNum(p.value),
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            aggFunc: 'sum',
            // ⚠️ لا تضع excludeFromFooter هون
          },
          {
            headerName: 'المتبقي',
            field: 'current_quantity',
            valueFormatter: (p: any) => this.fmtNum(p.value),
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            aggFunc: 'sum',
          },
          {
            headerName: 'الزائدة',
            field: 'over_current_quantity',
            valueFormatter: (p: any) => this.fmtNum(p.value),
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            aggFunc: 'sum',
          },
          {
            headerName: 'نسبة الزيادة',
            field: 'over_current_quantity_ratio',
            // نسبة مئوية: لا تُجمع في الفوتر (جمع النسب بلا معنى)
            valueFormatter: (p: any) => p.node?.rowPinned ? '' : `${this.fmtNum(p.value)}%`,
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            excludeFromFooter: true,
          },

        ].reverse(); gridColumnApi: any;

        fmtNum(v: any): string {
          const n = Number(v);
          if (!Number.isFinite(n)) return '0';
          return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
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
      private _reportWcService: ReportWcService,
      public _exportDataService: ExportDataService,      
    ) {
    }
  
    ngOnInit(): void {
    }

    onGridReady(params: GridReadyEvent) {
      this.gridParams = params;
      this.getData(this.gridParams); // أول تحميل يكون العادية
    }
  
  getData(params: GridReadyEvent) {
      this._reportWcService
        .fabricOrdersReport()
        .subscribe((response: any) => {
          this.applyGridData(params, response);
        });
    }

    applyGridData(params: GridReadyEvent, data: any) {
      this.results = data;
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.results);
    
      requestAnimationFrame(() => setTimeout(() => this.updateFooter(), 100));
    
      setTimeout(() => {
        const viewport = this.agGridElement.nativeElement.querySelector('.ag-center-cols-viewport');
        if (viewport) viewport.scrollLeft = viewport.scrollWidth;
      }, 100);
    }
  
    resetFilters() {
      if (this.gridApi) {
        this.gridApi.setFilterModel(null);
      }
    }
    
    onModelUpdated() {
        if (this.isUpdatingFooter) return;
        this.updateFooter();
      }
      
      // setPinnedBottomRowData يُطلق modelUpdated من جديد؛ بدون هذا الحارس تدخل الشاشة
  // حلقة تغذية راجعة تمنع اكتمال العرض بعد الفلترة
  private isUpdatingFooter = false;


      
      updateFooter() {
        if (!this.gridApi || this.isUpdatingFooter) return;
        this.isUpdatingFooter = true;

        requestAnimationFrame(() => {
          const columns = (this.gridApi.getColumnDefs() || []).filter((c: any) => 'field' in c);
          const numericCols = columns.filter((c: any) => c.type === 'numericColumn' && !c.excludeFromFooter);

          this.totalFooterValues = {};
          for (const col of numericCols) this.totalFooterValues[(col as any).field] = 0;

          // نجمع الصفوف بعد الفلترة فقط، فالفوتر يتبع الفلاتر
          this.gridApi.forEachNodeAfterFilterAndSort((node) => {
            if (!node.data) return;
            for (const col of numericCols) {
              const field = (col as any).field;
              this.totalFooterValues[field] += Number(node.data[field]) || 0;
            }
          });

          // نمرّر أرقاماً خاماً؛ الـ valueFormatter نفسه يصوغها، فلا NaN ولا حاجة للتلاعب بالـ DOM
          const summary: any = { ...this.totalFooterValues, bussiness_man_name: 'الإجمالي' };

          this.pinnedBottomRowData = [summary];
          this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
          this.isUpdatingFooter = false;
        });
      }
  
  }
  