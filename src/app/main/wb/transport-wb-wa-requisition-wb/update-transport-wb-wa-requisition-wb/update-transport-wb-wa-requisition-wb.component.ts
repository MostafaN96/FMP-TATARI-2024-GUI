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
import { WbTransportWbWaRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wb-wa-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transport-wb-wa-requisition-wb',
  templateUrl: './update-transport-wb-wa-requisition-wb.component.html',
  styleUrls: ['./update-transport-wb-wa-requisition-wb.component.css']
})
export class UpdateTransportWbWaRequisitionWbComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  transportWbWaRequisitionWbForm:FormGroup = new FormGroup({
    warehouseId: new FormControl("", [Validators.required]),
    industryId: new FormControl("", [Validators.required]),
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
    private _wbTransportWbWaRequisitionDetailsService: WbTransportWbWaRequisitionDetailsService,
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
    this.transportWbWaRequisitionWbForm.controls['warehouseId'].setValue(this.selectedData?.warehouse_id)
    this.transportWbWaRequisitionWbForm.controls['industryId'].setValue(this.selectedData?.industry_id)
    this.transportWbWaRequisitionWbForm.controls['date'].setValue(this.selectedData?.date)
    this.transportWbWaRequisitionWbForm.controls['note'].setValue(this.selectedData?.note)
    this.transportWbWaRequisitionWbForm.controls['price'].setValue(this.selectedData?.price)
    this.transportWbWaRequisitionWbForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transportWbWaRequisitionWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transportWbWaRequisitionWbForm.controls['document'].setValue(this.selectedData?.document)
    this.transportWbWaRequisitionWbForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transportWbWaRequisitionWbForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.transportWbWaRequisitionWbForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.transportWbWaRequisitionWbForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.transportWbWaRequisitionWbForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.transportWbWaRequisitionWbForm.markAllAsTouched();
    if (this.transportWbWaRequisitionWbForm.valid) {
      this._constantsService.spinner.show()
      this._wbTransportWbWaRequisitionDetailsService.update(this.transportWbWaRequisitionWbForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg === "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionId });
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
