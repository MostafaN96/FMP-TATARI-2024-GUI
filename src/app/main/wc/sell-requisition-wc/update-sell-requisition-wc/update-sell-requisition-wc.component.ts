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
import { SellRequisitionDetailsWcService } from "src/app/services/main/wc/sell-requisition-details-wc.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sell-requisition-wc',
  templateUrl: './update-sell-requisition-wc.component.html',
  styleUrls: ['./update-sell-requisition-wc.component.css']
})
export class UpdateSellRequisitionWcComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  sellRequisitionWcForm: FormGroup = new FormGroup({
    wcSellRequisitionId: new FormControl(null, [Validators.required]),
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
    private _sellRequisitionDetailsWcService: SellRequisitionDetailsWcService,
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
    this.sellRequisitionWcForm.controls['wcSellRequisitionId'].setValue(this.selectedData?.requisition_id)
    this.sellRequisitionWcForm.controls['date'].setValue(this.selectedData?.date)
    this.sellRequisitionWcForm.controls['note'].setValue(this.selectedData?.note)
    this.sellRequisitionWcForm.controls['price'].setValue(this.selectedData?.price)
    this.sellRequisitionWcForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.sellRequisitionWcForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.sellRequisitionWcForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.sellRequisitionWcForm.controls['document'].setValue(this.selectedData?.document)
    this.sellRequisitionWcForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.sellRequisitionWcForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.sellRequisitionWcForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.sellRequisitionWcForm.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(this.sellRequisitionWcForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.sellRequisitionWcForm.markAllAsTouched();
    if (this.sellRequisitionWcForm.valid) {
      this._constantsService.spinner.show()
      this._sellRequisitionDetailsWcService.update(this.sellRequisitionWcForm.value, this.selectedData.id).subscribe((response: any) => {
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
