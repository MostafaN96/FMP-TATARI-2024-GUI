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

@Component({
  selector: 'app-fabric-orders-report-wb',
  templateUrl: './fabric-orders-report-wb.component.html',
  styleUrls: ['./fabric-orders-report-wb.component.css']
})
export class FabricOrdersReportWbComponent implements OnInit {

  /////////////////// Variables ///////////////////
  fabricOrder: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []
  startDate: any
  endDate: any

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
    this.customFilterForCode();
  }

  getData() {
    this.loading = true;

    this._reportWbService.manufacturingOrdersReport().subscribe((response: any) => {
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

  clear(table: Table) {
    table.clear();
    table.reset();
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

}
