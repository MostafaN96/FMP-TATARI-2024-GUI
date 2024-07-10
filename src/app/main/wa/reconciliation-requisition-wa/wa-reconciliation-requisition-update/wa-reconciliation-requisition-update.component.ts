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
import { ReconcilitionRequisitionDetailsWaService } from "src/app/services/main/wa/reconcilition-requisition-details-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wa-reconciliation-requisition-update',
  templateUrl: './wa-reconciliation-requisition-update.component.html',
  styleUrls: ['./wa-reconciliation-requisition-update.component.css']
})
export class WaReconciliationRequisitionUpdateComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionId: string = "";

  @Input() selectedData: any
  waCottonReconciliationRequisitionForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    inputOutput: new FormControl(null, [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _reconcilitionRequisitionDetailsWaService: ReconcilitionRequisitionDetailsWaService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.waCottonReconciliationRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.waCottonReconciliationRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.waCottonReconciliationRequisitionForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.waCottonReconciliationRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.waCottonReconciliationRequisitionForm.controls['statement'].setValue(this.selectedData?.statement)
    this.waCottonReconciliationRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.waCottonReconciliationRequisitionForm.controls['inputOutput'].setValue(String(this.selectedData?.input_output))
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.waCottonReconciliationRequisitionForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.waCottonReconciliationRequisitionForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.waCottonReconciliationRequisitionForm.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(this.waCottonReconciliationRequisitionForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.waCottonReconciliationRequisitionForm.markAllAsTouched();
    if (this.waCottonReconciliationRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWaService.update(this.waCottonReconciliationRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
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
