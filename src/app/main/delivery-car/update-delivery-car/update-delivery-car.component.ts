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
import { DeliveryCarService } from "src/app/services/main/delivery-car.service";

@Component({
  selector: 'app-update-delivery-car',
  templateUrl: './update-delivery-car.component.html',
  styleUrls: ['./update-delivery-car.component.css']
})
export class UpdateDeliveryCarComponent implements OnInit {


  @Input() selectedData: any
  deliveryCarForm:FormGroup = new FormGroup({
    model: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(2), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    plateNumber: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    driversName: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('', [Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    nationalId: new FormControl('', [Validators.maxLength(30), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _deliveryCarService: DeliveryCarService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.deliveryCarForm.controls['model'].setValue(this.selectedData?.model)
    this.deliveryCarForm.controls['plateNumber'].setValue(this.selectedData?.plate_number)
    this.deliveryCarForm.controls['driversName'].setValue(this.selectedData?.drivers_name)
    this.deliveryCarForm.controls['phone'].setValue(this.selectedData?.phone)
    this.deliveryCarForm.controls['nationalId'].setValue(this.selectedData?.national_id)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._deliveryCarService.update(this.deliveryCarForm.value,this.selectedData.id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        if (response.msg === "duplicated data") {
          this._constantsService.duplicateDataErrorMessage()
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }   
    })
  }
}
