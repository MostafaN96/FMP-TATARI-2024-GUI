import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dyed-fabric-order-requisition-add-we',
  templateUrl: './dyed-fabric-order-requisition-add-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-add-we.component.css']
})
export class DyedFabricOrderRequisitionAddWeComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    sellerId: new FormControl(null, [Validators.required]),
    items: new FormArray([this.initItem()]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyers: any = []
  dyedFabrics: any = []
  colorCategories: any = []
  colors: any = []
  fabricName = ""
  fabricCode = ""
  colorName = ""
  colorCode = ""
  wasteRatio = ""
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsDyeing: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyeing: string = "العميل"


  public onFilteringDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

  // --------------- Dyed Fabric --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyedFabric: string = "نوع القماش الجاهز"

  public onFilteringDyedFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyedFabrics, query);
  }

    // --------------- Color Category --------------
  // maps the appropriate column to fields property
  public fieldsColorCategory: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColorCategory: string = "فئة اللون"

  public onFilteringColorCategoryName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colorCategories, query);
  }

  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColor: Object = { value: "id", text: "color_name_code" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('color_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors[index], query);
  }

  constructor(
    private _fabricService: FabricService,
    private _bussinessmanService: BussinessmanService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
        private router: Router,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectAll().subscribe((response: any) => {
      this.dyers = response
    })

    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })

    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })
  }

// Initialize Form Builder
initItem() {
  return new FormGroup({
    dyedFabricId: new FormControl("", [Validators.required]),
    dyedFabricCode: new FormControl(""),
    colorCategoryId: new FormControl("", [Validators.required]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl("", [Validators.required]),
    quantity: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    wasteRatio: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricWidth: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

addItem() {
  const control = <FormArray>this.addOrderForm.get('items');
  control.push(this.initItem());
}

getItem(form: any) {    
  return form.controls.items.controls;
}

removeItem(index: number){
  const control = <FormArray>this.addOrderForm.get('items');
  control.removeAt(index);
 }

  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this.addOrderForm.controls['sellerId'].setValue(event.itemData.id)
    }
    else {
      this.addOrderForm.controls['sellerId'].setValue(null)
    }
  }

  // Dyed Fabric
  selectDyedFabric(element: { itemData: any; }, row: FormGroup) {
    let indexData = this.dyedFabrics.indexOf(element.itemData)
    if (this.dyedFabrics[indexData] !== element.itemData) {
      row.controls['dyedFabricId'].setValue(null)
      row.controls['dyedFabricCode'].setValue(null)
      row.controls['wasteRatio'].setValue(null)
      this.fabricName = ""
      this.fabricCode = ""
      this.wasteRatio = ""
    }
    else {
      // console.log("element", element.itemData.code);
      // console.log("row", row.controls['dyedFabricCode']);
      row.controls['dyedFabricCode'].setValue(element.itemData.code)
      row.controls['wasteRatio'].setValue(element.itemData.waste_ratio)
      this.fabricName = element.itemData.name
      this.fabricCode = element.itemData.code
      this.wasteRatio = element.itemData.wast_ratio
    }    
  }

  // Color Category
  selectColorCategory(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colorCategories.includes(event.itemData)) {
      row.controls['colorCategoryId'].setValue(null)
      row.controls['colorId'].setValue(null)
      // row.controls['colorCode'].setValue(null)
      this.colors[index] = []
    }
    else {
      this._colorService.selectByCategory(event.itemData.id).subscribe((response: any) => {
        this.colors[index] = response        
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors[index].includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
      this.colorName = ""
      this.colorCode = ""
    } else {
      this.colorName = event.itemData.color_name_code
      this.colorCode = event.itemData.code
      row.controls['colorCode'].setValue(event.itemData.code)
    }
  }

  inquireFabricAvilability(data: any) {    
    data.markAllAsTouched();
    if (data.valid) {    
      let inquireFabricData = {data: data.value, 
        fabricName: this.fabricName,
        fabricCode: this.fabricCode,
        colorName: this.colorName,
        colorCode: this.colorCode,
        wasteRatio: this.wasteRatio
      }

    localStorage.setItem('inquireFabricData', JSON.stringify(inquireFabricData))
    this._sharedComponentService.openPageNewTabWithoutParams(this._constantsService.ROUTING_MAIN_LINKS[0]+this._constantsService.ROUTING_LINKS[154])
    
  //   this.router.navigateByUrl('/' + location.pathname.split("/")[1] + "/"+ this._constantsService.ROUTING_LINKS[154], {
  //     state: {data: data.value, 
  //       fabricName: this.fabricName,
  //       fabricCode: this.fabricCode,
  //       colorName: this.colorName,
  //       colorCode: this.colorCode,
  //       wasteRatio: this.wasteRatio
  //     }
  // })

  // this.router.navigate([], {
  //   state: {data: data.value}
  // }).then(result => { window.open('/' + location.pathname.split("/")[1] + "/"+ this._constantsService.ROUTING_LINKS[154], '_blank') });
}
  }
  
  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['priceDollar'].value))
    }
  }
  
  // WasteRatio
  changeWasteRatio(event) {    
    this.wasteRatio = event.target.value
  }

  async onAddRequisition() {
    this.isShowAdd = false

    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      this._constantsService.spinner.show()
      this._dyedFabricOrderRequisitionWeService.add(this.addOrderForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[188]}`, { id: response.id });
          this._sharedComponentService.reloadPage();
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else if (response.msg == "duplicated data") {
            this._constantsService.duplicateDataErrorMessage()
          }
          else {
            this._constantsService.userErrorMessage()
          }
          this.isShowAdd = true
        }
      });
    } else {
      this.isShowAdd = true
    }
  }

}

