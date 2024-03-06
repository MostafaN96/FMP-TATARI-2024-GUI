import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";

@Component({
  selector: 'app-fabric-orders-report-wd',
  templateUrl: './fabric-orders-report-wd.component.html',
  styleUrls: ['./fabric-orders-report-wd.component.css']
})
export class FabricOrdersReportWdComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabricOrder: any[] = []
  
  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []
  selectedDyeingCodes: any[] = []
  startDate:any
  endDate:any

  constructor(
    public _sharedComponentService: SharedComponentService,
    // private _yarnService: YarnService,
    private _reportWdService: ReportWdService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    
  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCode();
    this.customFilterForDyeingCode();
  }

  getData() {
    this.loading = true;

    this._reportWdService.dyeingOrdersReport().subscribe((response: any) => {
      this.fabricOrder = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////

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
              if (value == filter[j].dyed_fabric_code ) {
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
              if (value == filter[j].dyeing_code ) {
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
  
  clear(table: Table) {
    table.clear();
    table.reset();
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  onMultiselectedDyeingCodes(event) {
    this.selectedDyeingCodes = event
    this.dt1?._filter()
  }
}
