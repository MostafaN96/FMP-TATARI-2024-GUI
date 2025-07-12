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
import { TransitionBetweenOrdersRequisitionDetailsWeService } from "src/app/services/main/we/transition-between-orders-requisition-details-we.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-orders-requisition-update-we',
  templateUrl: './transition-between-orders-requisition-update-we.component.html',
  styleUrls: ['./transition-between-orders-requisition-update-we.component.css']
})
export class TransitionBetweenOrdersRequisitionUpdateWeComponent implements OnInit {

  requisitionId!: string;
  exchangeRatePrice = 0

  @Input() selectedData: any
  transitionBetweenOrdersRequisitionWeForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
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
    private _transitionBetweenOrdersRequisitionDetailsWeService: TransitionBetweenOrdersRequisitionDetailsWeService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.exchangeRatePrice = parseFloat((this.selectedData?.price / this.selectedData?.price_dollar).toFixed(3))

    this.transitionBetweenOrdersRequisitionWeForm.controls['date'].setValue(this.selectedData?.date)
    this.transitionBetweenOrdersRequisitionWeForm.controls['note'].setValue(this.selectedData?.note)
    this.transitionBetweenOrdersRequisitionWeForm.controls['price'].setValue(String(this.selectedData?.price))
    this.transitionBetweenOrdersRequisitionWeForm.controls['priceDollar'].setValue(String(this.selectedData?.price_dollar))
    this.transitionBetweenOrdersRequisitionWeForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transitionBetweenOrdersRequisitionWeForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.transitionBetweenOrdersRequisitionWeForm.controls['document'].setValue(this.selectedData?.document)
    this.transitionBetweenOrdersRequisitionWeForm.controls['statement'].setValue(this.selectedData?.statement)
  }


  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transitionBetweenOrdersRequisitionWeForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar2(this.transitionBetweenOrdersRequisitionWeForm.controls['price'].value, this.exchangeRatePrice))
    } else if (type == "priceDollar") {
      this.transitionBetweenOrdersRequisitionWeForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp2(this.transitionBetweenOrdersRequisitionWeForm.controls['priceDollar'].value, this.exchangeRatePrice))
    }
  }

  onUpdate() {
    this.transitionBetweenOrdersRequisitionWeForm.markAllAsTouched();
    if (this.transitionBetweenOrdersRequisitionWeForm.valid) {
      this._constantsService.spinner.show()
      this._transitionBetweenOrdersRequisitionDetailsWeService.update(this.transitionBetweenOrdersRequisitionWeForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
}
