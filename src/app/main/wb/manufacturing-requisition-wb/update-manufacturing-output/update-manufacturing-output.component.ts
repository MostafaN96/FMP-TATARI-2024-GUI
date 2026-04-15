import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { WbManufacturingOutputService } from "src/app/services/main/wb/wb-manufacturing-output.service";
import { ActivatedRoute } from '@angular/router';
import { CircularKnittingMachineBussinessmanService } from "src/app/services/main/circular-knitting-machine-bussinessman.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-update-manufacturing-output',
  templateUrl: './update-manufacturing-output.component.html',
  styleUrls: ['./update-manufacturing-output.component.css']
})
export class UpdateManufacturingOutputComponent implements OnInit {

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- circular_knitting_machine --------------
  // maps the appropriate column to fields property
  public fieldsCircularKnittingMachine: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textCircularKnittingMachine: string = "الماكينة"

  public onFilteringCircularKnittingMachine(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.circularKnittingMachines, query);
  }

  requisitionId!: string;
  circularKnittingMachines: any = []

  @Input() selectedData: any
  @Output() updated = new EventEmitter<any>();

  outputManufacturedWbForm:FormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    manufacturingFee: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    manufacturingFeeDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    circularKnittingMachineName: new FormControl(""),
    circularKnittingMachineId: new FormControl(""),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wbManufacturingOutputService: WbManufacturingOutputService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private _circularKnittingMachineBussinessmanService: CircularKnittingMachineBussinessmanService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']        
      })
  }

  ngOnChanges() {
    this.outputManufacturedWbForm.controls['price'].setValue(String(this.selectedData?.price))
    this.outputManufacturedWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.outputManufacturedWbForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.outputManufacturedWbForm.controls['manufacturingFee'].setValue(this.selectedData?.manufacturing_fee)
    this.outputManufacturedWbForm.controls['manufacturingFeeDollar'].setValue(this.selectedData?.manufacturing_fee_dollar)
    this.outputManufacturedWbForm.controls['document'].setValue(this.selectedData?.document)
    this.outputManufacturedWbForm.controls['storagePlace'].setValue(this.selectedData?.storage_place)
    this.outputManufacturedWbForm.controls['statement'].setValue(this.selectedData?.statement)

    this._circularKnittingMachineBussinessmanService.selectByManufacture(this.selectedData?.manufacture_id).subscribe((response: any) => {
      this.circularKnittingMachines = response

      this.outputManufacturedWbForm.controls['circularKnittingMachineName'].setValue(this.selectedData?.circular_knitting_machine_name)
      this.outputManufacturedWbForm.controls['circularKnittingMachineId'].setValue(this.selectedData?.circular_knitting_machine_bussiness_man_id)
    })
  }

  calcManufacturingFee(type) {
    if(type == "manufacturingFeeEG") {
      this.outputManufacturedWbForm.controls['manufacturingFeeDollar'].setValue((this._sharedComponentService.calcEgpToDollar(this.outputManufacturedWbForm.controls['manufacturingFee'].value)).toFixed(3))
    } else if (type == "manufacturingFeeDollar") {
      this.outputManufacturedWbForm.controls['manufacturingFee'].setValue((this._sharedComponentService.calcDollarToEgp(this.outputManufacturedWbForm.controls['manufacturingFeeDollar'].value)).toFixed(3))
    }
  }

  //  CircularKnittingMachine
  selectCircularKnittingMachine(event: { itemData: any; }) {
    let indexData = this.circularKnittingMachines.indexOf(event.itemData)
    if (this.circularKnittingMachines[indexData] !== event.itemData) {
      this.outputManufacturedWbForm.controls['circularKnittingMachineName'].setValue("")
      this.outputManufacturedWbForm.controls['circularKnittingMachineId'].setValue("")
    } else {
      this.outputManufacturedWbForm.controls['circularKnittingMachineId'].setValue(event.itemData.id)
    }
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._wbManufacturingOutputService.update(this.outputManufacturedWbForm.value, this.selectedData.id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        const updatedRow = {
          ...this.selectedData,
          price: this.outputManufacturedWbForm.controls['price'].value,
          quantity: this.outputManufacturedWbForm.controls['quantity'].value,
          fabric_piece: this.outputManufacturedWbForm.controls['numberFabricPieces'].value,
          manufacturing_fee: this.outputManufacturedWbForm.controls['manufacturingFee'].value,
          manufacturing_fee_dollar: this.outputManufacturedWbForm.controls['manufacturingFeeDollar'].value,
          circular_knitting_machine_name: this.outputManufacturedWbForm.controls['circularKnittingMachineName'].value,
          circular_knitting_machine_bussiness_man_id: this.outputManufacturedWbForm.controls['circularKnittingMachineId'].value,
          document: this.outputManufacturedWbForm.controls['document'].value,
          storage_place: this.outputManufacturedWbForm.controls['storagePlace'].value,
          statement: this.outputManufacturedWbForm.controls['statement'].value,
        };

        Object.assign(this.selectedData, updatedRow);
        this.updated.emit(updatedRow);
        this._constantsService.successUpdateMessage()
      }
      else {
        if (response.msg == "quantity is wrong") {
          this._constantsService.transportWaWbQuantityErrorMessage(response.spentQuantity, response.newQuantity)
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    })
  }
}
