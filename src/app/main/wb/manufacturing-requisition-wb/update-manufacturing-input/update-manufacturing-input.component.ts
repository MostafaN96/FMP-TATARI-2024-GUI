import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { WbManufacturingInputService } from "src/app/services/main/wb/wb-manufacturing-input.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-manufacturing-input',
  templateUrl: './update-manufacturing-input.component.html',
  styleUrls: ['./update-manufacturing-input.component.css']
})
export class UpdateManufacturingInputComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  inputManufacturedWbForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    yarnId: new FormControl("", [Validators.required]),
    yarnLotId: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantityWithWaste: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    wastRatio: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })



  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wbManufacturingInputService: WbManufacturingInputService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })

    this.inputManufacturedWbForm.controls['date'].setValue(this.selectedData?.date)
    this.inputManufacturedWbForm.controls['note'].setValue(this.selectedData?.note)
    this.inputManufacturedWbForm.controls['yarnId'].setValue(this.selectedData?.yarn_id)
    this.inputManufacturedWbForm.controls['yarnLotId'].setValue(this.selectedData?.yarn_lot_id)
    this.inputManufacturedWbForm.controls['wastRatio'].setValue(String(this.selectedData?.wast_ratio))
    this.inputManufacturedWbForm.controls['price'].setValue(String(this.selectedData?.price))
    this.inputManufacturedWbForm.controls['priceDollar'].setValue(String(this.selectedData?.price_dollar))
    this.inputManufacturedWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.inputManufacturedWbForm.controls['quantityWithWaste'].setValue(String(this.selectedData?.quantity_with_waste))
    this.inputManufacturedWbForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  getQuantity() {
    this.inputManufacturedWbForm.controls['quantityWithWaste'].setValue(
      String(((parseFloat(this.inputManufacturedWbForm.controls['quantity'].value) * parseFloat(this.inputManufacturedWbForm.controls['wastRatio'].value)) / 100) + parseFloat(this.inputManufacturedWbForm.controls['quantity'].value))
      )
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.inputManufacturedWbForm.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      this.inputManufacturedWbForm.controls['price'].setValue("0")
    }
  }

  onUpdate() {
    this.inputManufacturedWbForm.markAllAsTouched();
    if (this.inputManufacturedWbForm.valid) {
      this._constantsService.spinner.show()
      this._wbManufacturingInputService.update(this.inputManufacturedWbForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg === "data updated") {
          this._constantsService.successUpdateMessage()
          // this._sharedComponentService.reloadPageWithParams(this.requisitionId);
          setTimeout(() => {
            window.location.reload()
          }, this._constantsService.RELOAD_TIME);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }
}
