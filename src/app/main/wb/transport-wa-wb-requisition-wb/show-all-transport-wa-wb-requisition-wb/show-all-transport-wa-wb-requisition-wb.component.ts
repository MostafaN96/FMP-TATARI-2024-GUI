import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";

// Call Service
import { TransportWaWbService } from "src/app/services/main/wb/transport-wa-wb-requisition-wb.service";

@Component({
  selector: 'app-show-all-transport-wa-wb-requisition-wb',
  templateUrl: './show-all-transport-wa-wb-requisition-wb.component.html',
  styleUrls: ['./show-all-transport-wa-wb-requisition-wb.component.css']
})
export class ShowAllTransportWaWbRequisitionWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedWarehouseName: any[] = []
  selectedRequisitionNote: any[] = []
  startDate: any
  endDate: any
  dateFilters: any

  documentDetails: any[] = []
  selectedDocumnetDetails: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _transportWaWbService: TransportWaWbService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.getData();

    this.customFilterForWarehouseName();
    this.customFilterForRequisitionNote();
    this.customFilterForDocumnetDetails();
  }

  getData() {
    this._transportWaWbService.selectAll().subscribe((response: any) => {
      this.yarns = response

      this.getDocumentDetails(this.yarns)

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  getDocumentDetails(data) {
  let filter = [{}]
    for (let i = 0; i < data.length; i++) {
      const fabric = data[i];
      for (let j = 0; j < fabric.details.length; j++) {
        let element = fabric.details[j];          
        if (filter.indexOf(element['document']) < 0) {
          filter.push(element['document'])
          this.documentDetails.push(element)
        }
      }
    }
}

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  customFilterForWarehouseName() {
    const customFilterName = "warehouse-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouseName

      if (this.selectedWarehouseName[0] != null) {
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

customFilterForDocumnetDetails() {
  const customFilterName = "document-details-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedDocumnetDetails

    if (this.selectedDocumnetDetails[0] != null) {
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

  // Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedWarehouseName = []
    this.selectedRequisitionNote = []
    this.selectedDocumnetDetails = []
    this.dateFilters = []
  }

  onMultiselectedWarehouseName(event) {
    this.selectedWarehouseName = event
    this.dt1?._filter()
  }

  onMultiselectedRequisitionNote(event) {
    this.selectedRequisitionNote = event
    this.dt1?._filter()
  }

  onMultiselectedDocumentDetails(event) {
    this.selectedDocumnetDetails = event
    this.dt1?._filter()
  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

}
