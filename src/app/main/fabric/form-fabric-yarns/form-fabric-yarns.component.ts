import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

// Shared Service
import { YarnService } from "src/app/services/main/yarn.service";
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { SharedComponentService } from 'src/app/services/shared-component.service';

@Component({
  selector: 'app-form-fabric-yarns',
  templateUrl: './form-fabric-yarns.component.html',
  styleUrls: ['./form-fabric-yarns.component.css']
})
export class FormFabricYarnsComponent implements OnInit {

  yarns: any = []
  @Input() fabricForm: any

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

  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.fabricForm.addControl("items",new FormArray([
      this.initItem(),
    ]));
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

}
