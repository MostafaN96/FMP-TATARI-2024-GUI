import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';// (PageEvent) get index of table page
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";

// Call Service
import { ConsigmentYarnService } from "src/app/services/main/consigment-yarn.service";

@Component({
  selector: 'app-restore-consigment-yarn',
  templateUrl: './restore-consigment-yarn.component.html',
  styleUrls: ['./restore-consigment-yarn.component.css']
})
export class RestoreConsigmentYarnComponent implements OnInit {


  /////////////////// Variables ///////////////////
  consigmentYarn: any[] = []
  selectedData:any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['select', 'number'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _consigmentYarnService: ConsigmentYarnService,
    

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._consigmentYarnService.selectAllDeleted().subscribe((response: any) => {
      this.consigmentYarn = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.consigmentYarn);
      this.paginator!.pageIndex = Number(this._sharedComponentService.getAngularMaterialTablePageIndex())
      this.paginator!.pageSize = Number(this._sharedComponentService.getAngularMaterialTablePageSize())
      this.dataSourceSearchTabel.paginator = this.paginator;
      this.sortColumns.sort(({ id: 'number', start: 'asc'}) as MatSortable);
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
    this.consigmentYarn.forEach(consigmentYarn => {
      this.getSelectedIndex(consigmentYarn)
    })
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  restore() {
    this._constantsService.spinner.show()
    this._consigmentYarnService.restore(this.selectedData).subscribe(response => {
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
