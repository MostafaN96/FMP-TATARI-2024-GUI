import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { TransitionBetweenOrdersRequisitionWcService } from "src/app/services/main/wc/transition-between-orders-requisition-wc.service";

@Component({
  selector: 'app-transition-between-orders-requisition-show-all-wc',
  templateUrl: './transition-between-orders-requisition-show-all-wc.component.html',
  styleUrls: ['./transition-between-orders-requisition-show-all-wc.component.css']
})
export class TransitionBetweenOrdersRequisitionShowAllWcComponent {

  /////////////////// Variables ///////////////////
    fabrics: any[] = []
    titlePage = ""
    //////////////////////////////////// PrimeNG /////////////////////////////////
    @ViewChild('dt1') dt1: Table | undefined;
    loading: boolean = true;
    selectedFromDyedFabricOrderName: any[] = []
    selectedToDyedFabricOrderName: any[] = []
    selectedDocumentDetails: any[] = []
    selectedConsigmentManufacturingNumber: any[] = []
documentDetails: any[] = []
consigmentDetails: any[] = []
    startDate: any
    endDate: any
    dateFilters: any
    
    constructor(
      public _sharedComponentService: SharedComponentService,
      private _transitionBetweenOrdersRequisitionWcService: TransitionBetweenOrdersRequisitionWcService,
      private router: Router,
      private primengConfig: PrimeNGConfig,
      private filterService: FilterService,
    
    ) {
      this._sharedComponentService.angularMaterialTableConfig()
    }
    
    ngOnInit(): void {
      this.getData()
    
      this.customFilterForFromDyedFabricOrderName();
      this.customFilterForToDyedFabricOrderName();
  this.customFilterForDocumentDetails();
      this.customFilterForConsigmentName();
    }
    
    getData() {
    this.loading = true;
      this._transitionBetweenOrdersRequisitionWcService.selectAll().subscribe((response: any) => {
        this.fabrics = response
    
                  this.getRequisitionDetails(this.fabrics)

        // PrimeNG Table
           this.primengConfig.ripple = true;
           this.loading = false;
      })
    }
    
 getRequisitionDetails(data) {
  let filter = [{}]
    for (let i = 0; i < data.length; i++) {
      const fabric = data[i];
      for (let j = 0; j < fabric.details.length; j++) {
        let element = fabric.details[j];          
        if (filter.indexOf(element['document']) < 0) {
          filter.push(element['document'])
          this.documentDetails.push(element)
        }
        if (filter.indexOf(element['consigment_manufacturing_number']) < 0) {
          filter.push(element['consigment_manufacturing_number'])
          this.consigmentDetails.push(element)
        }
      }
    }
}
    ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
    
    customFilterForFromDyedFabricOrderName() {
      const customFilterName = "from-dyed-fabric-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedFromDyedFabricOrderName
    
        if (this.selectedFromDyedFabricOrderName[0] != null) {
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
              if (value == filter[j].from_we_dyed_fabric_order_requisition_name) {
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
    customFilterForToDyedFabricOrderName() {
      const customFilterName = "to-dyed-fabric-order-name-filter";
      this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
        filter = this.selectedToDyedFabricOrderName
    
        if (this.selectedToDyedFabricOrderName[0] != null) {
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
              if (value == filter[j].to_we_dyed_fabric_order_requisition_name) {
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
    
    
customFilterForDocumentDetails() {
  const customFilterName = "document-details-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDocumentDetails

    if (this.selectedDocumentDetails[0] != null) {
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
            if (value[i].document == filter[j].document) {
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


customFilterForConsigmentName() {
  const customFilterName = "consigment-manufacturing-number-details-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedConsigmentManufacturingNumber

    if (this.selectedConsigmentManufacturingNumber[0] != null) {
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
            if (value[i].consigment_manufacturing_number == filter[j].consigment_manufacturing_number) {
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
      this.selectedFromDyedFabricOrderName = []
      this.selectedToDyedFabricOrderName = []
      this.selectedDocumentDetails = []
      this.selectedConsigmentManufacturingNumber = []
      this.dateFilters = []
    }
    
    onMultiselectedDocumentDetails(event) {
      this.selectedDocumentDetails = event
      this.dt1?._filter()
    }
    
    onMultiselectedConsigmentManufacturingNumber(event) {
      this.selectedConsigmentManufacturingNumber = event
      this.dt1?._filter()
    }
    
    onMultiselectedFromDyedFabricOrderName(event) {
      this.selectedFromDyedFabricOrderName = event
      this.dt1?._filter()
    }
    
    onMultiselectedToDyedFabricOrderName(event) {
      this.selectedToDyedFabricOrderName = event
      this.dt1?._filter()
    }
    ///////////////////// ----------- End Search Tabel ----------- /////////////////////
    
    }
    