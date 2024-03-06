import { Component, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { WbService } from "src/app/services/main/wb/wb.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-manufactured-fabric-wb',
  templateUrl: './update-manufactured-fabric-wb.component.html',
  styleUrls: ['./update-manufactured-fabric-wb.component.css']
})
export class UpdateManufacturedFabricWbComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  industries: any

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  updateManufacturedFabricForm = new FormGroup({
    industryId: new FormControl(null, [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns: any
  internalSelectedDataToUpdate: any = {}
  showInputUpdate = false
  
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['code', 'name', 'yarn_lot_code', 'consigment_yarn_number', 'quantity', 'fabric_manufactured', 
  'fabric_manufactured_code', 'update'];
  dataSourceSearchTabel: any;

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Industry --------------
  // maps the appropriate column to fields property
  public fieldsIndustry: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textIndustry: string = "المصنع"


  public onFilteringIndustry(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.industries, query);
  }

  constructor(
    private _bussinessmanService: BussinessmanService,
    private _wbService: WbService,
    public _sharedComponentService: SharedComponentService,
    private _sessionManagerService: SessionManagerService,
  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'code', start: 'asc' }) as MatSortable);
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectTransportedManufacturersInWb().subscribe((response: any) => {
      this.industries = response
    })
  }

  //  Industry
  selectIndustry(event: { itemData: any; }) {
    if (this.industries.includes(event.itemData)) {
      this._wbService.selectQuantityandFabricToBeManufacturedByIndustryWb(event.itemData.id).subscribe((response: any) => {
        this.yarns = response
        this.internalSelectedDataToUpdate.industryId = event.itemData.id
        this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
        this.dataSourceSearchTabel.sort = this.sortColumns;
      })
    }
    else {
      this.yarns = []
      this.dataSourceSearchTabel = []
    }
  }

  getSelectedData(selectedData: any) {
    this.showInputUpdate = true
    this.internalSelectedDataToUpdate = {...selectedData, ...this.internalSelectedDataToUpdate}
  }
}
