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
import { DyeingColorsPricesService } from "src/app/services/main/dyeing-colors-prices.service";

@Component({
  selector: 'app-update-anointed-colors-prices',
  templateUrl: './update-anointed-colors-prices.component.html',
  styleUrls: ['./update-anointed-colors-prices.component.css']
})
export class UpdateAnointedColorsPricesComponent implements OnInit {




  @Input() selectedData: any
  anointedColorsPricesForm:FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(2), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _dyeingColorsPricesService: DyeingColorsPricesService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.anointedColorsPricesForm.controls['code'].setValue(this.selectedData?.code)
    this.anointedColorsPricesForm.controls['price'].setValue(String(this.selectedData?.price))
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._dyeingColorsPricesService.update(this.anointedColorsPricesForm.value,this.selectedData.id).subscribe((response: any) =>{
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
