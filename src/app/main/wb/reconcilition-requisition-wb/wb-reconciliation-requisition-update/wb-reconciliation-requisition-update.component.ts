import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { ReconcilitionRequisitionDetailsWbService } from "src/app/services/main/wb/reconcilition-requisition-details-wb.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wb-reconciliation-requisition-update',
  templateUrl: './wb-reconciliation-requisition-update.component.html',
  styleUrls: ['./wb-reconciliation-requisition-update.component.css']
})
export class WbReconciliationRequisitionUpdateComponent implements OnInit {

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionId: string = "";

  @Input() selectedData: any
  reconciliationRequisitionForm: FormGroup = new FormGroup({
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
    private _reconcilitionRequisitionDetailsWbService: ReconcilitionRequisitionDetailsWbService,
    public _constantsService: ConstantsService,
    public _sessionManagerService: SessionManagerService,

  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  getData() {
  }


  ngOnChanges() {
    this.getData();
    this.reconciliationRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.reconciliationRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.reconciliationRequisitionForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.reconciliationRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.reconciliationRequisitionForm.controls['statement'].setValue(this.selectedData?.statement)
    this.reconciliationRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.reconciliationRequisitionForm.controls['inputOutput'].setValue(String(this.selectedData?.input_output))
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.reconciliationRequisitionForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.reconciliationRequisitionForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.reconciliationRequisitionForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.reconciliationRequisitionForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this.reconciliationRequisitionForm.markAllAsTouched();
    if (this.reconciliationRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._reconcilitionRequisitionDetailsWbService.update(this.reconciliationRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
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
