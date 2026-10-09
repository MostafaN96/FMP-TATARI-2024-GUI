import { Component, EventEmitter, ElementRef, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// AG Grid
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { ConstantsService } from "src/app/services/constants.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dyed-fabric-order-requisition-show-all-we',
  templateUrl: './dyed-fabric-order-requisition-show-all-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-show-all-we.component.css'],
  providers: [ConfirmationService]
})
export class DyedFabricOrderRequisitionShowAllWeComponent implements OnInit {

  @Output() event_callback: EventEmitter<any> = new EventEmitter();
  
  /////////////////// Variables /////////////////// 
  fabrics: any[] = []
  rowData: any[] = [];
  private gridApi!: GridApi;
  gridParams!: GridReadyEvent;
  isLoading = false;
  loadingOverlayTemplate = `
    <div class="ag-custom-loading-overlay">
      <span class="ag-custom-spinner"></span>
      <span>جاري تحميل البيانات...</span>
    </div>
  `;
  noRowsOverlayTemplate = '<span class="ag-overlay-no-rows-center">لا يوجد بيانات</span>';
  
  @ViewChild('agGrid', { read: ElementRef }) agGridElement!: ElementRef;

  selectedData: any = []

  // AG Grid Configuration
  sideBar = {
    toolPanels: ['filters'],
    defaultToolPanel: null
  };

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  public columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'checkbox',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      filter: false,
      sortable: false,
      suppressMenu: true,
      pinned: 'left' as const,
      hide: false,
      wrapText: false,
      autoHeight: false,
      wrapHeaderText: false,
      autoHeaderHeight: false,
      cellClass: (params) => {
        const hidden = this.router.url !== '/dashboard/show-all-opened-dyed-fabric-order-requisition-we';
        return hidden ? 'hidden-cell' : '';
      }
    },
    { 
      headerName: 'رقم الإذن', 
      field: 'number', 
      width: 90,
      filter: 'agNumberColumnFilter',
      wrapText: false,
      autoHeight: false,
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : ''
    },
    { 
      headerName: 'تاريخ الإذن', 
      field: 'date', 
      minWidth: 150,
      flex: 1,
      filter: 'agDateColumnFilter',
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : '',
      filterParams: this._sharedComponentService.dateFilterParams(),
      valueFormatter: p => this._sharedComponentService.formatDate(p.value),
    },
    { 
      headerName: 'العميل', 
      field: 'seller_name', 
      minWidth: 120,
      flex: 1,
      filter: 'agSetColumnFilter', 
      filterParams: { excelMode: 'windows' },
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : ''
    },
    { 
      headerName: 'اسم الطلبية', 
      field: 'name', 
      minWidth: 150,
      flex: 2,
      filter: 'agSetColumnFilter', 
      filterParams: { excelMode: 'windows' },
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : ''
    },
    { 
      headerName: 'الملاحظات', 
      field: 'note', 
      minWidth: 120,
      flex: 1.5,
      filter: 'agTextColumnFilter',
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : ''
    },
    {
      headerName: 'طلبية خيط',
      colId: 'yarn_order',
      width: 110,
      sortable: false,
      filter: false,
      autoHeight: true,
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : '',
      cellRenderer: (params: any) => {
        if (!params.data) return '';
        const element = params.data;
        
        if (!element.yarnOrders || element.yarnOrders.length < 1) {
          const link = document.createElement('a');
          link.style.cursor = 'pointer';
          link.style.color = '#28a745';
          link.innerHTML = '<i class="fa-solid fa-square-plus update-symbol"></i>';
          const addUrlTree = this.router.createUrlTree([
            `/dashboard/${this._constantsService.ROUTING_LINKS[163]}`
          ], {
            queryParams: {
              id: element.id,
              ordersRequisitionsId: element.orders_requisitions_id
            }
          });
          link.href = this.router.serializeUrl(addUrlTree);
          link.addEventListener('click', (event: MouseEvent) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            this.navigateToYarnOrder('add', element);
          });
          return link;
        }

        const container = document.createElement('div');
        element.yarnOrders.forEach((yarnOrder: any, index: number) => {
          const link = document.createElement('a');
          link.style.cursor = 'pointer';
          link.style.display = 'block';
          link.style.paddingBottom = '4px';
          link.style.color = '#007bff';
          link.textContent = yarnOrder.order_number;
          const route = this._constantsService.ROUTING_LINKS[yarnOrder.is_order == '1' ? 164 : 175];
          const url = `/dashboard/${route}`;
          const queryParams = { id: yarnOrder.wa_yarn_order_requisition_id };
          const urlTree = this.router.createUrlTree([url], { queryParams });
          link.href = this.router.serializeUrl(urlTree);
          link.addEventListener('click', (event: MouseEvent) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            this.router.navigate([url], { queryParams });
          });
          container.appendChild(link);
        });
        return container;
      }
    },
    {
      headerName: 'طلبية الخام',
      colId: 'fabric_order',
      width: 110,
      sortable: false,
      filter: false,
      autoHeight: true,
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : '',
      cellRenderer: (params: any) => {
        if (!params.data) return '';
        const element = params.data;
        
        if (!element.fabricOrders || element.fabricOrders.length < 1) {
          const link = document.createElement('a');
          link.style.cursor = 'pointer';
          link.style.color = '#28a745';
          link.innerHTML = '<i class="fa-solid fa-square-plus update-symbol"></i>';
          const addUrlTree = this.router.createUrlTree([
            `/dashboard/${this._constantsService.ROUTING_LINKS[177]}`
          ], {
            queryParams: { id: element.id }
          });
          link.href = this.router.serializeUrl(addUrlTree);
          link.addEventListener('click', (event: MouseEvent) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            this.navigateToFabricOrder('add', element);
          });
          return link;
        }

        const container = document.createElement('div');
        element.fabricOrders.forEach((fabricOrder: any) => {
          const link = document.createElement('a');
          link.style.cursor = 'pointer';
          link.style.display = 'block';
          link.style.paddingBottom = '4px';
          link.style.color = '#007bff';
          link.textContent = fabricOrder.order_number;
          const route = this._constantsService.ROUTING_LINKS[fabricOrder.is_order == '1' ? 179 : 181];
          const url = `/dashboard/${route}`;
          const queryParams = { id: fabricOrder.wc_fabric_order_requisition_id };
          const urlTree = this.router.createUrlTree([url], { queryParams });
          link.href = this.router.serializeUrl(urlTree);
          link.addEventListener('click', (event: MouseEvent) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            this.router.navigate([url], { queryParams });
          });
          container.appendChild(link);
        });
        return container;
      }
    },
    {
      // ملفات إكسل تفاصيل الطلبية التي ترسلها الشركة: رفع، تنزيل، حذف
      headerName: 'ملف الطلبية (إكسل)',
      colId: 'excel_files',
      minWidth: 190,
      flex: 1.5,
      sortable: false,
      filter: false,
      autoHeight: true,
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : '',
      cellRenderer: (params: any) => this.excelFilesRenderer(params),
    },
    {
      headerName: 'إغلاق الطلبية',
      colId: 'close_order',
      width: 100,
      sortable: false,
      filter: false,
      hide: false,
      wrapText: false,
      autoHeight: false,
      cellClass: (params) => {
        const hidden = this.router.url !== '/dashboard/show-all-opened-dyed-fabric-order-requisition-we';
        const bgClass = params.data?.is_active == '0' ? 'warning_background' : '';
        return hidden ? `hidden-cell ${bgClass}` : bgClass;
      },
      cellRenderer: (params: any) => {
        if (!params.data) return '';
        if (this.router.url !== '/dashboard/show-all-opened-dyed-fabric-order-requisition-we') return '';
        
        const link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.innerHTML = '<i class="fas fa-edit update-symbol"></i>';
        link.addEventListener('click', (event) => {
          this.confirmClose(event, params.data);
        });
        return link;
      }
    },
    {
      headerName: 'تفاصيل الإذن',
      colId: 'details_link',
      width: 100,
      sortable: false,
      filter: false,
      wrapText: false,
      autoHeight: false,
      cellClass: (params) => params.data?.is_active == '0' ? 'warning_background' : '',
      cellRenderer: (params: any) => {
        if (!params.data) return '';
        
        const link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.style.color = '#007bff';
        link.innerHTML = '<i class="fas fa-angle-double-right update-symbol"></i>';
        const basePath = this.router.url;
        const detailsPath = this.router.url === '/dashboard/show-all-closed-dyeing-order-wd' ? 'closed-details' : 'details';
        const url = `${basePath}/${detailsPath}`;
        const queryParams = { id: params.data.id };
        const urlTree = this.router.createUrlTree([url], { queryParams });
        link.href = this.router.serializeUrl(urlTree);
        link.addEventListener('click', (event: MouseEvent) => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          this.router.navigate([url], { queryParams });
        });
        return link;
      }
    }
  ].reverse();

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    private _reportWeService: ReportWeService,
    public _constantsService: ConstantsService,
    public router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridParams = params;
    this.gridApi = params.api;

    if (this.router.url === '/dashboard/show-all-closed-dyed-fabric-order-requisition-we') {
      this.getData("closed");
    } else {
      this.getData();
    }
  }

  getData(isClosed?: string) {
    this.isLoading = true;
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
    }

    this._dyedFabricOrderRequisitionWeService.selectAll(isClosed)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response: any) => {
        this.fabrics = response || [];
        this.rowData = response || [];
        if (this.gridApi) {
          this.gridApi.setRowData(this.rowData);
          if (!this.rowData.length) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
        }
      }, () => {
        this.rowData = [];
        if (this.gridApi) {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
      });
  }

  resetFilters() {
    if (!this.gridApi || !this.gridParams?.columnApi) return;

    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridParams.columnApi.applyColumnState({
      defaultState: { sort: null, sortIndex: null }
    });
    this.gridApi.deselectAll();
  }

  // Navigation Methods
  navigateToYarnOrder(type: string, element: any) {
    const routeMap: any = {
      'add': this._constantsService.ROUTING_LINKS[163]
    };
    
    const route = `/dashboard/${routeMap[type]}`;
    this.router.navigate([route], {
      queryParams: {
        id: element.id,
        ordersRequisitionsId: element.orders_requisitions_id
      }
    });
  }

  navigateToFabricOrder(type: string, element: any) {
    const routeMap: any = {
      'add': this._constantsService.ROUTING_LINKS[177]
    };
    
    const route = `/dashboard/${routeMap[type]}`;
    this.router.navigate([route], {
      queryParams: { id: element.id }
    });
  }

  confirmClose(event: Event, element: any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'تأكيد إغلاق الطلبية؟',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeOrder(element);
      },
      reject: () => {}
    });
  }

  closeOrder(data: any) {
    this._constantsService.spinner.show();
    this._dyedFabricOrderRequisitionWeService.closeOrderByRequisition(data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage();
        this.getData();
      } else {
        this._constantsService.userErrorMessage();
      }
    });
  }

  ///////////////////// ملفات إكسل تفاصيل الطلبية /////////////////////

  private readonly excelAccept = '.xlsx,.xls,.xlsm,.csv';
  private readonly maxExcelSizeMb = 20;
  uploadingOrderIds = new Set<string>();

  private excelFilesRenderer(params: any): HTMLElement | string {
    if (!params.data) return '';
    const order = params.data;
    const files: any[] = order.excelFiles || [];

    const host = document.createElement('div');
    host.className = 'excel-files-cell';

    for (const file of files) {
      const line = document.createElement('div');
      line.className = 'excel-file-line';

      const link = document.createElement('a');
      link.className = 'excel-file-link';
      link.href = '#';
      link.title = `${file.original_name}\nرُفع: ${this._sharedComponentService.formatDate(file.created_at)}`;
      link.innerHTML = '<i class="far fa-file-excel"></i> ';
      link.appendChild(document.createTextNode(file.original_name));
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.downloadOrderFile(file);
      });

      const remove = document.createElement('a');
      remove.className = 'excel-file-remove';
      remove.href = '#';
      remove.title = 'حذف الملف';
      remove.innerHTML = '<i class="fas fa-times"></i>';
      remove.addEventListener('click', (event) => {
        event.preventDefault();
        this.confirmDeleteOrderFile(event, params, file);
      });

      line.appendChild(link);
      line.appendChild(remove);
      host.appendChild(line);
    }

    const uploading = this.uploadingOrderIds.has(String(order.id));
    const upload = document.createElement('a');
    upload.className = 'excel-file-upload';
    upload.href = '#';
    upload.innerHTML = uploading
      ? '<i class="fas fa-spinner fa-spin"></i> جاري الرفع...'
      : `<i class="fas fa-upload"></i> ${files.length ? 'رفع ملف آخر' : 'رفع ملف'}`;
    upload.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.uploadingOrderIds.has(String(order.id))) this.pickOrderFile(params);
    });
    host.appendChild(upload);

    return host;
  }

  private pickOrderFile(params: any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = this.excelAccept;
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) this.uploadOrderFile(params, file);
    });
    input.click();
  }

  private uploadOrderFile(params: any, file: File) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!this.excelAccept.split(',').includes(`.${ext}`)) {
      this._constantsService.errorMessage('الملف يجب أن يكون إكسل (xlsx, xls, xlsm) أو csv');
      return;
    }
    if (file.size > this.maxExcelSizeMb * 1024 * 1024) {
      this._constantsService.errorMessage(`حجم الملف أكبر من ${this.maxExcelSizeMb} ميغا`);
      return;
    }

    const order = params.data;
    this.uploadingOrderIds.add(String(order.id));
    this.refreshFilesCell(params);

    this._dyedFabricOrderRequisitionWeService.uploadOrderFile(order.id, file)
      .pipe(finalize(() => {
        this.uploadingOrderIds.delete(String(order.id));
        this.refreshFilesCell(params);
      }))
      .subscribe({
        next: (response: any) => {
          if (response?.file) {
            order.excelFiles = [response.file, ...(order.excelFiles || [])];
            this._constantsService.successMessage('تم رفع الملف');
          } else {
            this._constantsService.userErrorMessage();
          }
        },
        error: (error: any) => {
          const msg = error?.error?.msg;
          this._constantsService.errorMessage(
            msg === 'invalid file type' ? 'نوع الملف غير مسموح' :
            msg === 'file too large' ? `حجم الملف أكبر من ${this.maxExcelSizeMb} ميغا` :
            'تعذّر رفع الملف'
          );
        }
      });
  }

  downloadOrderFile(file: any) {
    this._dyedFabricOrderRequisitionWeService.downloadOrderFile(file.id).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.original_name || 'order.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => this._constantsService.errorMessage('الملف غير موجود'),
    });
  }

  private confirmDeleteOrderFile(event: Event, params: any, file: any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: `حذف الملف «${file.original_name}»؟`,
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._dyedFabricOrderRequisitionWeService.deleteOrderFile(file.id).subscribe({
          next: () => {
            params.data.excelFiles = (params.data.excelFiles || []).filter((f: any) => f.id !== file.id);
            this.refreshFilesCell(params);
            this._constantsService.successDeleteMessage();
          },
          error: () => this._constantsService.userErrorMessage(),
        });
      },
    });
  }

  private refreshFilesCell(params: any) {
    if (!this.gridApi || !params.node) return;
    this.gridApi.refreshCells({ rowNodes: [params.node], columns: ['excel_files'], force: true });
    this.gridApi.resetRowHeights();
  }

  inquireReport() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length < 1) return;

    const dyeingOrderRequisitionIds = selectedRows.map((row: any) => row.id);
    localStorage.setItem('dyeingOrderRequisitionIds', JSON.stringify(dyeingOrderRequisitionIds));
    this._sharedComponentService.openPageNewTabWithoutParams(
      this._constantsService.ROUTING_MAIN_LINKS[0] + this._constantsService.ROUTING_LINKS[159]
    );
  }
}
