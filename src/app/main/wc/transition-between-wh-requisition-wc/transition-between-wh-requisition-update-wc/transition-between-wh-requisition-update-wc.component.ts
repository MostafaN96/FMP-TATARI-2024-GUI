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
import { TransitionBetweenWhRequisitionDetailsWcService } from "src/app/services/main/wc/transition-between-wh-requisition-details-wc.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transition-between-wh-requisition-update-wc',
  templateUrl: './transition-between-wh-requisition-update-wc.component.html',
  styleUrls: ['./transition-between-wh-requisition-update-wc.component.css']
})
export class TransitionBetweenWhRequisitionUpdateWcComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  transitionBetweenWhRequisitionWeForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _transitionBetweenWhRequisitionDetailsWcService: TransitionBetweenWhRequisitionDetailsWcService,
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
    this.transitionBetweenWhRequisitionWeForm.controls['date'].setValue(this.selectedData?.date)
    this.transitionBetweenWhRequisitionWeForm.controls['note'].setValue(this.selectedData?.note)
    this.transitionBetweenWhRequisitionWeForm.controls['price'].setValue(String(this.selectedData?.price))
    this.transitionBetweenWhRequisitionWeForm.controls['priceDollar'].setValue(String(this.selectedData?.price_dollar))
    this.transitionBetweenWhRequisitionWeForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transitionBetweenWhRequisitionWeForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.transitionBetweenWhRequisitionWeForm.controls['document'].setValue(this.selectedData?.document)
    this.transitionBetweenWhRequisitionWeForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transitionBetweenWhRequisitionWeForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.transitionBetweenWhRequisitionWeForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.transitionBetweenWhRequisitionWeForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.transitionBetweenWhRequisitionWeForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.transitionBetweenWhRequisitionWeForm.markAllAsTouched();
    if (this.transitionBetweenWhRequisitionWeForm.valid) {
      this._constantsService.spinner.show()
      this._transitionBetweenWhRequisitionDetailsWcService.update(this.transitionBetweenWhRequisitionWeForm.value, this.selectedData.id).subscribe((response: any) => {
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

