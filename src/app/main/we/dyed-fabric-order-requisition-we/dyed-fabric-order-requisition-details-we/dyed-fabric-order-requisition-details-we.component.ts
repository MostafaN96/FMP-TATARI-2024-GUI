import { Component, OnInit, ViewChild, } from '@angular/core';

// PrimeNG Table
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Route
import { ActivatedRoute, Router } from '@angular/router';

// Child Components
import { DyedFabricOrderRequisitionUpdateWeComponent } from "../dyed-fabric-order-requisition-update-we/dyed-fabric-order-requisition-update-we.component";

@Component({
  selector: 'app-dyed-fabric-order-requisition-details-we',
  templateUrl: './dyed-fabric-order-requisition-details-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-details-we.component.css'],
  providers: [ConfirmationService]
})
export class DyedFabricOrderRequisitionDetailsWeComponent implements OnInit {

  // Child Components
  @ViewChild('updateOrder') updateOrder: DyedFabricOrderRequisitionUpdateWeComponent | undefined;


  /////////////////// Variables ///////////////////
  dyedFabricOrderDetails: any[] = []
  totalPriceXQuantityWithWast: any
  selectedDataToUpdate: any
  showInputUpdate = false
  showAddDetails = false

  
 @ViewChild('checkbox') checkbox = {value : "من اذن"};
  showHideItems = ["من اذن"]

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedFabricNames: any[] = []
  selectedFabricCodes: any[] = []
  selectedColorCategories: any[] = []
  selectedColors: any[] = []
  dateFilters: any

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _dyedFabricOrderRequisitionDetailsWeService: DyedFabricOrderRequisitionDetailsWeService,
    public _exportDataService: ExportDataService,
    private _constantsService: ConstantsService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private router: Router,
    private confirmationService: ConfirmationService

  ) {
  }

  ngOnInit(): void {
    // this.checkbox.value = ["من اذن"]

    this.customFilterForFabricNames()
    this.customFilterForFabricCodes()
    this.customFilterForColorCategory()
    this.customFilterForColor()

    if (this.router.url.split('/')[2] + '/' + this.router.url.split('/')[3].split('?')[0]
      === this._constantsService.ROUTING_LINKS[190]) {
      this.getData("closed")
    }
    else {
      this.getData()
    }

  }

  getData(isClosed?: string) {
    this.route.queryParams
      .subscribe(params => {
        this._dyedFabricOrderRequisitionDetailsWeService.select(params['id'], isClosed).subscribe((response: any) => {
          this.dyedFabricOrderDetails = response

          // PrimeNG Table
          this.primengConfig.ripple = true;
          this.loading = false;
        })
      });

  }

  getSelectedData(selectedData: any) {
    this.showInputUpdate = true
    selectedData.yarnOrders = this.dyedFabricOrderDetails[0]['yarnOrders']
    selectedData.fabricOrders = this.dyedFabricOrderDetails[0]['fabricOrders']
    this.selectedDataToUpdate = selectedData
    console.log("this.selectedDataToUpdate ::: ", this.selectedDataToUpdate);
    
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForFabricNames() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNames

      if (this.selectedFabricNames[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
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

  customFilterForFabricCodes() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCodes

      if (this.selectedFabricCodes[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
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

  customFilterForColorCategory() {
    const customFilterName = "color-category-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCategories

      if (this.selectedColorCategories[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
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
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
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

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

    // Reset table filters
    clear(table: Table) {
      table.clear();
      table.reset();
      this.selectedFabricNames = []
      this.selectedFabricCodes = []
      this.selectedColorCategories = []
      this.selectedColors = []
      this.dateFilters = []
    }

  onMultiselectedFabricNames(event) {
    this.selectedFabricNames = event
    this.dt1?._filter()
  }

  onMultiselectedFabricCodes(event) {
    this.selectedFabricCodes = event
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

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  confirm(event: Event, element) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'تأكيد إغلاق الطلبية؟',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeOrder(element);
      },
      reject: () => {
      }
    });
  }

  closeOrder(data) {
    this.showInputUpdate = true
    this.updateOrder?.closeOrder(data);
    setTimeout(() => {
      this.showInputUpdate = false
    }, 1000);
  }

  openOrder(data) {
    this.showInputUpdate = true
    this.updateOrder?.openOrder(data);
    setTimeout(() => {
      this.showInputUpdate = false
    }, 1000);
  }

  showAddDetailsFunc() {
    this.showAddDetails = true;
  }

  
  goToRequisitionPage(typeOfRequisition = '', element?) {
    if (typeOfRequisition == 'اذن صباغة') {
      return `/dashboard/show-all-dyeing-requisition-wd/details`
    }
    return ``
  }
}
