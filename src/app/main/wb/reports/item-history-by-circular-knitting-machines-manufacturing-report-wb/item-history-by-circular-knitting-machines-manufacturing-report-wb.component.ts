import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

@Component({
  selector: 'app-item-history-by-circular-knitting-machines-manufacturing-report-wb',
  templateUrl: './item-history-by-circular-knitting-machines-manufacturing-report-wb.component.html',
  styleUrls: ['./item-history-by-circular-knitting-machines-manufacturing-report-wb.component.css']
})
export class ItemHistoryByCircularKnittingMachinesManufacturingReportWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []
  manufacturers: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedDyeingServices: any[] = []
  selectedFabrics: any[] = []
  selectedFabricQuantityM2: any[] = []
  selectedCircularKnittingMachine: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    private _bussinessmanService: BussinessmanService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService


  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForDyeingService()
    this.customFilterForFabric()
    this.customFilterForFabricQuantityM2()
    this.customFilterForCircularKnittingMachine()
  }

  customFilterForDyeingService() {
    const customFilterName = "dyeing-service-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDyeingServices
      
      if (this.selectedDyeingServices[0] != null) {
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
              if (value == filter[j].industry_name) {
                // count++
                // if(count == filter.length) {
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

  customFilterForFabric() {
    const customFilterName = "fabric-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabrics
      
      if (this.selectedFabrics[0] != null) {
        if (filter === undefined || filter === null || filter == []) {
          return true;
        }
        if (value === undefined || value === null || value === []) {
          return false;
        }
        if (filter.length > 0) {
          let count = 0
          // for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < filter.length; j++) {
              if (value == filter[j].fabric_name) {
                // count++
                // if(count == filter.length) {
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

  customFilterForFabricQuantityM2() {
    const customFilterName = "fabric-quantity-m2-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricQuantityM2
      
      if (this.selectedFabricQuantityM2[0] != null) {
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
              if (value == filter[j].fabric_quantity_m2) {
                // count++
                // if(count == filter.length) {
                  return true;
                // }
              }
            // }
          }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }
  customFilterForCircularKnittingMachine() {
    const customFilterName = "circular-knitting-machine-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedCircularKnittingMachine
      
      if (this.selectedCircularKnittingMachine[0] != null) {
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
              if (value == filter[j].circular_knitting_machine_type) {
                // count++
                // if(count == filter.length) {
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

  getData() {
    this._reportWbService.circularKnittingMachineReport().subscribe((response: any) => {
      this.yarns = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })

    // this._bussinessmanService.selectTransportedManufacturerWd().subscribe((response: any) => {
    //   this.manufacturers = response
    // })

  }

  ///////////////////// ----------- End Search Tabel ----------- /////////////////////
  clear(table: Table) {
    table.clear();
  }

  onMultiselectDyeingService(event) {
    this.selectedDyeingServices = event
    this.dt1?._filter()
  }

  onMultiselectFabric(event) {
    this.selectedFabrics = event
    this.dt1?._filter()
  }

  onMultiselectFabricQuantityM2(event) {
    this.selectedFabricQuantityM2 = event
    this.dt1?._filter()
  }

  onMultiselectCircularKnittingMachine(event) {
    this.selectedCircularKnittingMachine = event
    this.dt1?._filter()
  }
}
