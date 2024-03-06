import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

// Shared Service
import { YarnService } from "src/app/services/main/yarn.service";
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { SessionManagerService } from 'src/app/services/main/session-manager.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { FabricYarnsService } from 'src/app/services/main/fabric-yarns.service';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { SharedComponentService } from 'src/app/services/shared-component.service';

@Component({
  selector: 'app-add-details-form-fabric-yarns',
  templateUrl: './add-details-form-fabric-yarns.component.html',
  styleUrls: ['./add-details-form-fabric-yarns.component.css']
})
export class AddDetailsFormFabricYarnsComponent implements OnInit {

  yarns: any = []
  @Input() fabricId: any
    // Form Group
    fabricYarnsForm: FormGroup = new FormGroup({
      items: new FormArray([
        this.initItem(),
      ]),
      personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
      ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
    })

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
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,
    private _fabricYarnsService: FabricYarnsService,

  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(""),
      ratio: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      wastRatio: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    });
  }

  addItem() {
    const control = <FormArray>this.fabricYarnsForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.fabricYarnsForm.get('items');
    control.removeAt(index);
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
      row.controls['yarnCode'].setValue(index.itemData.code)
    }
  }
  // End Yarn Autocomplete Section

  async onAddDetails() {
    this.fabricYarnsForm.markAllAsTouched();
    if (this.fabricYarnsForm.valid) {
      this._constantsService.spinner.show()
      this._fabricYarnsService.add(this.fabricYarnsForm.value, this.fabricId).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithParams(this.fabricId);
        }
        else {
          this._constantsService.userErrorMessage()
        }
      });
    }
  }

}

