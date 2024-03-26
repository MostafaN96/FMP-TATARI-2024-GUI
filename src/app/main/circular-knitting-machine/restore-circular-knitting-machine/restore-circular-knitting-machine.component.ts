import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { CircularKnittingMachineBussinessmanService } from "src/app/services/main/circular-knitting-machine-bussinessman.service";

@Component({
  selector: 'app-restore-circular-knitting-machine',
  templateUrl: './restore-circular-knitting-machine.component.html',
  styleUrls: ['./restore-circular-knitting-machine.component.css']
})
export class RestoreCircularKnittingMachineComponent implements OnInit {

  /////////////////// Variables ///////////////////
  circularKnittingMachines: any[] = []
  selectedData:any = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedManufacturers: any[] = []
  selectedTypes: any[] = []
  selectedDiameters: any[] = []
  selectedSmoothness: any[] = []
  selectedModels: any[] = []

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _circularKnittingMachineBussinessmanService: CircularKnittingMachineBussinessmanService,
        private primengConfig: PrimeNGConfig,
    private filterService: FilterService,

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.customFilterForManufacturers();
    this.customFilterForTypes();
    this.customFilterForDiameters();
    this.customFilterForSmoothness();
    this.customFilterForModels();
    this.getData();
  }

  getData() {
    this.loading = true;

    this._circularKnittingMachineBussinessmanService.selectAllDeleted().subscribe((response: any) => {
      this.circularKnittingMachines = response

      // PrimeNG Table
      this.primengConfig.ripple = true;
      this.loading = false;
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForManufacturers() {
    const customFilterName = "manufacturer-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedManufacturers

      if (this.selectedManufacturers[0] != null) {
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
            if (value == filter[j].manufacturer_name) {
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

  customFilterForTypes() {
    const customFilterName = "type-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypes

      if (this.selectedTypes[0] != null) {
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
            if (value == filter[j].type) {
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

  customFilterForDiameters() {
    const customFilterName = "diameter-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedDiameters

      if (this.selectedDiameters[0] != null) {
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
            if (value == filter[j].diameter) {
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

  customFilterForSmoothness() {
    const customFilterName = "smoothness-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedSmoothness

      if (this.selectedTypes[0] != null) {
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
            if (value == filter[j].smoothness) {
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

  customFilterForModels() {
    const customFilterName = "model-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedModels

      if (this.selectedModels[0] != null) {
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
            if (value == filter[j].model) {
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
    this.selectedManufacturers = []
    this.selectedTypes = []
    this.selectedDiameters = []
    this.selectedSmoothness = []
    this.selectedModels = []
  }

  onMultiselectedManufacturers(event) {
    this.selectedManufacturers = event
    this.dt1?._filter()
  }

  onMultiselectedTypes(event) {
    this.selectedTypes = event
    this.dt1?._filter()
  }

  onMultiselectedDiameters(event) {
    this.selectedDiameters = event
    this.dt1?._filter()
  }

  onMultiselectedSmoothness(event) {
    this.selectedSmoothness = event
    this.dt1?._filter()
  }

  onMultiselectedModels(event) {
    this.selectedModels = event
    this.dt1?._filter()
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  restore() {
    this._constantsService.spinner.show()
    this._circularKnittingMachineBussinessmanService.restore(this.selectedData).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg === "the item is Restored") {
        this._constantsService.successRestoreMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        this._constantsService.invalidIdErrorMessage()
      }
    })
  }
}
