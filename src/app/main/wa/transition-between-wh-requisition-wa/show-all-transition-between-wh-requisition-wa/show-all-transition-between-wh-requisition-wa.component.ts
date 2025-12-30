import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { TransitionBetweenWhRequisitionWaService } from "src/app/services/main/wa/transition-between-wh-requisition-wa.service";

@Component({
  selector: 'app-show-all-transition-between-wh-requisition-wa',
  templateUrl: './show-all-transition-between-wh-requisition-wa.component.html',
  styleUrls: ['./show-all-transition-between-wh-requisition-wa.component.css']
})
export class ShowAllTransitionBetweenWhRequisitionWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
yarns: any[] = []
titlePage = ""
//////////////////////////////////// PrimeNG /////////////////////////////////
@ViewChild('dt1') dt1: Table | undefined;
loading: boolean = true;
selectedRequisitionNum: any[] = []
selectedFromWarehouseName: any[] = []
selectedToWarehouseName: any[] = []
selectedRequisitionNote: any[] = []
selectedDocumentDetails: any[] = []
requisitionDetails: any[] = []
startDate: any
endDate: any
dateFilters: any

constructor(
  public _sharedComponentService: SharedComponentService,
  private _transitionBetweenWhRequisitionWaService: TransitionBetweenWhRequisitionWaService,
  private router: Router,
  private primengConfig: PrimeNGConfig,
  private filterService: FilterService,

) {
  this._sharedComponentService.angularMaterialTableConfig()
}

ngOnInit(): void {
  this.getData()

  this.customFilterForFromWarehouseName();
  this.customFilterForToWarehouseName();
  this.customFilterForRequisitionNote();
  this.customFilterForDocumentDetails();
}

getData() {
this.loading = true;
  this._transitionBetweenWhRequisitionWaService.selectAll().subscribe((response: any) => {
    this.yarns = response

          this.getRequisitionDetails(this.yarns)

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
          this.requisitionDetails.push(element)
        }
      }
    }
}

///////////////////// ----------- Start Search Tabel ----------- /////////////////////

customFilterForFromWarehouseName() {
  const customFilterName = "from-warehouse-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFromWarehouseName

    if (this.selectedFromWarehouseName[0] != null) {
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
          if (value == filter[j].warehouse_name) {
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
customFilterForToWarehouseName() {
  const customFilterName = "to-warehouse-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedToWarehouseName

    if (this.selectedToWarehouseName[0] != null) {
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
          if (value == filter[j].to_warehouse_name) {
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

customFilterForRequisitionNote() {
  const customFilterName = "requisition-note-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedRequisitionNote

    if (this.selectedRequisitionNote[0] != null) {
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
          if (value == filter[j].note) {
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
  this.selectedFromWarehouseName = []
  this.selectedToWarehouseName = []
  this.selectedRequisitionNote = []
  this.selectedDocumentDetails = []
  this.dateFilters = []
}

onMultiselectedDocumentDetails(event) {
  this.selectedDocumentDetails = event
  this.dt1?._filter()
}

onMultiselectedFromWarehouseName(event) {
  this.selectedFromWarehouseName = event
  this.dt1?._filter()
}

onMultiselectedToWarehouseName(event) {
  this.selectedToWarehouseName = event
  this.dt1?._filter()
}

onMultiselectedRequisitionNote(event) {
  this.selectedRequisitionNote = event
  this.dt1?._filter()
}
///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
