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
import { WdTransportWcWdRequisitionDetailsService } from "src/app/services/main/wc/wd-transport-wc-wd-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transport-wc-wd-requisition-wc',
  templateUrl: './update-transport-wc-wd-requisition-wc.component.html',
  styleUrls: ['./update-transport-wc-wd-requisition-wc.component.css']
})
export class UpdateTransportWcWdRequisitionWcComponent implements OnInit {

  requisitionId!: string;
  warehouseId!: string;

  @Input() selectedData: any
  transportWcWdRequisitionWcForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _wdTransportWcWdRequisitionDetailsService: WdTransportWcWdRequisitionDetailsService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
        this.warehouseId = params['warehouseId']
      })
  }

  ngOnChanges() {
    this.transportWcWdRequisitionWcForm.controls['date'].setValue(this.selectedData?.date)
    this.transportWcWdRequisitionWcForm.controls['note'].setValue(this.selectedData?.note)
    this.transportWcWdRequisitionWcForm.controls['price'].setValue(this.selectedData?.price)
    this.transportWcWdRequisitionWcForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transportWcWdRequisitionWcForm.controls['document'].setValue(this.selectedData?.document)
    this.transportWcWdRequisitionWcForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  onUpdate() {
    this.transportWcWdRequisitionWcForm.markAllAsTouched();
    if (this.transportWcWdRequisitionWcForm.valid) {
      this._constantsService.spinner.show()
      this._wdTransportWcWdRequisitionDetailsService.update(this.transportWcWdRequisitionWcForm.value, this.selectedData.id).subscribe((response: any) => {
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
