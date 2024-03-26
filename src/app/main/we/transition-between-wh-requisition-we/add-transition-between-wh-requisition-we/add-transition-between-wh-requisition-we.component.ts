import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { TransitionBetweenWhRequisitionWeService } from "src/app/services/main/we/transition-between-wh-requisition-we.service";
import { WeService } from "src/app/services/main/we/we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

@Component({
  selector: 'app-add-transition-between-wh-requisition-we',
  templateUrl: './add-transition-between-wh-requisition-we.component.html',
  styleUrls: ['./add-transition-between-wh-requisition-we.component.css']
})
export class AddTransitionBetweenWhRequisitionWeComponent {

// Child Components
@ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

//////////////////////////////////// Tabel Angular Material /////////////////////////////////
selectArrayValues: any[] = [];

///////////////////////////////// Form Group & Form Control ////////////////////////////////
transitionBetweenWhRequisitionForm = new FormGroup({
date: new FormControl(new Date(), [Validators.required]),
toWarehouseId: new FormControl("", [Validators.required]),
note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
items: new FormArray([]),
personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
});

///////////////////////////////// General ////////////////////////////////////////////////
toWarehouses: any = []
toConsigmentsDyeing: any = []
isShowAdd = true

///////////////////////////////// Auto Complete Data  ////////////////////////////////
// Auto Complete Data 
//enable the highlight property to highlight the matched character in suggestion list
public autofill: Boolean = true;

// --------------- To Warehouse --------------
// maps the appropriate column to fields property
public fieldsToWarehouse: Object = { value: "id", text: "name" };
// set the placeholder to the AutoComplete input
public textToWarehouse: string = "الى مخزن"

public onFilteringToWarehouse(e: any) {
  e.preventDefaultAction = true;
  var predicate = new Predicate('name', 'contains', e.text);
  var query = new Query();
  //frame the query based on search string with filter type.
  query = (e.text != "") ? query.where(predicate) : query;
  //pass the filter data source, filter query to updateData method.
  e.updateData(this.toWarehouses, query);
}

// --------------- to consigment Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsToConsigmentDyeing: Object = { value: "number", text:"number"};
  // set the placeholder to the AutoComplete input
  public textToConsigmentDyeing: string = "الى رقم الرسالة"

  public onFilteringToConsigmentDyeing (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toConsigmentsDyeing, query);
  }

constructor(
  private _transitionBetweenWhRequisitionWeService: TransitionBetweenWhRequisitionWeService,
  private _consigmentDyeingService: ConsigmentDyeingService,
public matcher: MyErrorStateMatcher,
public _sharedComponentService: SharedComponentService,
private _constantsService: ConstantsService,
private patterns: ValidatorPatternService,
private _sessionManagerService: SessionManagerService,
private _weService: WeService,
public _exportDataService: ExportDataService,
private _warehouseService: WarehouseService,
) {
this._sharedComponentService.configRouterReloadPage()
}

ngOnInit(): void {
this.getData()
}

getData() {

  this._warehouseService.selectAll().subscribe((response: any) => {
    this.toWarehouses = response
  })

this._weService.selectStoreWe().subscribe((response: any) => {
  this.currentStockReport.dyersAndRequisitionsFabrics = response
  this.currentStockReport.listen();
})

this._consigmentDyeingService.selectAll().subscribe((response: any) => {
  this.toConsigmentsDyeing = response
})

}
///////////////////// ----------- Start Search Tabel ----------- /////////////////////

getSelectedIndex(objectData: any) {
if (this.selectArrayValues.includes(objectData)) {
  let index = this.selectArrayValues.indexOf(objectData);
  this.selectArrayValues[index] = delete this.selectArrayValues[index];
  this.selectArrayValues.splice(index, 1);

  let indexData = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(objectData)
  this.removeItem(indexData)
}
else {
  this.selectArrayValues.push(objectData);
  this.addItem(objectData)
}
}

// Initialize Form Builder
initItem(data:any, index:number) {
return new FormGroup({
  index:new FormControl(index),
  weId: new FormControl(data.we_id, [Validators.required]),
  warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
  warehouseName: new FormControl(data.warehouse_name),
  dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
  dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
  dyedFabricCode: new FormControl(data.dyed_fabric_code),
  colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
  colorId: new FormControl(data.color_id, [Validators.required]),
  colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
  colorCode: new FormControl(data.color_code),
  consigmentDyeingId: new FormControl(''),
  newConsigmentDyeingNumber: new FormControl(''),
  fromConsigmentDyeingNumber: new FormControl(data.consigment_dyeing_number, [Validators.required]),
  fromConsigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
  price: new FormControl(data.price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  priceDollar: new FormControl(data.price_dollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  validQuantity:new FormControl(data.current_quantity),
  numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
  workOrderNumber: new FormControl(data.work_order_number, [Validators.pattern(this.patterns.validator_pattern.number)]),
  document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
  statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
});
}

addItem(data:any) {
let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
const control = <FormArray>this.transitionBetweenWhRequisitionForm.get('items');
control.push(this.initItem(data, index));
}

getItem(form: any) {    
return form.controls.items.controls;
}

removeItem(index: number){
const control = <FormArray>this.transitionBetweenWhRequisitionForm.get('items');
for (let i = 0; i < control.value.length; i++) {
  const element = control.value[i];
  if(element.index == index) {
    control.removeAt(i)
  }
}
}


validate(row: FormGroup) {
if(parseFloat(row.controls['quantity'].value)  > parseFloat(row.controls['validQuantity'].value)) {
  row.controls['quantity'].setErrors({'incorrect': true});
}
else {
  row.controls['quantity'].setErrors({'incorrect': null});
  row.controls['quantity'].updateValueAndValidity()
}
}

//  selectToWarehouse
selectToWarehouse(event: { itemData: any; }) {
  if (!this.toWarehouses.includes(event.itemData)) {
    this.transitionBetweenWhRequisitionForm.controls['toWarehouseId'].setValue(null)
  }
}

// Start to Consigment Dyeing Autocomplete Section
  //  to Consigment Dyeing
  selectToConsigmentDyeing(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.toConsigmentsDyeing.indexOf(event.itemData)
    if (this.toConsigmentsDyeing[indexData] == event.itemData) {
      row.controls['consigmentDyeingId'].setValue(event.itemData.id)
    } else {
      row.controls['consigmentDyeingId'].setValue("")
    }
  }
  // End to Consigment Dyeing Autocomplete Section

  
// price
changePrice(type, row: FormGroup) {
  if(type == "priceEG") {
    row.controls['priceDollar'].setValue("0")
  } else if (type == "priceDollar") {
    row.controls['price'].setValue("0")
  }
}

async onSellRequisition(){
  this.isShowAdd = false

this.transitionBetweenWhRequisitionForm.markAllAsTouched();
if (this.transitionBetweenWhRequisitionForm.valid) {
  this._constantsService.spinner.show()
  this._transitionBetweenWhRequisitionWeService.add(this.transitionBetweenWhRequisitionForm.value).subscribe(response => {
    this._constantsService.spinner.hide();
    if (response.msg == "data inserted") {
     this._constantsService.successAddMessage()
     this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[196]}`, {id: response.id});
     this._sharedComponentService.reloadPage();
   }
   else {
    if (response.msg == "quantity is wrong") {
      this._constantsService.quantityErrorMessage(response.spentQuantity, response.newQuantity)
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
