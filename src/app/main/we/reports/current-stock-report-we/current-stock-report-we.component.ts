import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Angular Material Table
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";
import { HttpClient } from '@angular/common/http';

// Import Child Components
import { ImageFabricScannerDialogComponent } from "../../image-fabric-scanner-dialog/image-fabric-scanner-dialog.component";

declare let scanner;

import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  RowSelectedEvent,
  ValueFormatterParams
} from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-stock-report-we',
  templateUrl: './current-stock-report-we.component.html',
  styleUrls: ['./current-stock-report-we.component.css']
})
export class CurrentStockReportWeComponent implements OnInit {

  weId = ''

  @Output() parentFun = new EventEmitter<any>();
  @Output() selectAll = new EventEmitter<any>();
  @Output() masterToggle = new EventEmitter<any>();
  @Output() isAllSelected = new EventEmitter<any>();

  selection = new SelectionModel(true);

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyersAndRequisitionsFabrics: any
  isShowSelection = true
  isShowSoldedQuantity = false
  isShowSoldedDirectQuantity = false
  isShowPrice = true
  isShowValue = true
  isShowStoragePlace = false
  isShowUpdateStoragePlace = false
  selectedDataToUpdate: any
  showInputUpdate = false
  isShowDyeingServices = false
  isShowOrderNumber = false
  isShowOrderCustomerName = false
  isShowNotes = false

  loading: boolean = true;
  pinnedBottomRowData: any[] = [];

  gridApi: GridApi | null = null;
  rowSelection: 'single' | 'multiple' = 'multiple';
  defaultColDef: ColDef = {
    sortable: true,
    filter: 'agSetColumnFilter',
    floatingFilter: false,
    resizable: true,
    minWidth: 120,
    wrapHeaderText: true,
    autoHeaderHeight: false,
    wrapText: false,
    autoHeight: false,
    filterParams: {
      excelMode: 'windows'
    }
  };
  columnDefs: ColDef[] = [];
    gridColumnApi: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    public _exportDataService: ExportDataService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.initializeColumnDefs();
  }

  listen() {
    this.initializeColumnDefs();
    this.getData()
  }

  getData() {
    this.loading = false;

    if (this.gridApi) {
      setTimeout(() => {
        this.gridApi?.refreshHeader();
      });
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData();
  }

  onModelUpdated() {
    this.updateFooter();
  }

  private updateFooter() {
    if (!this.gridApi) return;

    let totalCurrentQuantity = 0;
    this.gridApi.forEachNodeAfterFilterAndSort((node) => {
      if (!node.data) return;
      totalCurrentQuantity += Number(node.data.current_quantity) || 0;
    });

    this.pinnedBottomRowData = [
      {
        warehouse_name: 'الإجمالي',
        current_quantity: totalCurrentQuantity
      }
    ];

    this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
  }

  onRowSelected(event: RowSelectedEvent) {
    if (!event.data) {
      return;
    }

    this.parentFun.emit(event.data);

    if (event.node.isSelected()) {
      this.selection.select(event.data);
    } else {
      this.selection.deselect(event.data);
    }
  }

  onCellClicked(event: CellClickedEvent) {
    if (!event.data) {
      return;
    }

    if (event.colDef.colId === 'showImage') {
      if (event.data?.fabric_image) {
        this.getImage(event.data.fabric_image, event.data.we_id);
      }
      return;
    }

    if (event.colDef.colId === 'scanImage') {
      this.scanImage(event.data.we_id);
      return;
    }

    if (event.colDef.colId === 'editData') {
      this.getSelectedData(event.data);
      setTimeout(() => {
        document.getElementById('update-form')?.scrollIntoView();
      });
    }
  }

  private getRequisitionLink(data: any): string | null {
    const route = this.goToRequisitionPage(data?.type_of_requisition);
    const requisitionId = data?.requisition_id;

    if (!route || !requisitionId) {
      return null;
    }

    const urlTree = this.router.createUrlTree([route], { queryParams: { id: requisitionId } });
    return this.router.serializeUrl(urlTree);
  }

  private getOrderLink(data: any): string | null {
    const orderId = data?.wd_form_dyeing_order_requisition_id;
    if (!orderId) {
      return null;
    }

    const route = this.goToRequisitionPage('اذن طلبية');
    const urlTree = this.router.createUrlTree([route], { queryParams: { id: orderId } });
    return this.router.serializeUrl(urlTree);
  }

  private formatDate(value: any): string {
    if (!value) {
      return '';
    }

    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toLocaleDateString('ar-EG', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }

  private numberFormatter(params: ValueFormatterParams): string {
    if (params.value === null || params.value === undefined || params.value === '') {
      return '';
    }

    const value = Number(params.value);
    if (isNaN(value)) {
      return params.value;
    }

    return value.toLocaleString('en-US');
  }

  private initializeColumnDefs() {
    const canShowFinancialColumns = this._sessionManagerService.checkAuth(this._constantsService.ROUTING_LINKS_DETAILS[19]);

    this.columnDefs = [
      {
        colId: 'selection',
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 70,
        minWidth: 70,
        filter: false,
        sortable: false,
        suppressMenu: true,
        hide: !this.isShowSelection,
        pinned: 'right'
      },
      { field: 'warehouse_name', headerName: 'المخزن', cellClass: 'ag-cell-wrap' },
      { field: 'dyed_fabric_name', headerName: 'اسم القماش', cellClass: 'ag-cell-wrap' },
      { field: 'dyed_fabric_code', headerName: 'كود القماش', width: 80, minWidth: 80, maxWidth: 80 },
      { field: 'supplier_name', headerName: 'المصبغة / المورد', cellClass: 'ag-cell-wrap' },
      { field: 'we_dyed_fabric_order_requisition_name', headerName: 'الطلبية', cellClass: 'ag-cell-wrap' },
      { field: 'we_order_seller_name', headerName: 'عميل الطلبية', cellClass: 'ag-cell-wrap' },
      { field: 'release_process', headerName: 'رقم ايصال الصباغة', cellClass: 'ag-cell-wrap', width: 110, minWidth: 110, maxWidth: 110 },
      { field: 'current_quantity', headerName: 'الكمية المتوفرة', width: 110, minWidth: 110, maxWidth: 110, valueFormatter: this.numberFormatter.bind(this) },
      // {
      //   field: 'direct_quantity',
      //   headerName: 'الكمية المباعة',
      //   hide: !this.isShowSoldedQuantity,
      //   valueFormatter: this.numberFormatter.bind(this)
      // },
      // {
      //   field: 'sold_direct_quantity',
      //   headerName: 'كمية التسليم',
      //   width: 80,
      //   minWidth: 80,
      //   maxWidth: 80,
      //   hide: !this.isShowSoldedDirectQuantity,
      //   valueFormatter: this.numberFormatter.bind(this)
      // },
      {
        field: 'price',
        headerName: 'السعر',
        width: 90,
        minWidth: 90,
        maxWidth: 90,
        hide: !this.isShowPrice && !canShowFinancialColumns
      },
      {
        colId: 'amount',
        headerName: 'القيمة',
        width: 90,
        minWidth: 90,
        maxWidth: 90,
        hide: !this.isShowValue && !canShowFinancialColumns,
        valueGetter: (params) => this._sharedComponentService.getCollectTimes(params.data?.current_quantity, params.data?.price),
        valueFormatter: this.numberFormatter.bind(this)
      },
      {
        field: 'dyeingServices',
        headerName: 'المعالجات',
        hide: !this.isShowDyeingServices,
        cellClass: 'ag-cell-wrap',
        valueGetter: (params) => (params.data?.dyeingServices || []).map(service => service?.name).filter(name => !!name).join('، ')
      },
      {
        field: 'date',
        headerName: 'التاريخ',
        valueFormatter: (params) => this._sharedComponentService.formatDate(params.value)
      },
      {
        colId: 'requisitionLink',
        field: 'number',
        headerName: 'رقم الاذن',
        width: 75,
        minWidth: 75,
        maxWidth: 75,
        cellClass: 'ag-link-cell',
        cellRenderer: (params) => {
          const href = this.getRequisitionLink(params.data);
          if (!href) {
            return params.value || '';
          }
          return `<a href="${href}">${params.value || ''}</a>`;
        }
      },
      { field: 'color_category_name', headerName: 'فئة اللون' },
      { field: 'color_name', headerName: 'اللون' },
      { field: 'color_code', headerName: 'كود اللون' },
      { field: 'work_order_number', width: 110, minWidth: 110, maxWidth: 110, headerName: 'امر الشغل' },
      { field: 'grade_item_name', width: 110, minWidth: 110, maxWidth: 110, headerName: 'نوع الدرجة' },
      // { field: 'dyeing_code', headerName: 'كود الصبغة' },
      { field: 'consigment_dyeing_number', width: 110, minWidth: 110, maxWidth: 110, headerName: 'رسالة المصبغة' },
      // {
      //   colId: 'orderLink',
      //   field: 'order_number',
      //   headerName: 'رقم الطلبية',
      //   width: 75,
      //   minWidth: 75,
      //   maxWidth: 75,
      //   hide: !this.isShowOrderNumber,
      //   cellClass: 'ag-link-cell',
      //   cellRenderer: (params) => {
      //     const href = this.getOrderLink(params.data);
      //     if (!href) {
      //       return params.value || '';
      //     }
      //     return `<a href="${href}">${params.value || ''}</a>`;
      //   }
      // },
      // {
      //   field: 'order_customer_name',
      //   headerName: 'العميل',
      //   cellClass: 'ag-cell-wrap',
      //   hide: !this.isShowOrderCustomerName
      // },
      
      { field: 'fabric_width', headerName: 'عرض القماش', cellClass: 'ag-cell-wrap' },
      { field: 'fabric_quantity_m2', headerName: 'وزن القماش م2', cellClass: 'ag-cell-wrap' },
      { field: 'storage_place', headerName: 'مكان التخزين', cellClass: 'ag-cell-wrap', hide: !this.isShowStoragePlace },
      { field: 'note1', headerName: 'الملاحظات 1', cellClass: 'ag-cell-wrap', hide: !this.isShowNotes },
      { field: 'note2', headerName: 'الملاحظات 2', cellClass: 'ag-cell-wrap', hide: !this.isShowNotes },
      // {
      //   colId: 'showImage',
      //   headerName: 'اظهار القماشة',
      //   filter: false,
      //   sortable: false,
      //   width: 100,
      //   minWidth: 100,
      //   suppressMenu: true,
      //   cellRenderer: (params) => params.data?.fabric_image ? '<i class="fas fa-search-plus update-symbol"></i>' : ''
      // },
      // {
      //   colId: 'scanImage',
      //   headerName: 'مسح القماشة',
      //   filter: false,
      //   sortable: false,
      //   width: 100,
      //   minWidth: 100,
      //   suppressMenu: true,
      //   cellRenderer: () => '<i class="fas fa-camera update-symbol"></i>'
      // },
      {
        colId: 'editData',
        headerName: 'تعديل البيانات',
        hide: !this.isShowUpdateStoragePlace,
        filter: false,
        sortable: false,
        width: 65,
        minWidth: 65,
        maxWidth: 65,
        suppressMenu: true,
        cellRenderer: () => '<i class="fas fa-edit update-symbol"></i>'
      }
    ];
  }

  clear() {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.deselectAll();
    this.selection.clear();
  }

  exportAgGridToExcel() {
    this.gridApi?.exportDataAsExcel({
      fileName: 'جرد_المخزن_الجاهز.xlsx'
    });
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
    this.showInputUpdate = true
  }

  ///////////////////// ----------- Scan Image ----------- /////////////////////

  scanImage(weId) {
    this.weId = weId
    scanner.scan(this.displayImagesOnPage.bind(this), {
      "twain_cap_setting": {
        "ICAP_PIXELTYPE": "TWPT_RGB",
        "ICAP_SUPPORPORTEDSIZES": "TWSS_USLESLETTER"
      },
      "output_settings": [
        {
          "type": "return-base64",
          "format": "jpg"
        }
      ]
    });
  }

  displayImagesOnPage(successful, mesg, response) {
    console.log("displayImagesOnPage");

    if (!successful) { // On error
      console.error('Failed: ' + mesg);
      return;
    }
    if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
      console.info('User cancelled');
      return;
    }
    var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    console.log(scannedImages);

    for (var i = 0;
      (scannedImages instanceof Array) && i < scannedImages.length; i++) {
      var scannedImage = scannedImages[i];
      var elementImg = scanner.createDomElementFromModel({
        'name': 'img',
        'attributes': {
          'class': 'scanned',
          'src': scannedImage.src
        }
      });
      (document.getElementById('images') ? document.getElementById('images') : document.body)?.appendChild(elementImg);
    }
    this.inputLog(scannedImages[0].src, this.weId)
  }

  // dataURItoBlob(dataURI) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(',')[1]);

  //   // separate out the mime component
  //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);

  //   // create a view into the buffer
  //   var ia = new Uint8Array(ab);

  //   // set the bytes of the buffer to the correct values
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }

  //   // write the ArrayBuffer to a blob, and you're done
  //   var blob = new Blob([ab], {type: mimeString});
  //   console.log(blob);

  //   return blob;
  // }
  inputLog(imgSrc, imgName) {
    this.http.get(imgSrc, { responseType: 'blob' }).subscribe(data => {
      data['originalname'] = imgName

      const fd = new FormData();
      fd.append('file', data, imgName);
      fd.append('id', imgName);
      this._sellRequisitionWeService.upload(fd, imgName).subscribe(res => {
      });
    })
  }

  getImage(imageSrc, weId) {
    const ImageFabricScannerDialogRef = this.dialog.open(ImageFabricScannerDialogComponent, {
      width: '500px',
      data: { imageId: weId, imageSrc: imageSrc }
    });
    this._sellRequisitionWeService.getImage(weId).subscribe((response: any) => {
    })
  }

  goToRequisitionPage(typeOfRequisition) {
    if (typeOfRequisition == 'اذن اضافة') {
      return `/dashboard/show-all-add-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن صباغة') {
      return `/dashboard/show-all-dyeing-requisition-wd/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن مرتجع صرف') {
      return `/dashboard/show-all-return-sell-requisition-we/details`
    } else if (typeOfRequisition == 'اذن طلبية') {
      return `/dashboard/show-all-dyeing-order-wd/details`
    }
    return
  }

}
