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
import { ReconcilitionRequisitionDetailsWdService } from "src/app/services/main/wd/reconcilition-requisition-details-wd.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wd-reconciliation-requisition-update',
  templateUrl: './wd-reconciliation-requisition-update.component.html',
  styleUrls: ['./wd-reconciliation-requisition-update.component.css']
})
export class WdReconciliationRequisitionUpdateComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionId: string = "";

  @Input() selectedData: any
  wdReconciliationRequisitionForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    inputOutput: new FormControl("", [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _reconcilitionRequisitionDetailsWdService: ReconcilitionRequisitionDetailsWdService,
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
    this.wdReconciliationRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.wdReconciliationRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.wdReconciliationRequisitionForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.wdReconciliationRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.wdReconciliationRequisitionForm.controls['statement'].setValue(this.selectedData?.statement)
    this.wdReconciliationRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.wdReconciliationRequisitionForm.controls['inputOutput'].setValue(String(this.selectedData?.input_output))
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.wdReconciliationRequisitionForm.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      this.wdReconciliationRequisitionForm.controls['price'].setValue("0")
    }
  }

  onUpdate() {
    this.wdReconciliationRequisitionForm.markAllAsTouched();
    if (this.wdReconciliationRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWdService.update(this.wdReconciliationRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
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
