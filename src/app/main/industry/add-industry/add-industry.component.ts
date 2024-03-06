import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../services/error-state-matcher.service';

// Call Service -
import { IndustryService } from "../../../services/main/industry.service";
import { BussinessmanService } from "../../../services/main/bussinessman.service";

// Shared Service
import { SharedComponentService } from "../../../services/shared-component.service";
import { ConstantsService } from "../../../services/constants.service";

@Component({
  selector: 'app-add-industry',
  templateUrl: './add-industry.component.html',
  styleUrls: ['./add-industry.component.css']
})
export class AddIndustryComponent implements OnInit {


  resultSupplier:any;

// Form Group
industryForm:FormGroup = new FormGroup({
  supplierId: new FormControl(),
  name: new FormControl('',[Validators.required,Validators.maxLength(90), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.shortText)]),
  phone: new FormControl('',[Validators.required,Validators.maxLength(15), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.number)]),
  address: new FormControl('',[Validators.required,Validators.maxLength(10000), Validators.minLength(3) , Validators.pattern(this.patterns.validator_pattern.longText)]),

})

constructor(
  private _industryService: IndustryService,
  private _SupplierService: BussinessmanService,
  public matcher: MyErrorStateMatcher,
  public _sharedComponentService: SharedComponentService,
  private _constantsService: ConstantsService,
  private patterns: ValidatorPatternService,
  
) {
  this._sharedComponentService.configRouterReloadPage()
}

ngOnInit(): void {
  this._SupplierService.selectManufacturer().subscribe((response: any) =>{
    this.resultSupplier = response;
  });
  
}

onAddIndustry(){
  if (this.industryForm.valid) {
    this._constantsService.spinner.show()
    this._industryService.add(this.industryForm.value).subscribe(response => {
      this._constantsService.spinner.hide();

     const res=response
     if (res.state === "ok") {
       this._constantsService.successAddMessage()
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
    });
  }    
 }
}
