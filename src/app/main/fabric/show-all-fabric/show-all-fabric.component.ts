import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { Router } from '@angular/router';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { ExportDataService } from "src/app/services/export-data.service";

@Component({
  selector: 'app-show-all-fabric',
  templateUrl: './show-all-fabric.component.html',
  styleUrls: ['./show-all-fabric.component.css']
})
export class ShowAllFabricComponent implements OnInit {


 /////////////////// Variables ///////////////////
 fabrics: any[] = []
 yarns: any[] = []
 selectedData:any = []
 selectedDataToUpdate: any
 selectArrayValues: any[] = [];
 isDyedFabric = false

//////////////////////////////////// PrimeNG /////////////////////////////////
@ViewChild('dt1') dt1: Table | undefined;
loading: boolean = true;
selectedFabricNames: any[] = []
selectedFabricCodes: any[] = []
selectedRowFabric: any[] = []
selectedYarnNames: any[] = []
selectedYarnCodes: any[] = []

 constructor(
   public _sharedComponentService: SharedComponentService,
   private _constantsService: ConstantsService,
   public _exportDataService: ExportDataService,
   private _fabricService: FabricService,
   private router: Router,
   private primengConfig: PrimeNGConfig,
   private filterService: FilterService,

 ) {
   this._sharedComponentService.angularMaterialTableConfig()

   if(this.router.url === '/dashboard/show-all-dyed-fabric') {
    this.isDyedFabric = true
    this.getData("dyed")
    this.customFilterForRowFabric();
  }
  else {
    this.getData()
    this.customFilterForYarnNames();
    this.customFilterForYarnCodes();
  }
 }

 ngOnInit(): void {
  this.customFilterForFabricNames();
  this.customFilterForFabricCodes();

 }

 getData(isDyed?:string) {
  this.loading = true;

   this._fabricService.selectAll(isDyed).subscribe((response: any) => {
     this.fabrics = response
     if(!this.isDyedFabric) {
      this.getYarns(this.fabrics)
     }
     
     // PrimeNG Table
    this.primengConfig.ripple = true;
    this.loading = false;
   })
 }

 getYarns(data) {
  let filter = [{}]
    for (let i = 0; i < data.length; i++) {
      const fabric = data[i];
      for (let j = 0; j < fabric.yarns.length; j++) {
        let yarn = fabric.yarns[j];          
        if (filter.indexOf(yarn['yarn_name']) < 0) {
          filter.push(yarn['yarn_name'])
          this.yarns.push(yarn)
        }
      }
    }
}

///////////////////// ----------- Start Search Tabel ----------- /////////////////////
customFilterForFabricNames() {
  const customFilterName = "fabric-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFabricNames

    if (this.selectedFabricNames[0] != null) {
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
          if (value == filter[j].name) {
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

customFilterForFabricCodes() {
  const customFilterName = "fabric-code-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedFabricCodes

    if (this.selectedFabricCodes[0] != null) {
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
customFilterForRowFabric() {
  const customFilterName = "row-fabric-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedRowFabric

    if (this.selectedRowFabric[0] != null) {
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
          if (value == filter[j].fabric_name_code) {
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

customFilterForYarnNames() {
  const customFilterName = "yarn-name-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedYarnNames

    if (this.selectedYarnNames[0] != null) {
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
            if (value[i].yarn_name == filter[j].yarn_name) {
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

customFilterForYarnCodes() {
  const customFilterName = "yarn-code-filter";
  this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
    filter = this.selectedYarnCodes

    if (this.selectedYarnCodes[0] != null) {
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
            if (value[i].yarn_code == filter[j].yarn_code) {
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

// Reset table filters
clear(table: Table) {
  table.clear();
  table.reset();
  this.selectedFabricNames = []
  this.selectedFabricCodes = []
  this.selectedRowFabric = []
  this.selectedYarnNames = []
  this.selectedYarnCodes = []
}

onMultiselectedFabricNames(event) {
  this.selectedFabricNames = event
  this.dt1?._filter()
}

onMultiselectedFabricCodes(event) {
  this.selectedFabricCodes = event
  this.dt1?._filter()
}

onMultiselectedRowFabric(event) {
  this.selectedRowFabric = event
  this.dt1?._filter()
}

onMultiselectedYarnNames(event) {
  this.selectedYarnNames = event
  this.dt1?._filter()
}

onMultiselectedYarnCodes(event) {
  this.selectedYarnCodes = event
  this.dt1?._filter()
}

 getSelectedData(selectedData: any) {
   this.selectedDataToUpdate = selectedData
 }
 ///////////////////// ----------- End Search Tabel ----------- /////////////////////

 delete(isDyed?:string) {
   this._fabricService.delete(this.selectedData, isDyed).subscribe(response => {
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
