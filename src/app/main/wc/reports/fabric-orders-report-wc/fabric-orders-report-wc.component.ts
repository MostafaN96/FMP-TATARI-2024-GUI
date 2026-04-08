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
            valueFormatter: (params: any) => {
                if (!params.value) return '0';
                return Number(params.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              },
            type: 'numericColumn',
            aggFunc: 'sum',
          },
          {
            headerName: 'المنتهي',
            field: 'net_current_quantity',
            valueFormatter: (params: any) => {
                if (!params.value) return '0';
                return Number(params.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              },
            type: 'numericColumn',
            aggFunc: 'sum',
            // ⚠️ لا تضع excludeFromFooter هون
          },
          {
            headerName: 'المتبقي',
            field: 'current_quantity',
            valueFormatter: (params: any) => {
                if (!params.value) return '0';
                return Number(params.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              },
            type: 'numericColumn',
            aggFunc: 'sum',
          },
          {
            headerName: 'الزائدة',
            field: 'over_current_quantity',
            valueFormatter: (params: any) => {
                if (!params.value) return '0';
                return Number(params.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              },
            type: 'numericColumn',
            aggFunc: 'sum',
          },
          {
            headerName: 'نسبة الزيادة',
            field: 'over_current_quantity_ratio',
            valueFormatter: (params: any) => {
                if (!params.value) return '0';
                return Number(params.value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              },
            excludeFromFooter: true,
          },
          
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
  
  }
  