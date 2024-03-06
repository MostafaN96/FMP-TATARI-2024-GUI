import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

// Call Service
import { SellerService } from "../../../services/main/seller.service";

@Component({
  selector: 'app-update-seller',
  templateUrl: './update-seller.component.html',
  styleUrls: ['./update-seller.component.css']
})
export class UpdateSellerComponent implements OnInit {


  @Input() selectedData: any
  sellerForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(90), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('',[Validators.required,Validators.maxLength(15), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.number)]),
    address: new FormControl('',[Validators.required,Validators.maxLength(10000), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.longText)]),

  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _sellerService: SellerService,
    
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.sellerForm.controls['name'].setValue(this.selectedData?.name)
    this.sellerForm.controls['phone'].setValue(this.selectedData?.phone)
    this.sellerForm.controls['address'].setValue(this.selectedData?.address)

  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._sellerService.update(this.sellerForm.value,this.selectedData.id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      const res=response
      if (res.state === "ok") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPage();
      }
      else{
        if (res.message==='duplicate data') {
          this._constantsService.duplicateDataErrorMessage()
        }
        else{
          this._constantsService.userErrorMessage()
        }

      }    
    })
  }
}
