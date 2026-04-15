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
import { FormDyeingRequisitionWdService } from "src/app/services/main/wd/form-dyeing-requisition-wd.service";

type MyColDef = ColDef & { excludeFromFooter?: boolean; };

@Component({
  selector: 'app-show-all-form-dyeing-requisition-wd',
  templateUrl: './show-all-form-dyeing-requisition-wd.component.html',
  styleUrls: ['./show-all-form-dyeing-requisition-wd.component.css']
})
export class ShowAllFormDyeingRequisitionWdComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;

  loading = false;
  lastGrandTotalDetailsQty = 0;

  sideBar: SideBarDef = {
    toolPanels: ['filters'],
    defaultToolPanel: undefined
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
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
    // ❌ شيل resetRowHeights events
  };

  filterStore = {
    dyeing_name: new Set<string>(),
    work_order_number: new Set<string>(),
    parent_wc_fabric_order_requisition_name: new Set<string>(),

    // details
    details_work_order: new Set<string>(),
    details_fabric_code: new Set<string>(),
    details_fabric: new Set<string>(),
    details_color: new Set<string>(),
  };

  availableFilters: any = {
    dyeing_name: [],
    work_order_number: [],
    parent_wc_fabric_order_requisition_name: [],

    details_work_order: [],
    details_fabric_code: [],
    details_fabric: [],
    details_color: [],
  };

  columnDefs: MyColDef[] = [
    {
      headerName: 'رقم الإذن',
      field: 'number',
      width: 80,
      cellClass: 'text-center',
      excludeFromFooter: true,
    },
    {
      headerName: 'تاريخ الإذن',
      field: 'date',
      width: 120,
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
      headerName: 'رقم الطلب',
      field: 'work_order_number',
      colId: 'work_order_number',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.work_order_number || []),
      },
    },
    {
      headerName: 'طلبية',
      field: 'parent_wc_fabric_order_requisition_name',
      colId: 'parent_wc_fabric_order_requisition_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.parent_wc_fabric_order_requisition_name || []),
      },
    },


    {
      headerName: 'التفاصيل',
      field: 'details',
      filter: false,
      minWidth: 660,
      flex: 5,
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

        // ✅ بعد الرسم قِس الارتفاع الحقيقي وبلّغ AG-Grid
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

    { headerName: 'الملاحظات', field: 'note', minWidth: 200, filter: 'agTextColumnFilter' },

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
          const queryParams = { id: element.data.id };
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

    // فلاتر مخفية على details
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
        (p.data?.details || []).map((d: any) => d.work_order_number_details).filter(Boolean).join(' | '),
    },
    {
      headerName: 'كود القماش (تفاصيل)',
      colId: 'details_fabric_code',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_fabric_code || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.details_fabric_code).filter(Boolean).join(' | '),
    },
    {
      headerName: 'نوع القماش (تفاصيل)',
      colId: 'details_fabric',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
        values: (params: any) => params.success(this.availableFilters?.details_fabric || []),
      },
      filterValueGetter: (p: any) =>
        (p.data?.details || []).map((d: any) => d.dyed_fabric_name).filter(Boolean).join(' | '),
    },
    {
      headerName: 'اللون (تفاصيل)',
      colId: 'details_color',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
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
      valueGetter: (p) => (p.data?.details || []).map((d: any) => d.quantity).filter(Boolean),
    },
  ];

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _formDyeingRequisitionWdService: FormDyeingRequisitionWdService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  // ✅ خليه واحد فقط (والـ template يربط عليه)
  // getRowHeight = (params: any) => {
  //   if (params.node.rowPinned) return 45;

  //   const details = params.data?.details?.length || 0;
  // const header = 30;
  // const row = 26;
  // const padding = 12;
  // return header + (details * row) + padding;
  // };

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

    this._formDyeingRequisitionWdService.selectAllLazy(payload).subscribe({
      next: (res: any) => {
        const rows = Array.isArray(res?.rows)
          ? res.rows
          : [];
        const lastRow = Number(res?.lastRow ?? res?.totalRows ?? -1);

        this.lastGrandTotalDetailsQty = Number(res?.grandTotalDetailsQty ?? 0);

this.availableFilters = res.availableFilters || {};

setTimeout(() => {
  this.refreshAllSetFilters();
}, 0);

p.successCallback(rows, lastRow);

        // console.log('ROW:', res);

        // عبّي filterStore صح
        // rows.forEach((r: any) => {

        //   if (r?.dyeing_name) {
        //     this.filterStore.dyeing_name.add(String(r.dyeing_name));
        //   }

        //   if (r?.work_order_number) {
        //     this.filterStore.work_order_number.add(String(r.work_order_number));
        //   }

        //   if (r?.wc_fabric_order_requisition_name) {
        //     this.filterStore.wc_fabric_order_requisition_name.add(
        //       String(r.wc_fabric_order_requisition_name)
        //     );
        //   }

        //   // details
        //   if (Array.isArray(r?.details)) {
        //     r.details.forEach((d: any) => {

        //       if (d?.work_order_number_details) {
        //         this.filterStore.details_work_order.add(
        //           String(d.work_order_number_details)
        //         );
        //       }

        //       if (d?.dyed_fabric_code) {
        //         this.filterStore.details_fabric_code.add(
        //           String(d.dyed_fabric_code)
        //         );
        //       }

        //       if (d?.dyed_fabric_name) {
        //         this.filterStore.details_fabric.add(
        //           String(d.dyed_fabric_name)
        //         );
        //       }

        //       if (d?.color_name) {
        //         this.filterStore.details_color.add(
        //           String(d.color_name)
        //         );
        //       }
        //     });
        //   }
        // });

        // ✅ الفوتر من السيرفر
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

  // ✅ فقط لو هو Set Filter
  if (typeof filter.setFilterValues !== 'function') return;

  const values = Array.isArray(this.availableFilters[colId]) ? this.availableFilters[colId] : [];
  filter.setFilterValues(values);
  filter.refreshFilterValues?.();
});
    });

    // فك القفل بعد tick
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
    this.gridApi.setPinnedBottomRowData([{ details_total_qty: this.lastGrandTotalDetailsQty }]);
    this.gridApi.refreshCells({ force: true });
  }

  onFilterChanged() {
    if (!this.gridApi) return;
    this.gridApi.purgeInfiniteCache(); // يعيد تحميل من أول مع الفلاتر
  }

  clearAg() {
    if (!this.gridApi) return;
    this.gridApi.setFilterModel(null);
    this.gridApi.purgeInfiniteCache();
  }

  // ====== renderer ======
  private getRowDetailsTotal(details: any[]): number {
    return (details || []).reduce((sum, x) => sum + Number(x.quantity || 0), 0);
  }

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.details) ? row.details : [];
    const total = this.getRowDetailsTotal(details);

    const rowsHtml = details.map((d: any) => `
    <tr>
      <td class="c-wo">${d.work_order_number_details ?? ''}</td>
      <td class="c-fabric-code">${d.dyed_fabric_code ?? ''}</td>
      <td class="c-fabric">${d.dyed_fabric_name ?? ''}</td>
      <td class="c-color">${d.color_name ?? ''}</td>
      <td class="c-qty center">${Number(d.quantity || 0)}</td>
      <td class="c-chk center">
        <input type="checkbox" ${Number(d.is_prepare_dyeing) === 1 ? 'checked' : ''} disabled />
      </td>
    </tr>
  `).join('');

    return `
    <table class="details-table">
      <colgroup>
        <col class="c-wo" />
        <col class="c-fabric-code" />
        <col class="c-fabric" />
        <col class="c-color" />
        <col class="c-qty" />
        <col class="c-chk" />
      </colgroup>

      <thead>
        <tr>
          <th>أمر الشغل</th>
          <th>كود القماش</th>
          <th>نوع القماش</th>
          <th>اللون</th>
          <th class="center">الكمية</th>
          <th class="center">نزل المصبغة</th>
        </tr>
      </thead>

      <tbody>${rowsHtml}</tbody>

      <tfoot>
        <tr>
          <th>الإجمالي</th>
          <th></th>
          <th></th><th></th>
          <th class="center">
          ${Number(total).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
      }
          
          </th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  `;
  }


}
