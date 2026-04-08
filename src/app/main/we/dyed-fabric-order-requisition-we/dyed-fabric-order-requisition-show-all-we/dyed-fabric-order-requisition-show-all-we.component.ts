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
