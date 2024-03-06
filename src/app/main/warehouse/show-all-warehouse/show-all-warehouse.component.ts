import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Call Service
import { WarehouseService } from "../../../services/main/warehouse.service";

@Component({
  selector: 'app-show-all-warehouse',
  templateUrl: './show-all-warehouse.component.html',
  styleUrls: ['./show-all-warehouse.component.css']
})
export class ShowAllWarehouseComponent implements OnInit {

/////////////////// Variables ///////////////////
warehouses: any[] = []
selectedData:any = []
selectedDataToUpdate: any
selectArrayValues: any[] = [];

//////////////////////////////////// Tabel Angular Material /////////////////////////////////
@ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
@ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
displayedColumns: string[] = ['select', 'name', 'address', 'storekeeper_name', 'phone', 'is_stock', 'is_grade', 'update'];
selection = new SelectionModel(true);
filter = "";
dataSourceSearchTabel: any;

constructor(
  public _sharedComponentService: SharedComponentService,
  private _constantsService: ConstantsService,
  private _warehouseService: WarehouseService,
  

) {
  this._sharedComponentService.angularMaterialTableConfig()
}

ngOnInit(): void {
  this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
  this.getData();
}

getData() {
  this._warehouseService.selectAll().subscribe((response: any) => {
    this.warehouses = response
    this.dataSourceSearchTabel = new MatTableDataSource(this.warehouses);

    this.dataSourceSearchTabel.sort = this.sortColumns;
  })
}

///////////////////// ----------- Start Search Tabel ----------- /////////////////////
applyFilter(filterValue: string) {
  this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSourceSearchTabel.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSourceSearchTabel.data.forEach((row: any) => this.selection.select(row));
}


getSelectedIndex(objectData: any) {
  this.selectedData = []
  if (this.selectArrayValues.includes(objectData)) {
    let index = this.selectArrayValues.indexOf(objectData);
    this.selectArrayValues[index] = delete this.selectArrayValues[index];
  }
  else {
    this.selectArrayValues.push(objectData);
  }
  this.selectArrayValues.forEach((element) => {
    if (element !== true)
      this.selectedData.push(element)
  });

}

selectAll() {
  this.warehouses.forEach(warehouses => {
    this.getSelectedIndex(warehouses)
  })
}

getSelectedData(selectedData: any) {
  this.selectedDataToUpdate = selectedData
}
///////////////////// ----------- End Search Tabel ----------- /////////////////////

delete() {
  this._warehouseService.delete(this.selectedData).subscribe(response => {
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
