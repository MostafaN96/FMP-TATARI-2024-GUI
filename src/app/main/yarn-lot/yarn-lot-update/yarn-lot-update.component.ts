import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "../../../services/main/session-manager.service";

// Call Service
import { YarnLotService } from "src/app/services/main/yarn-lot.service";

@Component({
  selector: 'app-yarn-lot-update',
  templateUrl: './yarn-lot-update.component.html',
  styleUrls: ['./yarn-lot-update.component.css']
})
export class YarnLotUpdateComponent implements OnInit {

  @Input() selectedData: any
  yarnLotForm:FormGroup = new FormGroup({
    yarnId: new FormControl("", [Validators.required]),    
    code: new FormControl('',[Validators.required,Validators.maxLength(90), Validators.minLength(1) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _yarnLotService: YarnLotService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.yarnLotForm.controls['yarnId'].setValue(this.selectedData?.yarn_id)
    this.yarnLotForm.controls['code'].setValue(this.selectedData?.code)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._yarnLotService.update(this.yarnLotForm.value, this.selectedData.id).subscribe((response: any) => {
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
