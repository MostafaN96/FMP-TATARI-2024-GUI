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
import { WbTransitionBetweenIndustriesRequisitionDetailsService } from "src/app/services/main/wb/wb-transition-between-industries-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transition-between-industries-wb',
  templateUrl: './update-transition-between-industries-wb.component.html',
  styleUrls: ['./update-transition-between-industries-wb.component.css']
})
export class UpdateTransitionBetweenIndustriesWbComponent implements OnInit {

  requisitionId!: string;
  exchangeRatePrice = 0

  @Input() selectedData: any
  transitionBetweenIndustriesRequisitionWcForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wbTransitionBetweenIndustriesRequisitionDetailsService: WbTransitionBetweenIndustriesRequisitionDetailsService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.exchangeRatePrice = parseFloat((this.selectedData?.price / this.selectedData?.price_dollar).toFixed(3))

    this.transitionBetweenIndustriesRequisitionWcForm.controls['date'].setValue(this.selectedData?.date)
    this.transitionBetweenIndustriesRequisitionWcForm.controls['note'].setValue(this.selectedData?.note)
    this.transitionBetweenIndustriesRequisitionWcForm.controls['price'].setValue(this.selectedData?.price)
    this.transitionBetweenIndustriesRequisitionWcForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transitionBetweenIndustriesRequisitionWcForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transitionBetweenIndustriesRequisitionWcForm.controls['document'].setValue(this.selectedData?.document)
    this.transitionBetweenIndustriesRequisitionWcForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transitionBetweenIndustriesRequisitionWcForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar2(this.transitionBetweenIndustriesRequisitionWcForm.controls['price'].value, this.exchangeRatePrice))
    } else if (type == "priceDollar") {
      this.transitionBetweenIndustriesRequisitionWcForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp2(this.transitionBetweenIndustriesRequisitionWcForm.controls['priceDollar'].value, this.exchangeRatePrice))
    }
  }

  onUpdate() {
    this.transitionBetweenIndustriesRequisitionWcForm.markAllAsTouched();
    if (this.transitionBetweenIndustriesRequisitionWcForm.valid) {
      this._constantsService.spinner.show()
      this._wbTransitionBetweenIndustriesRequisitionDetailsService.update(this.transitionBetweenIndustriesRequisitionWcForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg === "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.quantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }
}
