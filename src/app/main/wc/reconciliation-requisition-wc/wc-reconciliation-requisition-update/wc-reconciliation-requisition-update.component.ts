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
import { ReconcilitionRequisitionDetailsWcService } from "src/app/services/main/wc/reconcilition-requisition-details-wc.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wc-reconciliation-requisition-update',
  templateUrl: './wc-reconciliation-requisition-update.component.html',
  styleUrls: ['./wc-reconciliation-requisition-update.component.css']
})
export class WcReconciliationRequisitionUpdateComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionId: string = "";

  @Input() selectedData: any
  wcCottonReconciliationRequisitionForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _reconcilitionRequisitionDetailsWcService: ReconcilitionRequisitionDetailsWcService,
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
    this.wcCottonReconciliationRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.wcCottonReconciliationRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.wcCottonReconciliationRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.wcCottonReconciliationRequisitionForm.controls['statement'].setValue(this.selectedData?.statement)
    this.wcCottonReconciliationRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.wcCottonReconciliationRequisitionForm.controls['inputOutput'].setValue(String(this.selectedData?.input_output))
  }

  onUpdate() {
    this.wcCottonReconciliationRequisitionForm.markAllAsTouched();
    if (this.wcCottonReconciliationRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWcService.update(this.wcCottonReconciliationRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
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
