import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Call Service
import { YarnService } from "../../../services/main/yarn.service";

@Component({
  selector: 'app-show-all-yarn',
  templateUrl: './show-all-yarn.component.html',
  styleUrls: ['./show-all-yarn.component.css']
})
export class ShowAllYarnComponent implements OnInit {

  /////////////////// Variables ///////////////////
  yarns: any[] = []
  selectedData:any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'index', 'name', 'code', 'update'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;
  filterSelectObj = [
    {
      name: 'كود المادة',
      columnProp: 'code',
      options: []
    }, {
      name: 'اسم المادة',
      columnProp: 'name',
      options: []
    }
  ]
  filterValues = {};

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _yarnService: YarnService,
    

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
      this.sortColumns.sort(({ id: 'code', start: 'asc'}) as MatSortable);
      this.dataSourceSearchTabel.sort = this.sortColumns;

      // Setup Filter
      this._sharedComponentService.setupFilter(response, this.dataSourceSearchTabel, this.filterSelectObj)
    })
  }

  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  applyFilter(filterValue: string) {
    this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
    this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  resetFilters(filterSelectObj) {
    this.filterValues = {}
    filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSourceSearchTabel.filter = "";
    this.getData();
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
    this.yarns.forEach(yarns => {
      this.getSelectedIndex(yarns)
    })
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  delete() {
    this._yarnService.delete(this.selectedData).subscribe(response => {
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
