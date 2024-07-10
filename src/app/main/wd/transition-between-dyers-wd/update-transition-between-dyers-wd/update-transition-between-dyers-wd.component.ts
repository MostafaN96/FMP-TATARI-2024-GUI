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
import { WdTransitionBetweenDyersRequisitionDetailsService } from "src/app/services/main/wd/wd-transition-between-dyers-requisition-details.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-transition-between-dyers-wd',
  templateUrl: './update-transition-between-dyers-wd.component.html',
  styleUrls: ['./update-transition-between-dyers-wd.component.css']
})
export class UpdateTransitionBetweenDyersWdComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  transitionBetweenDyersRequisitionWdForm:FormGroup = new FormGroup({
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    date: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _wdTransitionBetweenDyersRequisitionDetailsService: WdTransitionBetweenDyersRequisitionDetailsService,
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
    this.transitionBetweenDyersRequisitionWdForm.controls['date'].setValue(this.selectedData?.date)    
    this.transitionBetweenDyersRequisitionWdForm.controls['note'].setValue(this.selectedData?.note)   
    this.transitionBetweenDyersRequisitionWdForm.controls['price'].setValue(this.selectedData?.price)
    this.transitionBetweenDyersRequisitionWdForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.transitionBetweenDyersRequisitionWdForm.controls['quantity'].setValue(this.selectedData?.quantity)
    this.transitionBetweenDyersRequisitionWdForm.controls['document'].setValue(this.selectedData?.document)
    this.transitionBetweenDyersRequisitionWdForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.transitionBetweenDyersRequisitionWdForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.transitionBetweenDyersRequisitionWdForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.transitionBetweenDyersRequisitionWdForm.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(this.transitionBetweenDyersRequisitionWdForm.controls['priceDollar'].value))
    }
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._wdTransitionBetweenDyersRequisitionDetailsService.update(this.transitionBetweenDyersRequisitionWdForm.value,this.selectedData.id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
