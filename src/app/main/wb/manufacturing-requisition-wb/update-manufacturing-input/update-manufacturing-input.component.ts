import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { GlobalService } from "src/app/services/exchange-rate.service";

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
  exchangeRatePrice = 0
  
  @Input() selectedData: any
  inputManufacturedWbForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
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
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
    private globalService: GlobalService,

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })

      // dollarPrice
      // this.globalService.exchangeRate.subscribe({
      //   next: newValue => {
      //     this.exchangeRatePrice = newValue.dollarPrice
      //   }
      // });
      this.exchangeRatePrice = parseFloat((this.selectedData?.price / this.selectedData?.price_dollar).toFixed(3))

    this.inputManufacturedWbForm.controls['date'].setValue(this.selectedData?.date)
    this.inputManufacturedWbForm.controls['note'].setValue(this.selectedData?.note)
    this.inputManufacturedWbForm.controls['status'].setValue(this.selectedData?.status)
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
      String(((parseFloat(this.inputManufacturedWbForm.controls['quantity'].value) / (1 - (this._sharedComponentService.notZero(parseFloat(this.inputManufacturedWbForm.controls['wastRatio'].value)) / 100 )))) )
      )
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.inputManufacturedWbForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar2(this.inputManufacturedWbForm.controls['price'].value, this.exchangeRatePrice))
    } else if (type == "priceDollar") {
      this.inputManufacturedWbForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp2(this.inputManufacturedWbForm.controls['priceDollar'].value, this.exchangeRatePrice))
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
