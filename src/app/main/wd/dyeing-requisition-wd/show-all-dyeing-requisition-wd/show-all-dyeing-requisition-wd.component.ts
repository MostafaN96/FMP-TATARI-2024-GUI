import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DyeingRequisitionWdService } from "src/app/services/main/wd/dyeing-requisition-wd.service";

type MyColDef = ColDef & { excludeFromFooter?: boolean; };

@Component({
  selector: 'app-show-all-dyeing-requisition-wd',
  templateUrl: './show-all-dyeing-requisition-wd.component.html',
  styleUrls: ['./show-all-dyeing-requisition-wd.component.css']
})
export class ShowAllDyeingRequisitionWdComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;

  loading = false;
  lastGrandTotalQty = 0;

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
    dyeing_name: [],
    warehouse_name: [],
    release_process: [],
    details_work_order: [],
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
      headerName: 'المصبغة',
      field: 'dyeing_name',
      colId: 'dyeing_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) =>
          params.success(this.availableFilters?.dyeing_name || []),
      },
    },
    {
      headerName: 'المخزن',
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
      headerName: 'الارسالية الصادرة',
      field: 'release_process',
      colId: 'release_process',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) =>
          params.success(this.availableFilters?.release_process || []),
      },
    },
    {
      headerName: 'التفاصيل',
      field: 'details',
      filter: false,
      minWidth: 400,
      flex: 3,
      sortable: false,
      cellClass: 'details-cell',
      wrapText: false,
      autoHeight: false,
      cellRenderer: (p: any) => {
        if (p.node.rowPinned) {
          const div = document.createElement('div');
          div.className = 'details-footer';
          div.innerText = `إجمالي الكمية: ${Number(p.data?.details_total_qty || 0).toLocaleString('en-US')}`;
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
    { headerName: 'الملاحظات', field: 'note', minWidth: 150, filter: 'agTextColumnFilter' },
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
          const queryParams = { id: element.data.id, dyeingid: element.data.dyeing_id };
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
    // فلتر مخفي لأمر الشغل (من التفاصيل)
    {
      headerName: 'أمر الشغل (تفاصيل)',
      colId: 'details_work_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_work_order || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.work_order_number).filter(Boolean).join(' | '),
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _dyeingRequisitionWdService: DyeingRequisitionWdService,
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

    this._dyeingRequisitionWdService.selectAllLazy(payload).subscribe({
      next: (res: any) => {
        const rows = Array.isArray(res?.rows) ? res.rows : [];
        const lastRow = Number(res?.lastRow ?? res?.totalRows ?? -1);

        this.lastGrandTotalQty = Number(res?.grandTotalQty ?? 0);
        this.availableFilters = res.availableFilters || {};

        setTimeout(() => { this.refreshAllSetFilters(); }, 0);

        p.successCallback(rows, lastRow);

        this.setPinnedFooterFromServerTotal();
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

  private setPinnedFooterFromServerTotal() {
    if (!this.gridApi) return;
    this.gridApi.setPinnedBottomRowData([{ details_total_qty: this.lastGrandTotalQty }]);
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

  private getRowDetailsTotal(details: any[]): number {
    return (details || []).reduce((sum, x) => sum + Number(x.quantity || 0), 0);
  }

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.details) ? row.details : [];
    const total = this.getRowDetailsTotal(details);

    const rowsHtml = details.map((d: any) => `
      <tr>
        <td class="c-wo">${d.work_order_number ?? ''}</td>
        <td class="c-price">${d.price ?? ''}</td>
        <td class="c-fee">${d.dyeing_fee ?? ''}</td>
        <td class="c-qty center">${Number(d.quantity || 0)}</td>
      </tr>
    `).join('');

    return `
      <table class="details-table">
        <colgroup>
          <col class="c-wo" />
          <col class="c-price" />
          <col class="c-fee" />
          <col class="c-qty" />
        </colgroup>
        <thead>
          <tr>
            <th>أمر الشغل</th>
            <th>السعر</th>
            <th>أجرة الصباغة</th>
            <th class="center">الكمية</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr>
            <th>الإجمالي</th>
            <th></th>
            <th></th>
            <th class="center">${Number(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
          </tr>
        </tfoot>
      </table>
    `;
  }
}
