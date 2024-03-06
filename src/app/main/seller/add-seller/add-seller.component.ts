import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../services/error-state-matcher.service';

// Call Service -
import { SellerService } from "../../../services/main/seller.service";

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Import Components
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {


  // Form Group
  sellerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(10000), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.longText)]),

  })

  constructor(
    private _SellerService: SellerService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {

  }

  onAddSeller() {

    if (this.sellerForm.valid) {
    this._constantsService.spinner.show()
      this._SellerService.add(this.sellerForm.value).subscribe(response => {
      this._constantsService.spinner.hide();
        const res = response
        if (res.state === "ok") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPage();
        }
        else {
          if (res.message === 'duplicate data') {
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
