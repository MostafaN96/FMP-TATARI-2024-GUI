import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from 'src/app/services/main/session-manager.service';

// Call Service
import { WcAddRequisitionDetailsService } from "src/app/services/main/wc/wc-add-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-add-requisition-by-order-wc',
  templateUrl: './update-add-requisition-by-order-wc.component.html',
  styleUrls: ['./update-add-requisition-by-order-wc.component.css']
})
export class UpdateAddRequisitionByOrderWcComponent implements OnInit {

  requisitionId!: string;
  exchangeRatePrice = 0

  @Input() selectedData: any
  addRequisitionWcForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wcAddRequisitionDetailsService: WcAddRequisitionDetailsService,
    public _sessionManagerService: SessionManagerService,
    public _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.exchangeRatePrice = parseFloat((this.selectedData?.price / this.selectedData?.price_dollar).toFixed(3))

    this.addRequisitionWcForm.controls['date'].setValue(this.selectedData?.date)
    this.addRequisitionWcForm.controls['note'].setValue(this.selectedData?.note)
    this.addRequisitionWcForm.controls['price'].setValue(this.selectedData?.price)
    this.addRequisitionWcForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.addRequisitionWcForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.addRequisitionWcForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.addRequisitionWcForm.controls['document'].setValue(this.selectedData?.document)
    this.addRequisitionWcForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.addRequisitionWcForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar2(this.addRequisitionWcForm.controls['price'].value, this.exchangeRatePrice))
    } else if (type == "priceDollar") {
      this.addRequisitionWcForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp2(this.addRequisitionWcForm.controls['priceDollar'].value, this.exchangeRatePrice))
    }
  }

  onUpdate() {
    this.addRequisitionWcForm.markAllAsTouched();
    if (this.addRequisitionWcForm.valid) {
      this._constantsService.spinner.show()
      this._wcAddRequisitionDetailsService.update(this.addRequisitionWcForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
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
