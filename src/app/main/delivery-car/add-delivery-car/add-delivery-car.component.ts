import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { DeliveryCarService } from "src/app/services/main/delivery-car.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-delivery-car',
  templateUrl: './add-delivery-car.component.html',
  styleUrls: ['./add-delivery-car.component.css']
})
export class AddDeliveryCarComponent implements OnInit {



  // Form Group
  deliveryCarForm: FormGroup = new FormGroup({
    model: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(2), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    plateNumber: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    driversName: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('', [Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    nationalId: new FormControl('', [Validators.maxLength(30), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _DeliveryCarService: DeliveryCarService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {

  }

  onAddDeliveryCar() {

    if (this.deliveryCarForm.valid) {
      this._DeliveryCarService.add(this.deliveryCarForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
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
      });
    }
  }

}
