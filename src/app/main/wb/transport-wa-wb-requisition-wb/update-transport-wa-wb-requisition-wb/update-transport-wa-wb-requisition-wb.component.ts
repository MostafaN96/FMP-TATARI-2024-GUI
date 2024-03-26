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
import { WbTransportWaWbRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wa-wb-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transport-wa-wb-requisition-wb',
  templateUrl: './update-transport-wa-wb-requisition-wb.component.html',
  styleUrls: ['./update-transport-wa-wb-requisition-wb.component.css']
})
export class UpdateTransportWaWbRequisitionWbComponent implements OnInit {

  requisitionId!: string;
  warehouseId!: string;

  @Input() selectedData: any
  transportWaWbRequisitionWbForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _wbTransportWaWbRequisitionDetailsService: WbTransportWaWbRequisitionDetailsService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
        this.warehouseId = params['warehouseId']
      })
  }

  ngOnChanges() {
    this.transportWaWbRequisitionWbForm.controls['date'].setValue(this.selectedData?.date)
    this.transportWaWbRequisitionWbForm.controls['note'].setValue(this.selectedData?.note)
    this.transportWaWbRequisitionWbForm.controls['price'].setValue(this.selectedData?.price)
    this.transportWaWbRequisitionWbForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transportWaWbRequisitionWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transportWaWbRequisitionWbForm.controls['document'].setValue(this.selectedData?.document)
    this.transportWaWbRequisitionWbForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transportWaWbRequisitionWbForm.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      this.transportWaWbRequisitionWbForm.controls['price'].setValue("0")
    }
  }

  onUpdate() {
    this.transportWaWbRequisitionWbForm.markAllAsTouched();
    if (this.transportWaWbRequisitionWbForm.valid) {
      this._constantsService.spinner.show()
      this._wbTransportWaWbRequisitionDetailsService.update(this.transportWaWbRequisitionWbForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({id: this.requisitionId, warehouseId: this.warehouseId});
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
