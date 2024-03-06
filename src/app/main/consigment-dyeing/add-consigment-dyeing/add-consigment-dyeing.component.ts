import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-consigment-dyeing',
  templateUrl: './add-consigment-dyeing.component.html',
  styleUrls: ['./add-consigment-dyeing.component.css']
})
export class AddConsigmentDyeingComponent implements OnInit {


  // Form Group
  consigmentDyeingForm: FormGroup = new FormGroup({
    number: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _ConsigmentDyeingService: ConsigmentDyeingService,
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

  onAddConsigmentDyeing() {

    if (this.consigmentDyeingForm.valid) {
    this._constantsService.spinner.show()
      this._ConsigmentDyeingService.add(this.consigmentDyeingForm.value).subscribe(response => {
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
