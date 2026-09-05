import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

 // Form Group
 supplierForm:FormGroup = new FormGroup({
  name: new FormControl('',[Validators.required,Validators.maxLength(90), Validators.minLength(2) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
  phone: new FormControl('',[Validators.pattern(this.patterns.validator_pattern.number)]),
  address: new FormControl('',[Validators.pattern(this.patterns.validator_pattern.longText)]),
  isSupplier: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isSeller: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isManufacturer: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isDyer: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isCalcDyeingNet: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isStock: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
  ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required])
})

constructor(
  private _SupplierService: BussinessmanService,
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

onAddSupplier(){
  if (this.supplierForm.valid) {
    this._constantsService.spinner.show()

    this._SupplierService.add(this.supplierForm.value).subscribe(response => {
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

 isChecked(control, value) {
   this.supplierForm.controls[control].setValue(value)

   if( this.supplierForm.controls['isManufacturer'].value == 1 || 
   this.supplierForm.controls['isDyer'].value == 1) {
   } else {
    this.supplierForm.controls['isStock'].setValue(0)
   }
 }
}
