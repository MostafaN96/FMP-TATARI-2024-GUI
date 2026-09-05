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
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {

  @Input() selectedData: any
  supplierForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(2), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    address: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    isSupplier: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isSeller: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isManufacturer: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isDyer: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isCalcDyeingNet: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    isStock: new FormControl(0, [Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required])
  })

  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _supplierService: BussinessmanService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.supplierForm.controls['name'].setValue(this.selectedData?.name)
    this.supplierForm.controls['phone'].setValue(this.selectedData?.phone)
    this.supplierForm.controls['address'].setValue(this.selectedData?.address)
    this.supplierForm.controls['isSupplier'].setValue(Number(this.selectedData?.is_supplier))
    this.supplierForm.controls['isSeller'].setValue(Number(this.selectedData?.is_seller))
    this.supplierForm.controls['isManufacturer'].setValue(Number(this.selectedData?.is_manufacturer))
    this.supplierForm.controls['isDyer'].setValue(Number(this.selectedData?.is_dyer))
    this.supplierForm.controls['isCalcDyeingNet'].setValue(Number(this.selectedData?.is_calc_dyeing_net))
    this.supplierForm.controls['isStock'].setValue(Number(this.selectedData?.is_stock))
  }

  isChecked(control, value) {
    this.supplierForm.controls[control].setValue(value)

    if (this.supplierForm.controls['isManufacturer'].value == 1 ||
      this.supplierForm.controls['isDyer'].value == 1) {
    } else {
      this.supplierForm.controls['isStock'].setValue(0)
    }

  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._supplierService.update(this.supplierForm.value, this.selectedData.id).subscribe((response: any) => {
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
