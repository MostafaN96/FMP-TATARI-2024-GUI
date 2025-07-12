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
import { AddPurchaseOrderWaService } from "src/app/services/main/wa/add-purchase-order-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transport-wa-wb-requisition-wb',
  templateUrl: './update-transport-wa-wb-requisition-wb.component.html',
  styleUrls: ['./update-transport-wa-wb-requisition-wb.component.css']
})
export class UpdateTransportWaWbRequisitionWbComponent implements OnInit {

  requisitionId!: string;
  warehouseId!: string;
  neededYarnQuantity = 0;
  exchangeRatePrice = 0

  @Input() selectedData: any
  transportWaWbRequisitionWbForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    exceededRatio: new FormControl(10, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
        private _addPurchaseOrderWaService: AddPurchaseOrderWaService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
        this.warehouseId = params['warehouseId']
      })
  }

  ngOnChanges() {
    this.exchangeRatePrice = parseFloat((this.selectedData?.price / this.selectedData?.price_dollar).toFixed(3))

    this.transportWaWbRequisitionWbForm.controls['date'].setValue(this.selectedData?.date)
    this.transportWaWbRequisitionWbForm.controls['note'].setValue(this.selectedData?.note)
    this.transportWaWbRequisitionWbForm.controls['exceededRatio'].setValue(this.selectedData?.exceeded_ratio)
    this.transportWaWbRequisitionWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity ?? ''))
    this.transportWaWbRequisitionWbForm.controls['price'].setValue(this.selectedData?.price)
    this.transportWaWbRequisitionWbForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transportWaWbRequisitionWbForm.controls['document'].setValue(this.selectedData?.document)
    this.transportWaWbRequisitionWbForm.controls['statement'].setValue(this.selectedData?.statement)

    this._addPurchaseOrderWaService.getCurrentNeededYarnQuantityOfFabricForOrder({
      ordersRequisitionsId: this.selectedData?.orders_requisitions_id, 
      yarnId: this.selectedData?.yarn_id, 
      fabricId: this.selectedData?.fabric_to_be_manufactured_id
    }).subscribe((response: any) => {
      if (Array.isArray(response)) {
        this.neededYarnQuantity = response[0].needed_quantity
      }
    })

  }

  // exceededRatio
  changeExceededRatio(event) {
    this.transportWaWbRequisitionWbForm.controls['quantity'].setValue(this._sharedComponentService.getValueWithRatio(this.transportWaWbRequisitionWbForm.controls['quantity'].value, event.target.value))
  }

  // getRatioWithValue
  getRatioWithValue(event) {
    this.transportWaWbRequisitionWbForm.controls['exceededRatio'].setValue(this._sharedComponentService.getRatioWithValue(event.target.value, this.neededYarnQuantity))
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transportWaWbRequisitionWbForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar2(this.transportWaWbRequisitionWbForm.controls['price'].value, this.exchangeRatePrice))
    } else if (type == "priceDollar") {
      this.transportWaWbRequisitionWbForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp2(this.transportWaWbRequisitionWbForm.controls['priceDollar'].value, this.exchangeRatePrice))
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
