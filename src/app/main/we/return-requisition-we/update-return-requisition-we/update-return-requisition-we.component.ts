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
import { ReturnRequisitionDetailsWeService } from "src/app/services/main/we/return-requisition-details-we.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-return-requisition-we',
  templateUrl: './update-return-requisition-we.component.html',
  styleUrls: ['./update-return-requisition-we.component.css']
})
export class UpdateReturnRequisitionWeComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  returnRequisitionWeForm: FormGroup = new FormGroup({
    weReturnRequisitionId: new FormControl("", [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    isDefect: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _returnRequisitionDetailsWeService: ReturnRequisitionDetailsWeService,
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
    this.returnRequisitionWeForm.controls['weReturnRequisitionId'].setValue(this.selectedData?.requisition_id)
    this.returnRequisitionWeForm.controls['date'].setValue(this.selectedData?.date)
    this.returnRequisitionWeForm.controls['note'].setValue(this.selectedData?.note)
    this.returnRequisitionWeForm.controls['price'].setValue(this.selectedData?.price)
    this.returnRequisitionWeForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.returnRequisitionWeForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.returnRequisitionWeForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.returnRequisitionWeForm.controls['statement'].setValue(this.selectedData?.statement)
    this.returnRequisitionWeForm.controls['isDefect'].setValue(this.selectedData?.is_defect)
  }

  isChecked(control, value) {
    this.returnRequisitionWeForm.controls[control].setValue(value)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.returnRequisitionWeForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.returnRequisitionWeForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.returnRequisitionWeForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.returnRequisitionWeForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.returnRequisitionWeForm.markAllAsTouched();
    if (this.returnRequisitionWeForm.valid) {
      this._constantsService.spinner.show()
      this._returnRequisitionDetailsWeService.update(this.returnRequisitionWeForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.sellQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }
}
