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
import { ManufacturingRequisitionWbService } from "src/app/services/main/wb/manufacturing-requisition-wb.service";

@Component({
  selector: 'app-update-manufacturing-requisition-status-wb',
  templateUrl: './update-manufacturing-requisition-status-wb.component.html',
  styleUrls: ['./update-manufacturing-requisition-status-wb.component.css']
})
export class UpdateManufacturingRequisitionStatusWbComponent implements OnInit {

  requisitionId!: string;
  manufacturingStatus = this._constantsService.WB_MANUFACTURING_STATUS

  @Input() selectedData: any
  inputManufacturedWbForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })



  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _manufacturingRequisitionWbService: ManufacturingRequisitionWbService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    
    this.requisitionId = this.selectedData.id

    this.inputManufacturedWbForm.controls['date'].setValue(this.selectedData?.date)
    this.inputManufacturedWbForm.controls['note'].setValue(this.selectedData?.note)
    this.inputManufacturedWbForm.controls['status'].setValue(this.selectedData?.status)
  }

  onUpdate() {
    this.inputManufacturedWbForm.markAllAsTouched();
    if (this.inputManufacturedWbForm.valid) {
      this._constantsService.spinner.show()
      this._manufacturingRequisitionWbService.update(this.inputManufacturedWbForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg === "data updated") {
          this._constantsService.successUpdateMessage()
          // this._sharedComponentService.reloadPageWithParams(this.requisitionId);
          // setTimeout(() => {
          //   window.location.reload()
          // }, this._constantsService.RELOAD_TIME);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
        }
      })
    }
  }
}
