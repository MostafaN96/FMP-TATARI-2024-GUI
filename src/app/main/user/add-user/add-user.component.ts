import { Component, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { UserService } from "src/app/services/main/user.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  hide = true;

  // Form Group
  userForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required, 
      Validators.maxLength(50), 
      Validators.minLength(3), 
      Validators.pattern(this.patterns.validator_pattern.shortText)
    ]),
    userEmail: new FormControl('', [
      Validators.required, 
      Validators.maxLength(50), 
      Validators.email,
      Validators.pattern(this.patterns.validator_pattern.email)
    ]),
    userPassword: new FormControl('', [
      Validators.required, 
      Validators.maxLength(100), 
      Validators.minLength(8),
      Validators.pattern(this.patterns.validator_pattern.password)
    ]),
    userMobile: new FormControl('', [
      Validators.maxLength(45),
      Validators.pattern(this.patterns.validator_pattern.phone)
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _userService: UserService,
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

  onAddUser() {
    if (this.userForm.valid) {
      this._constantsService.spinner.show()
      this._userService.add(this.userForm.value).subscribe(response => {
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
