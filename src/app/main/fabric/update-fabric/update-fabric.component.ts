import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { Router } from '@angular/router';
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-fabric',
  templateUrl: './update-fabric.component.html',
  styleUrls: ['./update-fabric.component.css']
})
export class UpdateFabricComponent implements OnInit {

  rowFabrics: any
  isDyedFabric = false
  @Input() selectedData: any
  fabricForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.code)]),
    dyeingCode: new FormControl('', [Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.code)]),
    fabricQuantityM2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "fabric_name_code" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش الخام"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('fabric_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.rowFabrics, query);
  }

  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _fabricService: FabricService,
    private _sessionManagerService: SessionManagerService,

    private _constantsService: ConstantsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.fabricForm.controls['name'].setValue(this.selectedData?.name)
    this.fabricForm.controls['code'].setValue(this.selectedData?.code)
    this.fabricForm.controls['dyeingCode'].setValue(this.selectedData?.dyeing_code)
    this.fabricForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
    if (this.router.url === '/dashboard/show-all-dyed-fabric') {
      this.getRowFabric();
      this.isDyedFabric = true
      this.fabricForm.addControl("wasteRatio", new FormControl("0"));
      this.fabricForm.addControl("fabricId", new FormControl("", [Validators.required]));
      this.fabricForm.controls['fabricId'].setValue(this.selectedData?.fabric_id)
      this.fabricForm.controls['wasteRatio'].setValue(this.selectedData?.waste_ratio)
    }
  }

  getRowFabric() {
    this._fabricService.selectAll().subscribe((response: any) => {
      this.rowFabrics = response
    })
  }

  //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.rowFabrics.indexOf(index.itemData)
    if (this.rowFabrics[indexData] !== index.itemData) {
      row.controls['fabricId'].setValue(null)
    }
    else {
      row.controls['fabricId'].setValue(index.itemData.id)
    }
  }

  onUpdate() {
    this.fabricForm.markAllAsTouched();
    if (this.fabricForm.valid) {
    this._constantsService.spinner.show()
    this._fabricService.update(this.fabricForm.value, this.selectedData.id, (this.isDyedFabric) ? "dyed" : "").subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        if (response.msg === "duplicated data") {
          this._constantsService.duplicateDataErrorMessage()
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    })
  }
}
}
