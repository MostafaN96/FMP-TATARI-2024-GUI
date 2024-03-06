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
import { TransportWdWcRequisitionDetailsWdService } from "src/app/services/main/wd/transport-wd-wc-requisition-details-wd.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transport-wd-wc-requisition-wd',
  templateUrl: './update-transport-wd-wc-requisition-wd.component.html',
  styleUrls: ['./update-transport-wd-wc-requisition-wd.component.css']
})
export class UpdateTransportWdWcRequisitionWdComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  transportWdWcRequisitionWdForm: FormGroup = new FormGroup({
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
    private _transportWdWcRequisitionDetailsWdService: TransportWdWcRequisitionDetailsWdService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.transportWdWcRequisitionWdForm.controls['date'].setValue(this.selectedData?.date)
    this.transportWdWcRequisitionWdForm.controls['note'].setValue(this.selectedData?.note)
    this.transportWdWcRequisitionWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transportWdWcRequisitionWdForm.controls['price'].setValue(String(this.selectedData?.price) ?? '')
    this.transportWdWcRequisitionWdForm.controls['document'].setValue(this.selectedData?.document)
    this.transportWdWcRequisitionWdForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  onUpdate() {
    this.transportWdWcRequisitionWdForm.markAllAsTouched();
    if (this.transportWdWcRequisitionWdForm.valid) {
      this._constantsService.spinner.show()
      this._transportWdWcRequisitionDetailsWdService.update(this.transportWdWcRequisitionWdForm.value, this.selectedData.id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
