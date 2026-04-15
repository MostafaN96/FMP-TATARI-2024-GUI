import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  SideBarDef,
  ColumnApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';

import { SharedComponentService } from "src/app/services/shared-component.service";
import { TransportWcWdService } from "src/app/services/main/wc/transport-wc-wd-requisition-wc.service";

type MyColDef = ColDef & { excludeFromFooter?: boolean; };

@Component({
  selector: 'app-show-all-transport-wc-wd-requisition-wc',
  templateUrl: './show-all-transport-wc-wd-requisition-wc.component.html',
  styleUrls: ['./show-all-transport-wc-wd-requisition-wc.component.css']
})
export class ShowAllTransportWcWdRequisitionWcComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  loading = false;
  lastGrandTotalQty = 0;
  lastGrandTotalFabricPiece = 0;

  sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
    filter: true,
  };

  gridOptions: GridOptions = {
    enableRtl: true,
    rowModelType: 'infinite',
    cacheBlockSize: 50,
    maxBlocksInCache: 2,
    rowBuffer: 10,
    suppressRowTransform: true,
    animateRows: true,
    onFilterChanged: () => {
      this.gridApi?.purgeInfiniteCache();
    },
  };

  availableFilters: any = {
    warehouse_name: [],
    document: [],
  };

  columnDefs: MyColDef[] = [
    {
      headerName: 'رقم الإذن',
      field: 'number',
      width: 90,
      cellClass: 'text-center',
      excludeFromFooter: true,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'تاريخ الإذن',
      field: 'date',
      width: 140,
      cellClass: 'text-center',
      filter: 'agDateColumnFilter',
      excludeFromFooter: true,
      filterParams: this._sharedComponentService.dateFilterParams(),
      valueFormatter: p => this._sharedComponentService.formatDate(p.value),
    },
    {
      headerName: 'اسم المخزن',
      field: 'warehouse_name',
      colId: 'warehouse_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) =>
          params.success(this.availableFilters?.warehouse_name || []),
      },
    },
    {
      headerName: 'التفاصيل',
      field: 'details',
      filter: false,
      minWidth: 500,
      flex: 3,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: false,
      autoHeight: false,
      cellRenderer: (p: any) => {
        if (p.node.rowPinned) {
          const div = document.createElement('div');
          div.className = 'details-footer';
          div.innerText =
            `إجمالي الكمية: ${Number(p.data?.details_total_qty || 0).toLocaleString('en-US')}` +
            `   |   إجمالي الأثواب: ${Number(p.data?.details_total_fabric_piece || 0).toLocaleString('en-US')}`;
          return div;
        }

        const el = document.createElement('div');
        el.className = 'details-host';
        el.innerHTML = this.detailsRenderer(p.data);

        requestAnimationFrame(() => {
          const table = el.querySelector('.details-table') as HTMLElement | null;
          const h = (table?.offsetHeight || el.scrollHeight) + 10;
          if (p.node.rowHeight !== h) {
            p.node.setRowHeight(h);
            this.scheduleRowHeightChanged(p.api);
          }
        });

        return el;
      },
    },
    {
      headerName: 'الملاحظات',
      field: 'note',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'تفاصيل الإذن',
      field: 'id',
      maxWidth: 120,
      sortable: false,
      filter: false,
      cellRenderer: (element: any) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';
        link.addEventListener('click', (event) => {
          const queryParams = { id: element.data.id, warehouseId: element.data.warehouse_id };
          if (event.ctrlKey || event.button === 1) {
            const urlTree = this._router.createUrlTree(['details'], { relativeTo: this._activatedRoute, queryParams });
            window.open(this._router.serializeUrl(urlTree), '_blank');
          } else {
            this._router.navigate(['details'], { relativeTo: this._activatedRoute, queryParams });
          }
        });
        return link;
      }
    },
    // فلتر مخفي برقم الوثيقة (من التفاصيل)
    {
      headerName: 'رقم الوثيقة (تفاصيل)',
      colId: 'document',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.document || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.document).filter(Boolean).join(' | '),
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transportWcWdService: TransportWcWdService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource: IDatasource = {
      getRows: (p: IGetRowsParams) => this.getRowsLazy(p),
    };

    this.gridApi.setDatasource(datasource);
  }

  private getRowsLazy(p: IGetRowsParams) {
    this.loading = true;

    const payload = {
      startRow: p.startRow,
      endRow: p.endRow,
      sortModel: p.sortModel,
      filterModel: p.filterModel,
    };

    this._transportWcWdService.selectAllLazy(payload).subscribe({
      next: (res: any) => {
        const rows = Array.isArray(res?.rows) ? res.rows : [];
        const lastRow = Number(res?.lastRow ?? res?.totalRows ?? -1);

        this.lastGrandTotalQty = Number(res?.grandTotalQty ?? 0);
        this.lastGrandTotalFabricPiece = Number(res?.grandTotalFabricPiece ?? 0);
        this.availableFilters = res.availableFilters || {};

        setTimeout(() => { this.refreshAllSetFilters(); }, 0);

        p.successCallback(rows, lastRow);

        this.setPinnedBottomRow();
        this.loading = false;
      },
      error: () => {
        p.failCallback();
        this.gridApi?.setPinnedBottomRowData([]);
        this.loading = false;
      }
    });
  }

  private refreshingFilters = false;

  private refreshAllSetFilters() {
    if (!this.gridApi || this.refreshingFilters) return;
    this.refreshingFilters = true;

    const colIds = Object.keys(this.availableFilters || {});
    colIds.forEach((colId) => {
      this.gridApi.getFilterInstance(colId, (filter: any) => {
        if (!filter) return;
        if (typeof filter.setFilterValues !== 'function') return;
        const values = Array.isArray(this.availableFilters[colId]) ? this.availableFilters[colId] : [];
        filter.setFilterValues(values);
        filter.refreshFilterValues?.();
      });
    });

    setTimeout(() => this.refreshingFilters = false, 0);
  }

  private heightRaf: number | null = null;

  private scheduleRowHeightChanged(api: any) {
    if (this.heightRaf) return;
    this.heightRaf = requestAnimationFrame(() => {
      this.heightRaf = null;
      api.onRowHeightChanged();
    });
  }

  private setPinnedBottomRow() {
    if (!this.gridApi) return;
    this.gridApi.setPinnedBottomRowData([{
      details_total_qty: this.lastGrandTotalQty,
      details_total_fabric_piece: this.lastGrandTotalFabricPiece,
    }]);
    this.gridApi.refreshCells({ force: true });
  }

  onFilterChanged() {
    if (!this.gridApi) return;
    this.gridApi.purgeInfiniteCache();
  }

  clearAg() {
    if (!this.gridApi) return;
    this.gridApi.setFilterModel(null);
    this.gridApi.purgeInfiniteCache();
  }

  private getRowDetailsTotal(details: any[], field: string): number {
    return (details || []).reduce((sum, x) => sum + Number(x[field] || 0), 0);
  }

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.details) ? row.details : [];
    const totalQty = this.getRowDetailsTotal(details, 'quantity');
    const totalPiece = this.getRowDetailsTotal(details, 'fabric_piece');

    const rowsHtml = details.map((d: any) => `
      <tr>
        <td>${d.wc_fabric_order_requisition_name ?? ''}</td>
        <td>${d.fabric_name ?? ''}</td>
        <td>${d.consigment_manufacturing_number ?? ''}</td>
        <td>${d.dyer_name ?? ''}</td>
        <td class="center">${Number(d.quantity || 0)}</td>
        <td class="center">${Number(d.fabric_piece || 0)}</td>
        <td>${d.document ?? ''}</td>
      </tr>
    `).join('');

    return `
      <table class="details-table">
        <thead>
          <tr>
            <th>طلبية</th>
            <th>اسم القماش</th>
            <th>رقم الرسالة</th>
            <th>المصبغة</th>
            <th class="center">الكمية</th>
            <th class="center">عدد الأثواب</th>
            <th>الوثيقة</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr>
            <th>الإجمالي</th>
            <th></th>
            <th></th>
            <th></th>
            <th class="center">${Number(totalQty).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
            <th class="center">${Number(totalPiece).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    `;
  }
}
