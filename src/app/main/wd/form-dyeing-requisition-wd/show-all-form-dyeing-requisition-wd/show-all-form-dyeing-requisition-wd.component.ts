import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { FormDyeingRequisitionWdService } from "src/app/services/main/wd/form-dyeing-requisition-wd.service";

@Component({
  selector: 'app-show-all-form-dyeing-requisition-wd',
  templateUrl: './show-all-form-dyeing-requisition-wd.component.html',
  styleUrls: ['./show-all-form-dyeing-requisition-wd.component.css']
})
export class ShowAllFormDyeingRequisitionWdComponent implements OnInit {

  rowData: any[] = [];   // = fabrics
  results: any[] = []
  private gridApi!: GridApi;
  sideBar = {
    toolPanels: ['filters'],
    defaultToolPanel: null   // ✅ مقفول عند البداية
  };

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    sortable: true,
    filter: true,
  };

  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;
  public columnDefs: ColDef[] = [
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
      width: 80,
      cellClass: 'text-center',
      filter: 'agDateColumnFilter',
      excludeFromFooter: true,
    },

    {
      headerName: 'المصبغة',
      field: 'dyeing_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },

    {
      headerName: 'رقم الطلب',
      field: 'work_order_number',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },

    {
      headerName: 'طلبية',
      field: 'wc_fabric_order_requisition_name',
      filter: 'agSetColumnFilter',
      filterParams: {
        excelMode: 'windows',
      },
      excludeFromFooter: true,
    },

    {
      headerName: 'التفاصيل',
      field: 'details',
      filter: false,
      minWidth: 500,
      flex: 4,
      sortable: false,
      cellClass: 'details-cell',         // ✅ مهم
      cellRenderer: (p: any) => {

        // ✅ إذا كان الصف فوتر (Pinned Bottom Row)
        if (p.node.rowPinned) {

          const total = Number(p.data?.details_total_qty || 0);

          return `
      <div style="font-weight:700; text-align:center;">
        إجمالي الكمية: ${total.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
      </div>
    `;
        }

        // ✅ الصفوف العادية
        return this.detailsRenderer(p.data);
      },
      autoHeight: true,
    },

    { headerName: 'الملاحظات', field: 'note', minWidth: 200, filter: 'agTextColumnFilter' },

    {
      headerName: 'تفاصيل الإذن',
      field: 'id',
      maxWidth: 120,
      sortable: false,
      filter: false,
      cellRenderer: (element) => {
        const link = document.createElement('a');
        link.innerHTML = `<i class="fas fa-angle-double-right update-symbol"></i>`;
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';

        link.addEventListener('click', (event) => {
          const queryParams = new URLSearchParams({
            id: element.data.id,
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
      }
    },

    {
      headerName: 'أمر الشغل',
      colId: 'details_work_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
      },
      valueGetter: (p) =>
        (p.data?.details || [])
          .map((d: any) => d.work_order_number_details)
          .filter(Boolean),
    },

    {
      headerName: 'الكمية',
      colId: 'details_quantity',
      hide: true,
      filter: 'agTextColumnFilter',
      valueGetter: (p) =>
        (p.data?.details || [])
          .map((d: any) => d.quantity)
          .filter(Boolean),
    },

    {
      headerName: 'نوع القماش',
      colId: 'details_fabric',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
      },
      valueGetter: (p) =>
        (p.data?.details || [])
          .map((d: any) => d.dyed_fabric_name)
          .filter(Boolean),
    },

    {
      headerName: 'اللون',
      colId: 'details_color',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        suppressMiniFilter: false,
        excelMode: 'windows',
      },
      valueGetter: (p) =>
        (p.data?.details || [])
          .map((d: any) => d.color_name)
          .filter(Boolean),
    },

  ].reverse(); gridColumnApi: any;;
  pinnedBottomRowData: any
  totalFooterValues = {}
  gridParams!: GridReadyEvent;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _formDyeingRequisitionWdService: FormDyeingRequisitionWdService,
  ) {

  }
  ngOnInit(): void {
  }

  getRowHeight = (params: any) => {
    if (params.node.rowPinned) return 45;

    const count = params.data?.details?.length || 1;

    // هيدر + صفوف التفاصيل + فوتر
    return 35 + (count * 28) + 35;
  };


  onGridReady(params: GridReadyEvent) {
    this.gridParams = params;
    this.getData(this.gridParams); // أول تحميل يكون العادية
  }

  getData(params: GridReadyEvent) {
    this._formDyeingRequisitionWdService
      .selectAll()
      .subscribe((response: any) => {
        this.applyGridData(params, response);
      });
  }

  applyGridData(params: GridReadyEvent, data: any) {
    this.results = data;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.results);

    requestAnimationFrame(() => setTimeout(() => this.updatePinnedFooter(), 100));

    setTimeout(() => {
      const viewport = this.agGridElement.nativeElement.querySelector('.ag-center-cols-viewport');
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 100);
  }


  // نفس total بتاعك لكن على details[]
  getRowDetailsTotal(details: any[]): number {
    return (details || []).reduce((sum, x) => sum + Number(x.quantity || 0), 0);
  }

  detailsRenderer(row: any) {
    const details = Array.isArray(row?.details) ? row.details : [];
    const total = this.getRowDetailsTotal(details);

    const rowsHtml = details.map((d: any) => `
      <tr>
<td style="width:80px;">${d.work_order_number_details}</td>
<td style="width:80px;">${d.dyed_fabric_name}</td>
<td style="width:80px;">${d.color_name}</td>        
<td style="width:80px; text-align:center;">${Number(d.quantity || 0)}</td>
        <td style="width:80px; text-align:center;">
          <input type="checkbox" ${Number(d.is_prepare_dyeing) === 1 ? 'checked' : ''} disabled />
        </td>
      </tr>
    `).join('');

    return `
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="font-weight:600;">
            <td style="width:80px;">امر الشغل</td>
            <td style="width:80px;">نوع القماش</td>
            <td style="width:80px;">اللون</td>
            <td style="width:80px; text-align:center;">الكمية</td>
            <td style="width:80px; text-align:center;">نزل المصبغة</td>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr style="font-weight:700;">
            <td style="width:80px;">الإجمالي</td>
            <td></td><td></td>
            <td style="text-align:center;">${total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  // إجمالي كل الجدول (مع احترام الفلاتر الحالية)
  updatePinnedFooter() {
    if (!this.gridApi) return;

    requestAnimationFrame(() => {
      const summary: any = {};
      const columns = (this.gridApi.getColumnDefs() || []).filter((c: any) => 'field' in c);

      // 🧹 تفريغ القيم القديمة
      this.totalFooterValues = {};
      let grandTotalQty = 0;

      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (!node.data) return;

        columns.forEach((col: any) => {
          const field = col.field;
          if (!field) return;

          // تجاهل الأعمدة غير الرقمية
          if (col.excludeFromFooter) return;


          // ✅ اجمع من الصفوف بعد الفلتر والـ sort (يعني مثل اللي شايفه المستخدم)
          this.gridApi.forEachNodeAfterFilterAndSort((node) => {
            const details = node.data?.details || [];
            for (const d of details) {
              grandTotalQty += Number(d.quantity || 0);
            }
          });

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
      this.pinnedBottomRowData = [
        ...summary,
        { details_total_qty: grandTotalQty },   // 👈 هذا الرقم النهائي
      ];
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
      console.log('✅ pinned row set in grid:', this.gridApi.getPinnedBottomRowCount());
      this.gridApi.refreshCells({ force: true });


    });
  }

  onFilterChanged() {
    this.updatePinnedFooter();
  }

}
