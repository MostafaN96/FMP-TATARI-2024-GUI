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
import { ExecuteOrderRequisitionDetailsWaService } from "src/app/services/main/wa/execute-order-requisition-details-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-add-requisition-order-wa',
  templateUrl: './update-add-requisition-order-wa.component.html',
  styleUrls: ['./update-add-requisition-order-wa.component.css']
})
export class UpdateAddRequisitionOrderWaComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  executeOrderRequisitionForm:FormGroup = new FormGroup({
    requisitionNote: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    waYarnOrderRequisitionId: new FormControl("", [Validators.required]),
    waYarnOrderRequisitionDetailsId: new FormControl("", [Validators.required]),
    waId: new FormControl("", [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _executeOrderRequisitionDetailsWaService: ExecuteOrderRequisitionDetailsWaService,
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
    this.executeOrderRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.executeOrderRequisitionForm.controls['requisitionNote'].setValue(this.selectedData?.requisition_note)
    this.executeOrderRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.executeOrderRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.executeOrderRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.executeOrderRequisitionForm.controls['waYarnOrderRequisitionId'].setValue(this.selectedData?.wa_yarn_order_requisition_id)
    this.executeOrderRequisitionForm.controls['waYarnOrderRequisitionDetailsId'].setValue(this.selectedData?.wa_yarn_order_requisition_details_id)
    this.executeOrderRequisitionForm.controls['waId'].setValue(this.selectedData?.wa_id)
  }

  onUpdate() {
    this.executeOrderRequisitionForm.markAllAsTouched();
    if (this.executeOrderRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._executeOrderRequisitionDetailsWaService.update(this.executeOrderRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionId, warehouse_id: this.selectedData.warehouse_id });
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
