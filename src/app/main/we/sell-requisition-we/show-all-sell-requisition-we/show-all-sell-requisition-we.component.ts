import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

import { ConfirmationService } from 'primeng/api';

import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";

type MyColDef = ColDef & { excludeFromFooter?: boolean; };

@Component({
  selector: 'app-show-all-sell-requisition-we',
  templateUrl: './show-all-sell-requisition-we.component.html',
  styleUrls: ['./show-all-sell-requisition-we.component.css'],
  providers: [ConfirmationService]
})
export class ShowAllSellRequisitionWeComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  titlePage = '';
  isShowConfirmDirectSell = false;
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
    seller_name: [],
    details_fabric: [],
    details_order: [],
    details_color: [],
    details_work_order: [],
    details_grade_item: [],
  };

  columnDefs: MyColDef[] = [
    {
      headerName: 'رقم الإذن',
      field: 'number',
      width: 110,
      cellClass: 'text-center',
      excludeFromFooter: true,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'تاريخ الإذن',
      field: 'date',
      width: 160,
      cellClass: 'text-center',
      filter: 'agDateColumnFilter',
      excludeFromFooter: true,
      filterParams: this._sharedComponentService.dateFilterParams(),
      valueFormatter: (p: any) => this._sharedComponentService.formatDate(p.value),
    },
    {
      headerName: 'العميل',
      field: 'seller_name',
      colId: 'seller_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) =>
          params.success(this.availableFilters?.seller_name || []),
      },
    },
    {
      headerName: 'اسم السائق',
      field: 'delivery_car_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'تفاصيل',
      field: 'details',
      filter: false,
      minWidth: 650,
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
            `إجمالي الكمية: ${Number(p.data?.details_total_qty || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` +
            `   |   إجمالي الأثواب: ${Number(p.data?.details_total_fabric_piece || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'انتظار / تأكيد الاستلام',
      colId: 'confirm_approved',
      width: 170,
      sortable: false,
      filter: false,
      cellClass: (p: any) => {
        if (p.data?.is_active == '0') return 'warning_background';
        if (p.data?.is_approved == '1') return 'confirm_background';
        return '';
      },
      cellRenderer: (p: any) => {
        if (!p.data) return '';

        const canApprove =
          this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[17]) &&
          p.data.is_approved == '0';

        const canCancel =
          this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[18]) &&
          p.data.is_approved == '1';

        if (!canApprove && !canCancel) return '';

        const iconClass = canApprove
          ? 'fa-solid fa-check update-symbol'
          : 'fa-solid fa-xmark delete-symbol';

        const link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.innerHTML = `<i class="${iconClass}"></i>`;

        link.addEventListener('click', (event) => {
          this.confirmCancelReceived(event, p.data, p.data.is_approved);
        });

        return link;
      }
    },
    {
      headerName: 'تفاصيل الإذن',
      colId: 'details_link',
      maxWidth: 130,
      sortable: false,
      filter: false,
      cellClass: (p: any) => {
        if (p.data?.is_active == '0') return 'warning_background';
        if (p.data?.is_approved == '1') return 'confirm_background';
        return '';
      },
      cellRenderer: (p: any) => {
        if (!p.data) return '';

        const isDirect = String(p.data.is_direct) === '1';
        const base = window.location.origin;
        const pathNormal = `${window.location.pathname}/details`;
        const pathDirect = `/dashboard/show-all-sell-requisition-direct-we/details`;

        const url = isDirect
          ? `${base}${pathDirect}?id=${encodeURIComponent(p.data.id)}`
          : `${base}${pathNormal}?id=${encodeURIComponent(p.data.id)}`;

        const link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.innerHTML = isDirect
          ? `تسليم مباشر`
          : `<i class="fas fa-angle-double-right update-symbol"></i>`;

        link.addEventListener('click', (event: MouseEvent) => {
          if (event.ctrlKey || event.button === 1) window.open(url, '_blank');
          else window.location.href = url;
        });

        return link;
      }
    },
    {
      headerName: 'الطلبية',
      colId: 'details_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_order || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.we_dyed_fabric_order_requisition_name).filter(Boolean).join(' | '),
    },
    {
      headerName: 'اسم القماش',
      colId: 'details_fabric',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_fabric || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.dyed_fabric_name).filter(Boolean).join(' | '),
    },
    {
      headerName: 'اللون',
      colId: 'details_color',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_color || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.color_name).filter(Boolean).join(' | '),
    },
    {
      headerName: 'الكمية',
      colId: 'details_quantity',
      hide: true,
      filter: 'agTextColumnFilter',
      valueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.quantity).filter(Boolean),
    },
    {
      headerName: 'عدد الأثواب',
      colId: 'details_fabric_piece',
      hide: true,
      filter: 'agTextColumnFilter',
      valueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.fabric_piece).filter(Boolean),
    },
    {
      headerName: 'أمر الشغل',
      colId: 'details_work_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_work_order || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.work_order_number).filter(Boolean).join(' | '),
    },
    {
      headerName: 'نوع الدرجة',
      colId: 'details_grade_item',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_grade_item || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.grade_item_name).filter(Boolean).join(' | '),
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.router.url === '/dashboard/show-all-sell-requisition-direct-we') {
      this.isShowConfirmDirectSell = true;
      this.titlePage = 'إظهار جميع اذونات التسليم المباشر';
    } else {
      this.isShowConfirmDirectSell = false;
      this.titlePage = 'إظهار جميع اذونات بيع القماش';
    }

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
      isDirect: this.router.url === '/dashboard/show-all-sell-requisition-direct-we',
    };

    this._sellRequisitionWeService.selectAllLazy(payload).subscribe({
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

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.details) ? row.details : [];
    const rowTotalQty = details.reduce((s: number, d: any) => s + Number(d.quantity || 0), 0);
    const rowTotalPieces = details.reduce((s: number, d: any) => s + Number(d.fabric_piece || 0), 0);

    const rowsHtml = details.map((d: any) => `
      <tr>
        <td style="width:90px;">${d.we_dyed_fabric_order_requisition_name ?? ''}</td>
        <td style="width:120px;">${d.dyed_fabric_name ?? ''}</td>
        <td style="width:90px;">${d.color_name ?? ''}</td>
        <td style="width:80px; text-align:center;">${Number(d.quantity || 0)}</td>
        <td style="width:80px; text-align:center;">${Number(d.fabric_piece || 0)}</td>
        <td style="width:90px;">${d.work_order_number ?? ''}</td>
        <td style="width:90px;">${d.grade_item_name ?? ''}</td>
      </tr>
    `).join('');

    return `
      <table class="details-table">
        <thead>
          <tr>
            <th style="width:90px;">الطلبية</th>
            <th style="width:120px;">اسم القماش</th>
            <th style="width:90px;">اللون</th>
            <th style="width:80px; text-align:center;">الكمية</th>
            <th style="width:80px; text-align:center;">عدد الأثواب</th>
            <th style="width:90px;">أمر الشغل</th>
            <th style="width:90px;">نوع الدرجة</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr>
            <th>الإجمالي</th>
            <th></th>
            <th></th>
            <th style="text-align:center;">${rowTotalQty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
            <th style="text-align:center;">${rowTotalPieces.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    `;
  }

  confirmCancelReceived(event: Event, element: any, isApproved: any) {
    if (isApproved == '0') {
      this.popupReceived(event, element, 'تأكيد الأستلام', '1');
    } else if (isApproved == '1') {
      this.popupReceived(event, element, 'إلغاء الأستلام', '0');
    }
  }

  popupReceived(event: Event, element: any, message: string, isApproved: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: message,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.executeConfirmReceived(element, isApproved);
      },
      reject: () => { }
    });
  }

  executeConfirmReceived(data: any, isApproved: string) {
    this._constantsService.spinner.show();
    const formData = {
      isApproved: isApproved,
      personid: this._sessionManagerService.Person_ID,
      ipaddress: this._sessionManagerService.IP_ADDRESS
    };
    this._sellRequisitionWeService.confirmReceived(formData, data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg === 'data updated') {
        this._constantsService.successUpdateMessage();
        this.gridApi?.purgeInfiniteCache();
      } else {
        this._constantsService.userErrorMessage();
      }
    });
  }

}
