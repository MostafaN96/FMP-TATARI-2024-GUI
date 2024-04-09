import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { CircularKnittingMachineService } from "src/app/services/main/circular-knitting-machine.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { FabricService } from "src/app/services/main/fabric.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-circular-knitting-machine',
  templateUrl: './add-circular-knitting-machine.component.html',
  styleUrls: ['./add-circular-knitting-machine.component.css']
})
export class AddCircularKnittingMachineComponent implements OnInit {

  manufactures: any[] = [];
  fabrics: any[] = [];
  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Industry --------------
  // maps the appropriate column to fields property
  public fieldsManufactures: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textManufactures: string = "المصنع"

  public onFilteringManufactures (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.manufactures, query);
  }

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم المادة"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // Form Group
  circularKnittingMachineForm: FormGroup = new FormGroup({
    // fabricId: new FormControl("", [Validators.required]),
    manufactureId: new FormControl("", [Validators.required]),
    // fabricCode: new FormControl(""),
    type: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    number: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    diameter: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    smoothness: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    model: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required])
  })

  constructor(
    private _circularKnittingMachineService: CircularKnittingMachineService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _bussinessmanService: BussinessmanService,
    private _fabricService: FabricService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this._bussinessmanService.selectManufacturer().subscribe((response: any) => {
      this.manufactures = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })
  }

  //  Manufacture
  selectManufacture(event: { itemData: any; }) {
    if (!this.manufactures.includes(event.itemData)) {
      this.circularKnittingMachineForm.controls['manufactureId'].setValue(null)
    } 
  }

  //  Fabric
  // selectFabric(index: { itemData: any; }) {
  //   let indexData = this.fabrics.indexOf(index.itemData)
  //   if (this.fabrics[indexData] !== index.itemData) {
  //     this.circularKnittingMachineForm.controls['fabricId'].setValue("")
  //     this.circularKnittingMachineForm.controls['fabricCode'].setValue("")
  //   }
  //   else {
  //     this.circularKnittingMachineForm.controls['fabricCode'].setValue(index.itemData.code)
  //   }
  // }

  onAddColor() {
    if (this.circularKnittingMachineForm.valid) {
    this._constantsService.spinner.show()
      this._circularKnittingMachineService.add(this.circularKnittingMachineForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
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
      });
    }
  }

}
