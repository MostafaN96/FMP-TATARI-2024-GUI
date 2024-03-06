import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";
import { SessionManagerService } from "../../../services/main/session-manager.service";

// Call Service
import { YarnService } from "../../../services/main/yarn.service";

@Component({
  selector: 'app-update-yarn',
  templateUrl: './update-yarn.component.html',
  styleUrls: ['./update-yarn.component.css']
})
export class UpdateYarnComponent implements OnInit {

  @Input() selectedData: any
  yarnForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(45), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
    code: new FormControl('',[Validators.required,Validators.maxLength(15), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _yarnService: YarnService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.yarnForm.controls['name'].setValue(this.selectedData?.name)
    this.yarnForm.controls['code'].setValue(this.selectedData?.code)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._yarnService.update(this.yarnForm.value, this.selectedData.id).subscribe((response: any) => {
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
