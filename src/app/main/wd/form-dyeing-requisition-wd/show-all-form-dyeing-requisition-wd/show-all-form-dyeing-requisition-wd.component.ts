import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { FormDyeingRequisitionWdService } from "src/app/services/main/wd/form-dyeing-requisition-wd.service";

@Component({
  selector: 'app-show-all-form-dyeing-requisition-wd',
  templateUrl: './show-all-form-dyeing-requisition-wd.component.html',
  styleUrls: ['./show-all-form-dyeing-requisition-wd.component.css']
})
export class ShowAllFormDyeingRequisitionWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  formDetails: any[] = []

//////////////////////////////////// PrimeNG /////////////////////////////////
@ViewChild('dt1') dt1: Table | undefined;
loading: boolean = true;
selectedDyeingName: any[] = []
selectedWorkOrderNumber: any[] = []
selectedWorkOrderNumberDetails: any[] = []
selectedFabricName: any[] = []
selectedSellerName: any[] = []
selectedQuantity: any[] = []
selectedFormCurrentQuantity: any[] = []
selectedOrderNumber: any[] = []
startDate: any
endDate: any
dateFilters: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _formDyeingRequisitionWdService: FormDyeingRequisitionWdService,
    private _constantsService: ConstantsService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {

  }
  ngOnInit(): void {
    this.getData();
    this.customFilterForDyeingName();
    this.customFilterForWorkOrderNumber();
    this.customFilterForWorkOrderNumberDetails();
    this.customFilterForSellerName();
    this.customFilterForQuantity();
    this.customFilterForFormCurrentQuantity();
    this.customFilterForOrderNumber();
    this.customFilterForWorkOrderNumberDetails();
    this.customFilterForFabricName();
  }

  getData() {
    this.loading = true;

    this._formDyeingRequisitionWdService.selectAll().subscribe((response: any) => {
      this.fabrics = response

      this.getFormDetails(this.fabrics)

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  
 getFormDetails(data) {
  let filter = [{}]
    for (let i = 0; i < data.length; i++) {
      const fabric = data[i];
      for (let j = 0; j < fabric.details.length; j++) {
        let element = fabric.details[j];          
        if (filter.indexOf(element['work_order_number_details']) < 0) {
          filter.push(element['work_order_number_details'])
          this.formDetails.push(element)
        }
      }
    }
}

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForDyeingName() {
  const customFilterName = "dyeing-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDyeingName

    if (this.selectedDyeingName[0] != null) {
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
          if (value == filter[j].dyeing_name) {
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
customFilterForWorkOrderNumber() {
  const customFilterName = "work-order-number-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedWorkOrderNumber

    if (this.selectedWorkOrderNumber[0] != null) {
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

customFilterForWorkOrderNumberDetails() {
  const customFilterName = "work-order-number-details-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedWorkOrderNumberDetails

    if (this.selectedWorkOrderNumberDetails[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        let count = 0
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value[i].work_order_number_details == filter[j].work_order_number_details) {
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

customFilterForFabricName() {
  const customFilterName = "fabric-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFabricName

    if (this.selectedFabricName[0] != null) {
      if (filter === undefined || filter === null || !filter.length) {
        return true;
      }
      if (value === undefined || value === null || value.length == 0) {
        return false;
      }
      if (filter.length > 0) {
        let count = 0
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value[i].dyed_fabric_name == filter[j].dyed_fabric_name) {
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

///////////////////// ----------- Start Search Tabel ----------- /////////////////////
customFilterForSellerName() {
  const customFilterName = "seller-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedSellerName

    if (this.selectedSellerName[0] != null) {
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
          if (value == filter[j].seller_name) {
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
customFilterForQuantity() {
  const customFilterName = "quantity-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedQuantity

    if (this.selectedQuantity[0] != null) {
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
          if (value == filter[j].quantity) {
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
customFilterForFormCurrentQuantity() {
  const customFilterName = "form-current-quantity-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFormCurrentQuantity

    if (this.selectedFormCurrentQuantity[0] != null) {
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
          if (value == filter[j].form_current_quantity) {
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

customFilterForOrderNumber() {
  const customFilterName = "order-number-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedOrderNumber

    if (this.selectedOrderNumber[0] != null) {
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
          if (value == filter[j].wc_fabric_order_requisition_name) {
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
        if(filter[0] != null && filter[1] != null) {
          
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

// Reset table filters
clear(table: Table) {
  table.clear();
  table.reset();
  this.selectedDyeingName = []
  this.selectedWorkOrderNumber = []
  this.selectedWorkOrderNumberDetails = []
  this.selectedFabricName = []
  this.selectedSellerName = []
  this.selectedQuantity = []
  this.selectedFormCurrentQuantity = []
  this.selectedOrderNumber = []
  this.dateFilters = []
}

onMultiselectedDyeingName(event) {
  this.selectedDyeingName = event
  this.dt1?._filter()
}

onMultiselectedWorkOrderNumber(event) {
  this.selectedWorkOrderNumber = event
  this.dt1?._filter()
}

onMultiselectedWorkOrderNumberDetails(event) {
  this.selectedWorkOrderNumberDetails = event
  this.dt1?._filter()
}

onMultiselectedFabricName(event) {
  this.selectedFabricName = event
  this.dt1?._filter()
}

onMultiselectedSellerName(event) {
  this.selectedSellerName = event
  this.dt1?._filter()
}

onMultiselectedQuantity(event) {
  this.selectedQuantity = event
  this.dt1?._filter()
}

onMultiselectedFormCurrentQuantity(event) {
  this.selectedFormCurrentQuantity = event
  this.dt1?._filter()
}

onMultiselectedOrderNumber(event) {
  this.selectedOrderNumber = event
  this.dt1?._filter()
}

}
