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
import { DyeingServicesPricesService } from "src/app/services/main/dyeing-services-prices.service";

@Component({
  selector: 'app-update-anointed-services-prices',
  templateUrl: './update-anointed-services-prices.component.html',
  styleUrls: ['./update-anointed-services-prices.component.css']
})
export class UpdateAnointedServicesPricesComponent implements OnInit {

  @Input() selectedData: any
  anointedServicesPricesForm:FormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    isFabricPiece: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _dyeingServicesPricesService: DyeingServicesPricesService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.anointedServicesPricesForm.controls['price'].setValue(this.selectedData?.price)
    this.anointedServicesPricesForm.controls['isFabricPiece'].setValue(this.selectedData?.is_fabric_piece)
  }

  isChecked(control, value) {
    this.anointedServicesPricesForm.controls[control].setValue(value)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._dyeingServicesPricesService.update(this.anointedServicesPricesForm.value,this.selectedData.id).subscribe((response: any) =>{
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
