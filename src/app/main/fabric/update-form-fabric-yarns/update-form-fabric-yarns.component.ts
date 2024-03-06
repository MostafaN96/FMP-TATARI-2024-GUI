import { Component, Input, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

// Shared Service
import { YarnService } from "src/app/services/main/yarn.service";
import { FabricYarnsService } from "src/app/services/main/fabric-yarns.service";
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-form-fabric-yarns',
  templateUrl: './update-form-fabric-yarns.component.html',
  styleUrls: ['./update-form-fabric-yarns.component.css']
})
export class UpdateFormFabricYarnsComponent implements OnInit {

  yarns: any = []
  showAddDetails = false
  fabricYarns: any = []
  fabricId = ""
  // Form Group
  fabricForm: FormGroup = new FormGroup({
    items: new FormArray([
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'index', 'name', 'code', 'dyeing_code',
    'fabric_quantity_m2', 'waste_ratio', 'update'];
  selection = new SelectionModel(true);
  filter = "";
  selectedData: any = []
  selectArrayValues: any[] = [];

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "نوع الخيط"

  public onFilteringYarnName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  constructor(
    private _yarnService: YarnService,
    private _fabricYarnsService: FabricYarnsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private route: ActivatedRoute,
    private _constantsService: ConstantsService,
    public _sharedComponentService: SharedComponentService,

  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {

    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response

      this.route.queryParams.subscribe(params => {
        this.fabricId = params['id']
        this._fabricYarnsService.selectByFabricId(params['id']).subscribe((response: any) => {
          this.fabricYarns = response

          for (let i = 0; i < this.fabricYarns.length; i++) {
            const element = this.fabricYarns[i];
            this.addItemAdded(element)
          }

        })

      })
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
      ratio: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      wastRatio: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    });
  }

  addItem() {
    const control = <FormArray>this.fabricForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.fabricForm.get('items');
    control.removeAt(index);
  }

  addItemAdded(data: any) {
    const control = <FormArray>this.fabricForm.get('items');
    control.push(this.initItemAdded(data));
  }

  initItemAdded(data) {
    return new FormGroup({
      yarnId: new FormControl(data.yarn_id, [Validators.required]),
      yarnName: new FormControl(data.yarn_name),
      yarnCode: new FormControl(data.yarn_code),
      ratio: new FormControl(data.ratio, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      wastRatio: new FormControl(data.wast_ratio, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    });
  }

  // Start Yarn Autocomplete Section
  //  Yarn
  selectYarn(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.yarns.indexOf(index.itemData)
    if (this.yarns[indexData] !== index.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
    }
    else {
      row.controls['yarnId'].setValue(index.itemData.id)
      row.controls['yarnCode'].setValue(index.itemData.code)
    }
  }
  // End Yarn Autocomplete Section

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.fabricYarns.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.fabricYarns.forEach((row: any) => this.selection.select(row));
  }


  getSelectedIndex(objectData: any) {
    console.log(objectData);

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
    this.fabricYarns.forEach(fabricYarn => {
      this.getSelectedIndex(fabricYarn)
    })
  }


  onUpdate() {
    this.fabricForm.markAllAsTouched();
    if (this.fabricForm.valid) {
      this._constantsService.spinner.show()

      this._fabricYarnsService.update(this.fabricForm.value, this.fabricYarns[0].fabric_id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg === "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.fabricYarns[0].fabric_id);
        }
        else {
          if (response.msg === "duplicated data") {
            this._constantsService.spinner.hide();
            this._constantsService.duplicateDataErrorMessage()
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }

  delete() {
    this._fabricYarnsService.delete(this.selectedData, this.fabricYarns[0].fabric_id).subscribe(response => {
      if (response.msg === "the item is delete") {
        this._constantsService.successDeleteMessage()
        this._sharedComponentService.reloadPageWithParams(this.fabricYarns[0].fabric_id);
      }
      else {
        this._constantsService.invalidIdErrorMessage()
      }
    })
  }

  showAddDetailsFunc() {
    this.showAddDetails = true;
  }

}

