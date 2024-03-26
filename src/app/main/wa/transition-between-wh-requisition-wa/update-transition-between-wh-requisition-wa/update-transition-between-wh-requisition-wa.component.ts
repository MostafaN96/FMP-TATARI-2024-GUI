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
import { TransitionBetweenWhRequisitionDetailsWaService } from "src/app/services/main/wa/transition-between-wh-requisition-details-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transition-between-wh-requisition-wa',
  templateUrl: './update-transition-between-wh-requisition-wa.component.html',
  styleUrls: ['./update-transition-between-wh-requisition-wa.component.css']
})
export class UpdateTransitionBetweenWhRequisitionWaComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  transitionBetweenWhRequisitionForm:FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl(null, [Validators.required]),
    price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _transitionBetweenWhRequisitionDetailsWaService: TransitionBetweenWhRequisitionDetailsWaService,
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
    this.transitionBetweenWhRequisitionForm.controls['date'].setValue(this.selectedData?.date)
    this.transitionBetweenWhRequisitionForm.controls['note'].setValue(this.selectedData?.note)
    this.transitionBetweenWhRequisitionForm.controls['price'].setValue(this.selectedData?.price)
    this.transitionBetweenWhRequisitionForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transitionBetweenWhRequisitionForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.transitionBetweenWhRequisitionForm.controls['document'].setValue(this.selectedData?.document)
    this.transitionBetweenWhRequisitionForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  onUpdate() {
    this.transitionBetweenWhRequisitionForm.markAllAsTouched();
    if (this.transitionBetweenWhRequisitionForm.valid) {
      this._constantsService.spinner.show()
      this._transitionBetweenWhRequisitionDetailsWaService.update(this.transitionBetweenWhRequisitionForm.value, this.selectedData.id).subscribe((response: any) => {
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

