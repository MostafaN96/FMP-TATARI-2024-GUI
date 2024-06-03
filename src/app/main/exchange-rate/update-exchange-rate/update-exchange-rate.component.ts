import { Component, Inject, Input, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { ExchangeRateService } from "src/app/services/main/exchange-rate.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { GlobalService } from "src/app/services/exchange-rate.service";

@Component({
  selector: 'app-update-exchange-rate',
  templateUrl: './update-exchange-rate.component.html',
  styleUrls: ['./update-exchange-rate.component.css']
})
export class UpdateExchangeRateComponent {

  dollarPrice = []
  exchangeRateForm:FormGroup = new FormGroup({
    dollarPrice: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _exchangeRateService: ExchangeRateService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,
    public globalService: GlobalService

  ) { }

  ngOnInit(): void {
    this._exchangeRateService.select().subscribe((response: any) => {
      this.dollarPrice = response
      
      this.exchangeRateForm.controls['dollarPrice'].setValue(String(this.dollarPrice[0]['dollar_price']))
      })
  }

  onUpdate() {
    this.exchangeRateForm.markAllAsTouched()
    if (this.exchangeRateForm.valid) {
    this._constantsService.spinner.show()
    this._exchangeRateService.add(this.exchangeRateForm.value).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        setTimeout(() => this.globalService.exchangeRate.next({
          dollarPrice: this.exchangeRateForm.controls['dollarPrice'].value
        }), 1000);
        this._constantsService.successUpdateMessage()
        // this._sharedComponentService.reloadPage();
      }
      else {
          this._constantsService.userErrorMessage()
      }
    })
  }
}
}
