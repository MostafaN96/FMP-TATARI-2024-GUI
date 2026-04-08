import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { UserService } from "src/app/services/main/user.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() selectedData: any;
  hide: boolean = true;
  changePassword: boolean = false;

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
    userPassword: new FormControl('', []),
    userMobile: new FormControl('', [
      Validators.maxLength(45),
      Validators.pattern(this.patterns.validator_pattern.phoneNumber)
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _userService: UserService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.userForm.controls['userName'].setValue(this.selectedData?.user_name);
    this.userForm.controls['userEmail'].setValue(this.selectedData?.user_email);
    this.userForm.controls['userMobile'].setValue(this.selectedData?.user_mobile);
    this.changePassword = false;
    this.userForm.controls['userPassword'].setValue('');
    this.updatePasswordValidators();
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    this.updatePasswordValidators();
  }

  updatePasswordValidators() {
    const passwordControl = this.userForm.controls['userPassword'];
    if (this.changePassword) {
      passwordControl.setValidators([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(8),
        Validators.pattern(this.patterns.validator_pattern.password)
      ]);
    } else {
      passwordControl.clearValidators();
      passwordControl.setValue('');
    }
    passwordControl.updateValueAndValidity();
  }

  onUpdateUser() {
    this._constantsService.spinner.show();
    
    const updateData: any = {
      userName: this.userForm.value.userName,
      userEmail: this.userForm.value.userEmail,
      userMobile: this.userForm.value.userMobile,
      personid: this.userForm.value.personid,
      ipaddress: this.userForm.value.ipaddress
    };

    // فقط أضف كلمة المرور إذا كان المستخدم يريد تغييرها
    if (this.changePassword && this.userForm.value.userPassword) {
      updateData.userPassword = this.userForm.value.userPassword;
    }

    this._userService.update(updateData, this.selectedData.user_id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage();
        this._sharedComponentService.reloadPage();
      } else {
        if (response.msg === "duplicated data") {
          this._constantsService.duplicateDataErrorMessage();
        } else {
          this._constantsService.userErrorMessage();
        }
      }
    });
  }
}
