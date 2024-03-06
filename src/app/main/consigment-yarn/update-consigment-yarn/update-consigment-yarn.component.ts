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
import { ConsigmentYarnService } from "src/app/services/main/consigment-yarn.service";

@Component({
  selector: 'app-update-consigment-yarn',
  templateUrl: './update-consigment-yarn.component.html',
  styleUrls: ['./update-consigment-yarn.component.css']
})
export class UpdateConsigmentYarnComponent implements OnInit {


  @Input() selectedData: any
  consigmentYarnForm:FormGroup = new FormGroup({
    number: new FormControl('',[Validators.required,Validators.maxLength(90), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _consigmentYarnService: ConsigmentYarnService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.consigmentYarnForm.controls['number'].setValue(this.selectedData?.number)


  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._consigmentYarnService.update(this.consigmentYarnForm.value,this.selectedData.id).subscribe((response: any) =>{
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
