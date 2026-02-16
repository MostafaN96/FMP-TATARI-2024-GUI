import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// AG Grid Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CustomLoadingCellRendererComponent } from 'src/app/general-pages/custom-loading-cell-renderer/custom-loading-cell-renderer.component';

// Shared Service
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ExportDataService } from 'src/app/services/export-data.service';
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { ReportWdService } from 'src/app/services/main/wd/report-wd.service';
import { Router } from '@angular/router';

type GridColDef<T = any> = ColDef<T> & { excludeFromFooter?: boolean };

@Component({
  selector: 'app-customer-fabric-orders-report-wd',
  templateUrl: './customer-fabric-orders-report-wd.component.html',
  styleUrls: ['./customer-fabric-orders-report-wd.component.css']
})
export class CustomerFabricOrdersReportWdComponent implements OnInit {

  private static readonly NUMERIC_COL_TYPE = 'numericColumn';

  customerFabricOrder: any[] = [];

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  gridApi!: GridApi;
  gridColumnApi: any;
  gridParams!: GridReadyEvent;

  loading = true;
  suppressRowClickSelection = true;

  public columnDefs: GridColDef[] = [
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
    {
      headerName: 'التاريخ',
      field: 'date',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    valueFormatter: (p: any) => this._sharedComponentService.formatDateArabic(p.value),
    },
    {
      headerName: 'العميل',
      field: 'seller_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    },
    {
      headerName: 'اسم المادة',
      field: 'dyed_fabric_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    },
    {
      headerName: 'رقم المادة',
      field: 'dyed_fabric_code',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    },
    {
      headerName: 'فئة اللون',
      field: 'color_category_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    },
    {
      headerName: 'اللون',
      field: 'color_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
    },
    {
      headerName: 'رقم الاذن',
      field: 'number',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
      cellRenderer: (params: any) => {        
        const link = document.createElement('a');
        link.innerText = params.value ?? '';
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';
        
        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({ id: params.data.we_dyed_fabric_order_requisition_id }).toString();
            const currentUrl = window.location.origin;            
          const fullUrl = `${currentUrl}/dashboard/${this._constantsService.ROUTING_LINKS[188]}?${queryParams}`;

          if (event.ctrlKey || event.button === 1) window.open(fullUrl, '_blank');
          else window.location.href = fullUrl;
        });
        return link;
      }
    },
    {
      headerName: 'رقم العقد',
      field: 'we_dyed_fabric_order_requisition_name',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      excludeFromFooter: true,
      cellRenderer: (params: any) => {
        const link = document.createElement('a');
        link.innerText = params.value ?? '';
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';
        link.rel = 'noopener';

        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({ id: params.data.we_dyed_fabric_order_requisition_id }).toString();
            const currentUrl = window.location.origin;            
          const fullUrl = `${currentUrl}/dashboard/${this._constantsService.ROUTING_LINKS[188]}?${queryParams}`;

          if (event.ctrlKey || event.button === 1) window.open(fullUrl, '_blank');
          else window.location.href = fullUrl;
        });
        return link;
      }
    },
    {
      headerName: 'الكمية المطلوبة',
      field: 'ordered_quantity',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      type: CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE,
    },
    {
      headerName: 'الكمية المتبقية',
      field: 'ordered_current_quantity',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      type: CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE,
    },
    {
      headerName: 'الكمية المشكلة',
      field: 'form_quantity',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      type: CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE,
    },
    {
      headerName: 'الكمية المتبقية من التشكيل',
      field: 'form_current_quantity',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      type: CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE,
    },
    {
      headerName: 'الكمية الجاهزة (المصبوغة)',
      field: 'dyeing_quantity',
      filter: 'agSetColumnFilter',
      filterParams: { excelMode: 'windows' },
      type: CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE,
    },
  ].reverse();

  totalFooterValues = {};
  pinnedBottomRowData: any;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    wrapText: true,
    autoHeight: true,
  };

  public sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };
  public loadingCellRenderer: any = CustomLoadingCellRendererComponent;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...',
  };

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private _router: Router
  ) {
    this._sharedComponentService.angularMaterialTableConfig();
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridParams = params;
    this.getData(this.gridParams);
    setTimeout(() => this.gridApi?.sizeColumnsToFit(), 0);
  }

  getData(params: GridReadyEvent) {
    this.loading = true;
    this._reportWdService.dyeingOrdersDetailsReport().subscribe((response: any) => {
      this.customerFabricOrder = response;
      this.applyGridData(params, response);
      this.loading = false;
    });
  }

  applyGridData(params: GridReadyEvent, data: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(data || []);

    requestAnimationFrame(() => setTimeout(() => this.updateFooter(), 100));
    requestAnimationFrame(() => this.gridApi?.sizeColumnsToFit());

    setTimeout(() => {
      const viewport = this.agGridElement.nativeElement.querySelector('.ag-center-cols-viewport');
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 100);
  }

  onModelUpdated() {
    this.updateFooter();
    this.gridApi?.sizeColumnsToFit();
  }

  onGridSizeChanged() {
    this.gridApi?.sizeColumnsToFit();
  }

  onCellClicked(event: any) {
    if (!event?.colDef?.field) return;

    const isDetailsColumn = event.colDef.field === 'number'
      || event.colDef.field === 'we_dyed_fabric_order_requisition_name';

    if (!isDetailsColumn) return;

    const id = event?.data?.wd_form_dyeing_order_requisition_id;
    if (!id) return;

    const urlTree = this._router.createUrlTree(
      ['/dashboard', this._constantsService.ROUTING_LINKS[188]],
      { queryParams: { id } }
    );
    const fullUrl = this._router.serializeUrl(urlTree);

    if (event.event?.ctrlKey || event.event?.metaKey) {
      window.open(fullUrl, '_blank');
    } else {
      this._router.navigateByUrl(urlTree);
    }
  }

  private getDetailsUrl(id: any): string {
    const urlTree = this._router.createUrlTree(
      ['/dashboard', this._constantsService.ROUTING_LINKS[188]],
      { queryParams: { id } }
    );
    return this._router.serializeUrl(urlTree);
  }

  updateFooter() {
    if (!this.gridApi) return;

    requestAnimationFrame(() => {
      const summary: any = {};
      const columns = (this.gridApi.getColumnDefs() || []).filter((c: any) => 'field' in c) as GridColDef[];

      this.totalFooterValues = {};

      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node.data) return;

        columns.forEach((col: any) => {
          const field = col.field;
          if (!field) return;
          if (col.excludeFromFooter) return;

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
        .filter(col => col.type === CustomerFabricOrdersReportWdComponent.NUMERIC_COL_TYPE && !col.excludeFromFooter)
        .forEach((col: any) => {
          const field = col.field;
          if (!field) return;

          summary[field] = Number(this.totalFooterValues[field] || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });

          setTimeout(() => {
            const inputQuantityFooterCell = document.querySelector(
              `.ag-floating-bottom-viewport .ag-cell-value[col-id="${field}"]`
            );

            if (inputQuantityFooterCell) {
              (inputQuantityFooterCell as HTMLElement).innerText = summary[field];
            }
          }, 500);
        });

      const firstTextCol = columns.find(
        (c: any) => !c.type || c.type !== 'numericColumn'
      );
      if (firstTextCol && firstTextCol['field']) {
        summary[firstTextCol['field']] = 'الإجمالي';
      }

      this.pinnedBottomRowData = [summary];
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
      this.gridApi.refreshCells({ force: true });
    });
  }
}
