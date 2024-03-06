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
import { ReturnRequisitionDetailsWaService } from "src/app/services/main/wa/return-requisition-details-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-return-requisition-wa',
  templateUrl: './update-return-requisition-wa.component.html',
  styleUrls: ['./update-return-requisition-wa.component.css']
})
export class UpdateReturnRequisitionWaComponent implements OnInit {

  requisitionId: string = ""
  warehouseId: string = ""
  supplierId: string = ""

  @Input() selectedData: any
  returnRequisitionWaForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    waReturnRequisitionId: new FormControl(null, [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _returnRequisitionDetailsWaService: ReturnRequisitionDetailsWaService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
        this.warehouseId = params['warehouseId']
        this.supplierId = params['supplierId']
      })
  }

  ngOnChanges() {
    this.returnRequisitionWaForm.controls['date'].setValue(this.selectedData?.date)
    this.returnRequisitionWaForm.controls['note'].setValue(this.selectedData?.note)
    this.returnRequisitionWaForm.controls['price'].setValue(this.selectedData?.price)
    this.returnRequisitionWaForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.returnRequisitionWaForm.controls['statement'].setValue(this.selectedData?.statement)
    this.returnRequisitionWaForm.controls['waReturnRequisitionId'].setValue(this.selectedData?.requisition_id)
  }

  onUpdate() {
    this.returnRequisitionWaForm.markAllAsTouched();
    if (this.returnRequisitionWaForm.valid) {
      this._constantsService.spinner.show()
      this._returnRequisitionDetailsWaService.update(this.returnRequisitionWaForm.value, this.selectedData['id'], this.selectedData['supplier_id']).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionId });
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
