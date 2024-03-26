import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';
import * as moment from 'moment';


// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Call Service
import { AddRequisitionService } from "src/app/services/main/wa/add-requisition-wa.service";

@Component({
  selector: 'app-show-all-add-requisition-wa',
  templateUrl: './show-all-add-requisition-wa.component.html',
  styleUrls: ['./show-all-add-requisition-wa.component.css']
})
export class ShowAllAddRequisitionWaComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []

   //////////////////////////////////// PrimeNG /////////////////////////////////
   @ViewChild('dt1') dt1: Table | undefined;
   loading: boolean = true;
   selectedSupplierName: any[] = []
   startDate: any
   endDate: any
   dateFilters: any


  constructor(
    public _sharedComponentService: SharedComponentService,
    private _addRequisitionService: AddRequisitionService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    public _constantsService: ConstantsService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForSupplierName();

  }

  getData() {
    this.loading = true;

    this._addRequisitionService.selectAll().subscribe((response: any) => {
      this.yarns = response
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;

    })
  }

  
  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForSupplierName() {
    const customFilterName = "supplier-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSupplierName

      if (this.selectedSupplierName[0] != null) {
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
    this.selectedSupplierName = []
    this.dateFilters = []
  }

  onMultiselectedSupplierName(event) {
    this.selectedSupplierName = event
    this.dt1?._filter()
  }



}
