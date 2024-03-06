import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { DyeingColorsPricesService } from "src/app/services/main/dyeing-colors-prices.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-anointed-colors-prices',
  templateUrl: './add-anointed-colors-prices.component.html',
  styleUrls: ['./add-anointed-colors-prices.component.css']
})
export class AddAnointedColorsPricesComponent implements OnInit {

  dyers:any;
  resultColorCategory:any;
  resultColor:any;

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyer --------------
  // maps the appropriate column to fields property
  public fieldsDyer: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyer: string = "المصبغة"

  public onFilteringDyer(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

  // --------------- Color Category --------------
  // maps the appropriate column to fields property
  public fieldsColorCategory: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColorCategory: string = "اسم فئة اللون"

  public onFilteringColorCategory(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.resultColorCategory, query);
  }

  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColor: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اسم اللون"

  public onFilteringColor(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.resultColor, query);
  }

// Form Group
anointedColorsPricesForm:FormGroup = new FormGroup({
  dyerId: new FormControl(),
  items: new FormArray([
    this.initItem(),
  ]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
  ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
})

constructor(
  private _dyeingColorsPricesService: DyeingColorsPricesService,
  private _ColorCategoryService: ColorCategoryService,
  private _bussinessmanService: BussinessmanService,
  private _ColorService: ColorService,
  public matcher: MyErrorStateMatcher,
  public _sharedComponentService: SharedComponentService,
  private _constantsService: ConstantsService,
  private patterns: ValidatorPatternService,
  private _sessionManagerService: SessionManagerService,
  
) {
  this._sharedComponentService.configRouterReloadPage()
}

ngOnInit(): void {
  this._bussinessmanService.selectDyer().subscribe((response: any) =>{
    this.dyers = response;
  });

  this._ColorCategoryService.selectAll().subscribe((response: any) =>{
    this.resultColorCategory = response;
  });

  this._ColorService.selectAll().subscribe((response: any) =>{
    this.resultColor = response;
  });
  
}

// Initialize Form Builder
initItem() {
  return new FormGroup({
    colorCategoryId: new FormControl('20220201721512782932', [Validators.required]),
    colorId: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(2), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  });
}

addItem() {
  const control = <FormArray>this.anointedColorsPricesForm.get('items');
  control.push(this.initItem());
}

getItem(form: any) {
  return form.controls.items.controls;
}

removeItem(index: number) {
  const control = <FormArray>this.anointedColorsPricesForm.get('items');
  control.removeAt(index);
}

  // Start Dyer Autocomplete Section
  //  Dyer
  selectDyer(event: { itemData: any; }) {
    if (!this.dyers.includes(event.itemData)) {
      this.anointedColorsPricesForm.controls['dyerId'].setValue(null)
    }
  }
  // End Dyer Autocomplete Section

onAddAnointedColorsPrices(){
  if (this.anointedColorsPricesForm.valid) {
    this._constantsService.spinner.show()
    this._dyeingColorsPricesService.add(this.anointedColorsPricesForm.value).subscribe(response => {
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



}
