import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Call Service
import { YarnLotService } from "src/app/services/main/yarn-lot.service";

@Component({
  selector: 'app-yarn-lot-show-all',
  templateUrl: './yarn-lot-show-all.component.html',
  styleUrls: ['./yarn-lot-show-all.component.css']
})
export class YarnLotShowAllComponent implements OnInit {

  /////////////////// Variables ///////////////////
  lot: any[] = []
  selectedData: any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

 //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedYarns: any[] = []
  selectedCodes: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _yarnLotService: YarnLotService,
    public _exportDataService: ExportDataService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.customFilterForYarns();
    this.customFilterForCodes();
    this.getData();
  }

  getData() {
        this.loading = true;

    this._yarnLotService.selectAll().subscribe((response: any) => {
      this.lot = response

      
      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;

    })
  }

 ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForYarns() {
    const customFilterName = "yarn-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarns

      if (this.selectedYarns[0] != null) {
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
            if (value == filter[j].yarn_name) {
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
  customFilterForCodes() {
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
            if (value == filter[j].code) {
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

// Reset table filters
  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedYarns = []
    this.selectedCodes = []
  }

  onMultiselectedYarns(event) {
    this.selectedYarns = event
    this.dt1?._filter()
  }

  onMultiselectedCodes(event) {
    this.selectedCodes = event
    this.dt1?._filter()
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  delete() {
    this._yarnLotService.delete(this.selectedData).subscribe(response => {
      if (response.msg === "the item is delete") {
        this._constantsService.successDeleteMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        this._constantsService.invalidIdErrorMessage()
      }
    })
  }
}
