import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";
import { Router } from '@angular/router';

// Call Service
import { FabricService } from "../../../services/main/fabric.service";

@Component({
  selector: 'app-restore-fabric',
  templateUrl: './restore-fabric.component.html',
  styleUrls: ['./restore-fabric.component.css']
})
export class RestoreFabricComponent implements OnInit {


  /////////////////// Variables ///////////////////
  fabrics: any[] = []
  selectedData:any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'name', 'number'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _fabricService: FabricService,
    private router: Router

  ) {
    this._sharedComponentService.angularMaterialTableConfig()

    if(this.router.url === '/dashboard/add-dyed-fabric') {
      this.getData("dyed")
    }
    else {
      this.getData()
    }
  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
  }

  getData(isDyed?:string) {
    this._fabricService.selectAllDeleted(isDyed).subscribe((response: any) => {
      this.fabrics = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.fabrics);

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
    this.fabrics.forEach(fabrics => {
      this.getSelectedIndex(fabrics)
    })
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  restore(isDyed?:string) {
    this._constantsService.spinner.show()
    this._fabricService.restore(this.selectedData, isDyed).subscribe(response => {
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
