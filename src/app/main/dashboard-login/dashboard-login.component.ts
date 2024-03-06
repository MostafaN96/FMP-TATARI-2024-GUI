import { Component, Inject, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { ValidatorPatternService } from "src/app/services/validator-pattern.service";
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';
import { UserService } from "src/app/services/main/user.service";
import { ConstantsService } from 'src/app/services/constants.service';

// Import Components
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-dashboard-login',
  templateUrl: './dashboard-login.component.html',
  styleUrls: ['./dashboard-login.component.css']
})
export class DashboardLoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(this._validatorPatternService.validator_pattern.email)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(this._validatorPatternService.validator_pattern.password)]),
  })

  constructor(
    private _validatorPatternService: ValidatorPatternService,
    public matcher: MyErrorStateMatcher,
    private _userService: UserService,
    public _constantsService: ConstantsService,
    @Inject(AppComponent) private parent: AppComponent,

  ) {
    localStorage.clear()

    $(document).ready(() => {   //same as: $(function() { 
      //after full window load including image src css file
      window.onload = (event) => {
        this.parent.isShowNav = false
      };
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.loginForm.valid)
      this._userService.login(this.loginForm.value)
        .subscribe(response => {
          localStorage.setItem(this._constantsService.TOKEN_SESSION_KEY, response.token)
          if (response.msg === 'login success') {
            localStorage.setItem('token', response.token)
            localStorage.setItem('privilege', JSON.stringify(response.privilege))
            window.location.href = 'dashboard/' + 'home'
          }
          else {
            this._constantsService.invalidEmailMessage()
            this.parent.isShowNav = false
          }
        })
  }

}
