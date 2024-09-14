import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";

// Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dyed-fabric-order-report',
  templateUrl: './dyed-fabric-order-report.component.html',
  styleUrls: ['./dyed-fabric-order-report.component.css']
})
export class DyedFabricOrderReportComponent implements OnInit {

  /////////////////// Variables ///////////////////
  reportByFabricWeDetails: any[] = []
  balance: number = 0
  fabricCode: string | undefined
  fabricName: string | undefined
  warehouseName: string | undefined
  iShowStatement = false
  iShowNote = false

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWorkOrdersNumbers: any[] = []
  selectedGradeItemName: any[] = []
  selectedDyeingCodes: any[] = []
  selectedColorCodes: any[] = []
  selectedColorCategories: any[] = []
  selectedColors: any[] = []
  selectedTypeOfRequisition: any[] = []
  selectedSideOf: any[] = []
  selectedDocument: any[] = []
  selectedConsigmentDyeingNumber: any[] = []
  selectedReturnType: any[] = []
  dateFilters: any

  constructor(
    private route: ActivatedRoute,
    public _sharedComponentService: SharedComponentService,
    private _reportWeService: ReportWeService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
    this.customFilterForDyeingCode()
    this.customFilterForColorCode();
    this.customFilterForColorCategory();
    this.customFilterForColorName();
    this.customFilterForWorkOrderNumber();
    this.customFilterForGradeItemName();
    this.customFilterForSideOf();
    this.customFilterForDocument();
    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentDyeingNumber();
    this.customFilterForReturnType();

  }

  getData() {
    this.loading = true;
    this.route.queryParams
      .subscribe(params => {
        this._reportWeService.dyedFabricReportByOrderBySeller(params['id'], params['sellerId']).subscribe((response: any) => {
          this.reportByFabricWeDetails = response

          // PrimeNG Table
          this.primengConfig.ripple = true;
          this.loading = false;
        })
      });

  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForDyeingCode() {
    const customFilterName = "dyeing-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingCodes

      if (this.selectedDyeingCodes[0] != null) {
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

  customFilterForColorCode() {
    const customFilterName = "color-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedColorCodes

      if (this.selectedColorCodes[0] != null) {
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

  customFilterForColorName() {
    const customFilterName = "color-name-filter";
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

  customFilterForWorkOrderNumber() {
    const customFilterName = "work-order-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWorkOrdersNumbers

      if (this.selectedWorkOrdersNumbers[0] != null) {
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

  customFilterForGradeItemName() {
    const customFilterName = "grade-item-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedGradeItemName
      
      if (this.selectedGradeItemName[0] != null) {
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
              if (value == filter[j].grade_item_name ) {
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
            if (value == filter[j].consigment_dyeing_number) {
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

  customFilterForReturnType() {
    const customFilterName = "return-type-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedReturnType

      if (this.selectedReturnType[0] != null) {
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
            if (value == filter[j].return_type_name) {
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

  customFilterForSideOf() {
    const customFilterName = "side-of-we-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSideOf

      if (this.selectedSideOf[0] != null) {
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
            if (value == filter[j].side_of) {
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

  customFilterForDocument() {
    const customFilterName = "document-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDocument

      if (this.selectedDocument[0] != null) {
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
            if (value == filter[j].document) {
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

  customFilterForTypeOfRequisition() {
    const customFilterName = "type-of-requisition-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypeOfRequisition

      if (this.selectedTypeOfRequisition[0] != null) {
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
            if (value == filter[j].type_of_requisition) {
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

  selectedDate(event) {
    this.filterService.register("date-filter", (value: any, filter: any[]): boolean => {
      filter = this.dateFilters

      if (event != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0
          if (filter[0] != null && filter[1] != null) {

            if (moment(value).format('YYYY-MM-DD') >= moment(filter[0]).format('YYYY-MM-DD') &&
              moment(value).format('YYYY-MM-DD') <= moment(filter[1]).format('YYYY-MM-DD')) {
              return true;
            }

          } else if (filter[0] != null && filter[1] == null) {

            if (moment(value).format('YYYY-MM-DD') > moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else if (moment(value).format('YYYY-MM-DD') < moment(filter[0]).format('YYYY-MM-DD')) {
              return false;
            } else {
              return true;
            }
          }

        }
        return false;
      }
      else {
        return true;
      }
    })
    this.dt1?.filter(event, "date", "date-filter")
  }

  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedTypeOfRequisition = []
    this.selectedWorkOrdersNumbers = []
    this.selectedGradeItemName = []
    this.selectedDyeingCodes = []
    this.selectedColorCategories = []
    this.selectedColors = []
    this.selectedColorCodes = []
    this.selectedDocument = []
    this.selectedConsigmentDyeingNumber = []
    this.selectedSideOf = []
    this.selectedReturnType = []
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  onMultiselectedWorkOrderNumber(event) {
    this.selectedWorkOrdersNumbers = event
    this.dt1?._filter()
  }

  onMultiselectedGradeItemName(event) {
    this.selectedGradeItemName = event
    this.dt1?._filter()
  }
  
  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }

  onMultiselectedColorCategory(event) {
    this.selectedColorCategories = event
    this.dt1?._filter()
  }

  onMultiselectedColorName(event) {
    this.selectedColors = event
    this.dt1?._filter()
  }

  onMultiselectedColorCode(event) {
    this.selectedColorCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDocument(event) {
    this.selectedDocument = event
    this.dt1?._filter()
  }

  onMultiselectedSideOf(event) {
    this.selectedSideOf = event
    this.dt1?._filter()
  }

  onMultiselectedConsigmentDyeingNumber(event) {
    this.selectedConsigmentDyeingNumber = event
    this.dt1?._filter()
  }

  onMultiselectedReturnType(event) {
    this.selectedReturnType = event
    this.dt1?._filter()
  }

  /** Gets the total quantity of all transactions. */
  getInputQuantity(index) {
    let balance = parseFloat(this.reportByFabricWeDetails[0]?.quantity)
    for (let i = 0; i < index; i++) {
      let quantity = parseFloat(this.reportByFabricWeDetails[i + 1].quantity);
      if (this.reportByFabricWeDetails[i + 1].input_output == '1') {
        balance = balance + quantity
      }
      else {
        balance = balance - quantity
      }
    }
    return balance
  }

  getInputFabricPiece(index) {
    let balanceFabricPiece = parseFloat(this.reportByFabricWeDetails[0]?.fabric_piece)
    for (let i = 0; i < index; i++) {
      let fabricPiece = parseFloat(this.reportByFabricWeDetails[i + 1].fabric_piece);
      if (this.reportByFabricWeDetails[i + 1].input_output == '1') {
        balanceFabricPiece = balanceFabricPiece + fabricPiece
      }
      else {
        balanceFabricPiece = balanceFabricPiece - fabricPiece
      }
    }
    return balanceFabricPiece
  }

  getTotalBalanceFabricPiece() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWeDetails : this.dt1?.filteredValue
    return this._sharedComponentService.getTotalQuantityWithCondition(data,
      "fabric_piece", "input_output", "1") - this._sharedComponentService.getTotalQuantityWithCondition(data,
        "fabric_piece", "input_output", "0")
  }

  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  getTotalInputQuantity() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWeDetails : this.dt1?.filteredValue
    return data?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  getTotalOutputQuantity() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWeDetails : this.dt1?.filteredValue
    return data?.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getTotalBalance() {
    return this.getTotalInputQuantity() - this.getTotalOutputQuantity()
  }

  getInputAmount(quantity: string, price: string) {
    return parseFloat(quantity) * parseFloat(price)
  }

  getOutputAmount(quantity: string, price: string) {
    return parseFloat(quantity) * parseFloat(price)
  }

  getTotalInputAmount() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWeDetails : this.dt1?.filteredValue
    return data?.map(function (a) { return (a.input_output == '1') ? ((parseFloat(a['quantity']) * parseFloat(a['price']))) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  getTotalOutputAmount() {
    let data = this.dt1?.filteredValue == null ? this.reportByFabricWeDetails : this.dt1?.filteredValue
    return data?.map(function (a) { return (a.input_output == '0') ? ((parseFloat(a['quantity']) * parseFloat(a['price']))) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount() {
    return this.getTotalInputAmount() - this.getTotalOutputAmount()
  }

  getAvgPrice() {
    return this.getItemAmount() / this.notZero(this.getInputQuantity(this.reportByFabricWeDetails.length - 1))
  }

  getTotalAmountQuantityInput(fabrics) {
    return fabrics.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount2(fabrics) {
    return fabrics.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice() {
    return this.getInputAmount2(this.reportByFabricWeDetails) / this.notZero(this.getTotalAmountQuantityInput(this.reportByFabricWeDetails))
  }

  goToRequisitionPage(typeOfRequisition) {
    if (typeOfRequisition == 'اذن اضافة') {
      return `/dashboard/show-all-add-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن بيع') {
      return `/dashboard/show-all-sell-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن تسوية') {
      return `/dashboard/show-all-reconciliation-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن مرتجع') {
      return `/dashboard/show-all-return-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن صباغة') {
      return `/dashboard/show-all-dyeing-requisition-wd/details`
    }
    else if (typeOfRequisition == 'اذن مرتجع صرف') {
      return `/dashboard/show-all-return-sell-requisition-we/details`
    }
    else if (typeOfRequisition == 'اذن نقل بين المخازن') {
      return `/dashboard/show-all-transition-between-wh-requisition-we/details`
    }
    return
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
