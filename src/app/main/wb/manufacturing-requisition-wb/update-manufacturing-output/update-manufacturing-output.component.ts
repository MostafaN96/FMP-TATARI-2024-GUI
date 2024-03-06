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
import { WbManufacturingOutputService } from "src/app/services/main/wb/wb-manufacturing-output.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-manufacturing-output',
  templateUrl: './update-manufacturing-output.component.html',
  styleUrls: ['./update-manufacturing-output.component.css']
})
export class UpdateManufacturingOutputComponent implements OnInit {

  requisitionId!: string;

  @Input() selectedData: any
  outputManufacturedWbForm:FormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    manufacturingFee: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    private _wbManufacturingOutputService: WbManufacturingOutputService,
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
    this.outputManufacturedWbForm.controls['price'].setValue(String(this.selectedData?.price))
    this.outputManufacturedWbForm.controls['quantity'].setValue(String(this.selectedData?.quantity))
    this.outputManufacturedWbForm.controls['manufacturingFee'].setValue(this.selectedData?.manufacturing_fee)
    this.outputManufacturedWbForm.controls['document'].setValue(this.selectedData?.document)
    this.outputManufacturedWbForm.controls['statement'].setValue(this.selectedData?.statement)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._wbManufacturingOutputService.update(this.outputManufacturedWbForm.value, this.selectedData.id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage()
        // this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        setTimeout(() => {
          window.location.reload()
        }, this._constantsService.RELOAD_TIME);
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
