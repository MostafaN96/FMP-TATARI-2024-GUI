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
import { SellerService } from "../../../services/main/seller.service";

// Import Components
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-restore-seller',
  templateUrl: './restore-seller.component.html',
  styleUrls: ['./restore-seller.component.css']
})
export class RestoreSellerComponent implements OnInit {


  /////////////////// Variables ///////////////////
  sellers: any[] = []
  selectedData:any = []
  selectedDataToUpdate: any
  selectArrayValues: any[] = [];

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['select', 'name', 'phone'];
  selection = new SelectionModel(true);
  filter = "";
  dataSourceSearchTabel: any;

  constructor(
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private _sellerService: SellerService,
    

  ) {
    this._sharedComponentService.angularMaterialTableConfig()
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._sellerService.selectAllDeleted().subscribe((response: any) => {
      this.sellers = response
      this.dataSourceSearchTabel = new MatTableDataSource(this.sellers);
      this.paginator!.pageIndex = Number(this._sharedComponentService.getAngularMaterialTablePageIndex())
      this.paginator!.pageSize = Number(this._sharedComponentService.getAngularMaterialTablePageSize())
      this.dataSourceSearchTabel.paginator = this.paginator;
      this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
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
    this.sellers.forEach(sellers => {
      this.getSelectedIndex(sellers)
    })
  }

  getSelectedData(selectedData: any) {
    this.selectedDataToUpdate = selectedData
  }
  ///////////////////// ----------- End Search Tabel ----------- /////////////////////

  restore() {
    this._constantsService.spinner.show()
    this._sellerService.restore(this.selectedData).subscribe(response => {
      this._constantsService.spinner.hide();
      const res = response
      if (res.state === "ok") {
        
        this._constantsService.successRestoreMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        
        this._constantsService.invalidIdErrorMessage()
      }
    })
  }
}
