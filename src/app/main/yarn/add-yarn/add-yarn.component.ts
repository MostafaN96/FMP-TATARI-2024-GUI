import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { YarnService } from "src/app/services/main/yarn.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-yarn',
  templateUrl: './add-yarn.component.html',
  styleUrls: ['./add-yarn.component.css']
})
export class AddYarnComponent implements OnInit {

  // Form Group
  yarnForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    // lotCode: new FormControl('24', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _YarnService: YarnService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._YarnService.selectMaxCode().subscribe((response: any) => {
      this.yarnForm.controls['code'].setValue(String(parseFloat(response[0].code) + 1))
    })
  }

  onAddYarn() {
    if (this.yarnForm.valid) {
      this._constantsService.spinner.show()
      this._YarnService.add(this.yarnForm.value).subscribe(response => {
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
