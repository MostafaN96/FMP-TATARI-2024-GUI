import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../../services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";
import { ConstantsService } from "../../../../services/constants.service";
import { SessionManagerService } from "../../../../services/main/session-manager.service";

// Call Service
import { ReturnRequisitionDetailsWcService } from "../../../../services/main/wc/return-requisition-details-wc.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-return-requisition-wc',
  templateUrl: './update-return-requisition-wc.component.html',
  styleUrls: ['./update-return-requisition-wc.component.css']
})
export class UpdateReturnRequisitionWcComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  returnRequisitionWcForm:FormGroup = new FormGroup({
    wcReturnRequisitionId: new FormControl("", [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    numberFabricPieces: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _returnRequisitionDetailsWcService: ReturnRequisitionDetailsWcService,
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
    this.returnRequisitionWcForm.controls['wcReturnRequisitionId'].setValue(this.selectedData?.requisition_id)
    this.returnRequisitionWcForm.controls['date'].setValue(this.selectedData?.date)
    this.returnRequisitionWcForm.controls['note'].setValue(this.selectedData?.note)
    this.returnRequisitionWcForm.controls['price'].setValue(this.selectedData?.price)
    this.returnRequisitionWcForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.returnRequisitionWcForm.controls['numberFabricPieces'].setValue(String(this.selectedData?.fabric_piece))
    this.returnRequisitionWcForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.returnRequisitionWcForm.controls['document'].setValue(this.selectedData?.document)
    this.returnRequisitionWcForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.returnRequisitionWcForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.returnRequisitionWcForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.returnRequisitionWcForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.returnRequisitionWcForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.returnRequisitionWcForm.markAllAsTouched();
    if (this.returnRequisitionWcForm.valid) {
    this._constantsService.spinner.show()
    this._returnRequisitionDetailsWcService.update(this.returnRequisitionWcForm.value,this.selectedData.id, this.selectedData['supplier_id']).subscribe((response: any) =>{
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
