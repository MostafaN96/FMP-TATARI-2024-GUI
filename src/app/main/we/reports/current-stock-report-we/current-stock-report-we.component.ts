import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// Angular Material Table
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { HttpClient } from '@angular/common/http';

// Import Child Components
import { ImageFabricScannerDialogComponent } from "../../image-fabric-scanner-dialog/image-fabric-scanner-dialog.component";

declare let scanner;

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

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

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  selection = new SelectionModel(true);
  selectArrayValues: any[] = [];
  selectedOptions: any[] = []
  services: any[] = []
  selectedWarehouses: any[] = []
  selectedFabricNames: any[] = []
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []
  selectedDyeingSupplier: any[] = []
  selectedRequisitionNumber: any[] = []
  selectedColorCodes: any[] = []
  selectedColorCategories: any[] = []
  selectedColors: any[] = []
  selectedWorkOrdersNumbers: any[] = []
  selectedDyeingCodes2: any[] = []
  selectedOrderNumber: any[] = []
  selectedOrderCustomerName: any[] = []
  selectedStoragePlace: any[] = []
  selectedNote1: any[] = []
  selectedNote2: any[] = []
  selectedConsigmentDyeingNumber: any[] = []

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

  // PrimeNG Table
  loading: boolean = true;

  constructor(
    public _sharedComponentService: SharedComponentService,
    public _exportDataService: ExportDataService,
    private _sellRequisitionWeService: SellRequisitionWeService,
    private _dyeingServicesService: DyeingServicesService,
    private http: HttpClient,
    public dialog: MatDialog,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService
  ) {

  }

  ngOnInit(): void {
    this.customFilterForWarehouse()
    this.customFilterForDyeingService()
    this.customFilterForFabricNames()
    this.customFilterForCode()
    this.customFilterForDyeingCode()
    this.customFilterForDyeingSupplier()
    this.customFilterForRequisitionNumber()
    this.customFilterForColorCode();
    this.customFilterForColorCategory();
    this.customFilterForColor();
    this.customFilterForWorkOrderNumber();
    this.customFilterForDyeingCode2();
    this.customFilterForOrderNumber();
    this.customFilterForOrderCustomerName();
    this.customFilterForStoragePlace();
    this.customFilterForNote1();
    this.customFilterForNote2();
    this.customFilterForConsigmentDyeingNumber();

  }

  customFilterForWarehouse() {
    const customFilterName = "warehouse-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouses

      if (this.selectedWarehouses[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value == filter[j].warehouse_name ) {
                // count++
                // if (count == filter.length) {
                  return true;
                // }
              }
            }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForDyeingService() {
    const customFilterName = "custom-equals";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedOptions

      if (this.selectedOptions[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          let count = 0
          for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value[i].id == filter[j].id) {
                count++
                if (count == filter.length) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  listen() {
    this.getData()
    if (this.isShowDyeingServices) {
      let filter = [{}]
      for (let i = 0; i < this.dyersAndRequisitionsFabrics.length; i++) {
        const data = this.dyersAndRequisitionsFabrics[i];
        for (let j = 0; j < data.dyeingServices.length; j++) {
          let service = data.dyeingServices[j];
          if (filter.indexOf(service['id']) < 0) {
            filter.push(service['id'])
            this.services.push(service)
          }

        }
      }
      // this._dyeingServicesService.selectAll().subscribe((response: any) => {
      //   this.services = response        
      // })
    }
  }

  getData() {
    // PrimeNG Table
    this.primengConfig.ripple = true;
    this.loading = false;
  }

  customFilterForFabricNames() {
    const customFilterName = "fabric-names-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNames

      if (this.selectedFabricNames[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyed_fabric_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForCode() {
    const customFilterName = "code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCodes

      if (this.selectedCodes[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyed_fabric_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForDyeingCode() {
    const customFilterName = "dyeing-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes

      if (this.selectedDyeingCodes[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyed_fabric_dyeing_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForDyeingSupplier() {
    const customFilterName = "dying-supplier-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingSupplier

      if (this.selectedDyeingSupplier[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].supplier_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForRequisitionNumber() {
    const customFilterName = "requisition-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedRequisitionNumber

      if (this.selectedRequisitionNumber[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].number) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForColorCode() {
    const customFilterName = "color-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCodes

      if (this.selectedColorCodes[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForColorCategory() {
    const customFilterName = "color-category-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCategories

      if (this.selectedColorCategories[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_category_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForColor() {
    const customFilterName = "color-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColors

      if (this.selectedColors[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].color_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForWorkOrderNumber() {
    const customFilterName = "work-order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrdersNumbers

      if (this.selectedWorkOrdersNumbers[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].work_order_number) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForDyeingCode2() {
    const customFilterName = "dyeing-code2-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes2

      if (this.selectedDyeingCodes2[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].dyeing_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForOrderNumber() {
    const customFilterName = "order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedOrderNumber

      if (this.selectedOrderNumber[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].order_number) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }


  customFilterForOrderCustomerName() {
    const customFilterName = "order-customer-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedOrderCustomerName

      if (this.selectedOrderCustomerName[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].order_customer_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForStoragePlace() {
    const customFilterName = "storage-place-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedStoragePlace

      if (this.selectedStoragePlace[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].storage_place) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForNote1() {
    const customFilterName = "note1-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNote1

      if (this.selectedNote1[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].note1) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForNote2() {
    const customFilterName = "note2-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedNote2

      if (this.selectedNote2[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].note2) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForConsigmentDyeingNumber() {
    const customFilterName = "consigment-dyeing-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentDyeingNumber
      
      if (this.selectedConsigmentDyeingNumber[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value == filter[j].consigment_dyeing_number ) {
                // count++
                // if (count == filter.length) {
                  return true;
                // }
              }
            }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  onMultiselectedWarehouses(event) {
      this.selectedWarehouses = event
      this.dt1?._filter()
    }

  onMultiselectedFabricNames(event) {
    this.selectedFabricNames = event
    this.dt1?._filter()
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingSupplier(event) {
    this.selectedDyeingSupplier = event
    this.dt1?._filter()
  }

  onMultiselectedRequisitionNumber(event) {
    this.selectedRequisitionNumber = event
    this.dt1?._filter()
  }

  onMultiselectedColorCode(event) {
    this.selectedColorCodes = event
    this.dt1?._filter()
  }

  onMultiselectedColorCategory(event) {
    this.selectedColorCategories = event
    this.dt1?._filter()
  }

  onMultiselectedColor(event) {
    this.selectedColors = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrdersNumbers(event) {
    this.selectedWorkOrdersNumbers = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes2(event) {
    this.selectedDyeingCodes2 = event
    this.dt1?._filter()
  }

  onMultiselectedOrderNumber(event) {
    this.selectedOrderNumber = event
    this.dt1?._filter()
  }

  onMultiselectedOrderCustomerName(event) {
    this.selectedOrderCustomerName = event
    this.dt1?._filter()
  }

  onMultiselectedStoragePlace(event) {
    this.selectedStoragePlace = event
    this.dt1?._filter()
  }

  onMultiselectedNote1(event) {
    this.selectedNote1 = event
    this.dt1?._filter()
  }

  onMultiselectedNote2(event) {
    this.selectedNote2 = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentDyeingNumber(event) {
    this.selectedConsigmentDyeingNumber = event
    this.dt1?._filter()
  }
  
  onMultiselect(event) {
    this.selectedOptions = event
    this.dt1?._filter()
  }

  clear(table: Table) {
    console.log("table ::: ", table);
    table.clear();

    for (let index = 0; index < table.globalFilterFields.length; index++) {
      const filter = table.globalFilterFields[index];
      if (table.filters[`${filter}`] != undefined) {
        table.filters[`${filter}`]['value'] = ''
      }
    }
    this.selectedWarehouses = []
    this.selectedFabricNames = []
    this.selectedCodes = []
    this.selectedDyeingCodes = []
    this.selectedRequisitionNumber = []
    this.selectedColorCodes = []
    this.selectedColorCategories = []
    this.selectedColors = []
    this.selectedWorkOrdersNumbers = []
    this.selectedDyeingCodes2 = []
    this.selectedOrderNumber = []
    this.selectedOrderCustomerName = []
    this.selectedStoragePlace = []
    this.selectedNote1 = []
    this.selectedNote2 = []
    this.selectedConsigmentDyeingNumber = []
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
