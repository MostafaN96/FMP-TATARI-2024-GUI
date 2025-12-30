import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// grid angular Table
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';

import { ConfirmationService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";

@Component({
  selector: 'app-show-all-sell-requisition-we',
  templateUrl: './show-all-sell-requisition-we.component.html',
  styleUrls: ['./show-all-sell-requisition-we.component.css'],
  providers: [ConfirmationService]
})
export class ShowAllSellRequisitionWeComponent implements OnInit {


  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  titlePage = ""
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
    { headerName: 'رقم الإذن', field: 'number', width: 110, cellClass: 'text-center', filter: 'agNumberColumnFilter', excludeFromFooter: true },
    { headerName: 'تاريخ الإذن', field: 'date', width: 160, filter: 'agDateColumnFilter', excludeFromFooter: true },
    { headerName: 'العميل', field: 'seller_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },
    { headerName: 'اسم السائق', field: 'delivery_car_name', filter: 'agSetColumnFilter', filterParams: { excelMode: 'windows' }, excludeFromFooter: true },

    {
      headerName: 'تفاصيل',
      field: 'details',
      filter: false,
      minWidth: 750,
      flex: 3,
      sortable: false,
      cellClass: 'details-cell',
      autoHeight: true,
      wrapText: true,
      cellRenderer: (p: any) => {
        if (p.node.rowPinned) {
          const totalQty = Number(p.data?.details_total_qty || 0);
          const totalPieces = Number(p.data?.details_total_pieces || 0);

          return `
          <div style="font-weight:700; text-align:center;">
            إجمالي الكمية: ${totalQty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <br/>
            إجمالي عدد الأثواب: ${totalPieces.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>`;
        }
        return this.detailsRenderer(p.data);
      },
    },

    { headerName: 'الملاحظات', field: 'note', minWidth: 200, filter: 'agTextColumnFilter', excludeFromFooter: true },

    // ✅ فلاتر على حقول داخل details[] (مخفيّة بس للفلترة)
    {
      headerName: 'أمر الشغل',
      colId: 'details_work_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: { suppressMiniFilter: false, excelMode: 'windows' },
      valueGetter: (p) => (p.data?.details || []).map((d: any) => d.work_order_number).filter(Boolean),
    },
    {
      headerName: 'الطلبية',
      colId: 'details_order',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: { suppressMiniFilter: false, excelMode: 'windows' },
      valueGetter: (p) => (p.data?.details || []).map((d: any) => d.we_dyed_fabric_order_requisition_name).filter(Boolean),
    },
    {
      headerName: 'اسم القماش',
      colId: 'details_fabric',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: { suppressMiniFilter: false, excelMode: 'windows' },
      valueGetter: (p) => (p.data?.details || []).map((d: any) => d.dyed_fabric_name).filter(Boolean),
    },
    {
      headerName: 'اللون',
      colId: 'details_color',
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: { suppressMiniFilter: false, excelMode: 'windows' },
      valueGetter: (p) => (p.data?.details || []).map((d: any) => d.color_name).filter(Boolean),
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

    const base = window.location.origin; // الدومين
    const pathNormal = `${window.location.pathname}/details`; 
    // إذا بدك مسار ثابت بدل pathname استخدم '/dashboard/show-all-sell-requisition-we'

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
      // Ctrl + Click أو Middle Click → تبويب جديد
      if (event.ctrlKey || event.button === 1) window.open(url, '_blank');
      else window.location.href = url;
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
          .map((d: any) => d.work_order_number)
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
      headerName: 'اسم القماش',
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

  isShowConfirmDirectSell = false

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private confirmationService: ConfirmationService,
    private router: Router

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

    if (this.router.url === '/dashboard/show-all-sell-requisition-direct-we') {
      this.isShowConfirmDirectSell = true
      this.titlePage = "إظهار جميع اذونات التسليم المباشر"
      this.getData(this.gridParams, "direct"); // أول تحميل يكون العادية
    }
    else {
      this.isShowConfirmDirectSell = false
      this.titlePage = "إظهار جميع اذونات بيع القماش"
      this.getData(this.gridParams, ""); // أول تحميل يكون العادية
    }
  }

  getData(params: GridReadyEvent, isDirect?: string) {
    this._sellRequisitionWeService.selectAll(isDirect).subscribe((response: any) => {
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
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="font-weight:600;">
          <td style="width:90px;">الطلبية</td>
          <td style="width:120px;">اسم القماش</td>
          <td style="width:90px;">اللون</td>
          <td style="width:80px; text-align:center;">الكمية</td>
          <td style="width:80px; text-align:center;">عدد الأثواب</td>
          <td style="width:90px;">أمر الشغل</td>
          <td style="width:90px;">نوع الدرجة</td>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
      <tfoot>
        <tr style="font-weight:700;">
          <td>الإجمالي</td>
          <td></td><td></td>
          <td style="text-align:center;">${rowTotalQty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="text-align:center;">${rowTotalPieces.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td></td><td></td>
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

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  confirmCancelReceived(event: Event, element, isApproved) {
    if (isApproved == "0") {
      this.popupReceived(event, element, 'تأكيد الأستلام', "1")
    } else if (isApproved == "1") {
      this.popupReceived(event, element, 'إلغاء الأستلام', "0")
    }
  }

  popupReceived(event: Event, element, message, isApproved) {
    this.confirmationService.confirm({
      target: event.target!,
      message: message,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.executeConfirmReceived(element, isApproved);
      },
      reject: () => {
      }
    });
  }

  executeConfirmReceived(data, isApproved) {
    this._constantsService.spinner.show()
    const formData = {
      isApproved: isApproved,
      personid: this._sessionManagerService.Person_ID,
      ipaddress: this._sessionManagerService.IP_ADDRESS
    }
    this._sellRequisitionWeService.confirmReceived(formData, data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()

        if (this.router.url === '/dashboard/show-all-sell-requisition-direct-we') {
          this.isShowConfirmDirectSell = true
          this.titlePage = "إظهار جميع اذونات التسليم المباشر"
          this.getData(this.gridParams, "direct"); // أول تحميل يكون العادية
        }
        else {
          this.isShowConfirmDirectSell = false
          this.titlePage = "إظهار جميع اذونات بيع القماش"
          this.getData(this.gridParams, ""); // أول تحميل يكون العادية
        }

      }
      else {
        this._constantsService.userErrorMessage()
      }
    })
  }

}
