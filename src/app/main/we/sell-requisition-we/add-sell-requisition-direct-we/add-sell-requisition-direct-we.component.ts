import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SellRequisitionWeService } from "src/app/services/main/we/sell-requisition-we.service";
import { WeService } from "src/app/services/main/we/we.service";
import { DeliveryCarService } from "src/app/services/main/delivery-car.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { ColorService } from "src/app/services/main/color.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";

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
  selector: 'app-add-sell-requisition-direct-we',
  templateUrl: './add-sell-requisition-direct-we.component.html',
  styleUrls: ['./add-sell-requisition-direct-we.component.css']
})
export class AddSellRequisitionDirectWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

///////////////////////////////// Form Group & Form Control ////////////////////////////////
sellRequisitionDirectFormWe = new FormGroup({
  date: new FormControl(new Date(), [Validators.required]),
  sellerId: new FormControl('', [Validators.required]),
  deliveryCarId: new FormControl('', [Validators.required]),
  note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  items: new FormArray([]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
  ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
});

///////////////////////////////// General ////////////////////////////////////////////////
sellers:any = []
deliveryCars:any = []
fabrics:any = []
colorCategories:any = []
colors:any = []
warehouses:any = []
isShowAdd = true

///////////////////////////////// Auto Complete Data  ////////////////////////////////
// Auto Complete Data 
//enable the highlight property to highlight the matched character in suggestion list
public autofill: Boolean = true;

// --------------- Seller --------------
// maps the appropriate column to fields property
public fieldsSeller: Object = { value: "id", text:"name"};
// set the placeholder to the AutoComplete input
public textSeller: string = "العميل"

public onFilteringSeller (e: any)
{
  e.preventDefaultAction=true;
       var predicate = new Predicate('name', 'contains', e.text);
        var query = new Query();
    //frame the query based on search string with filter type.
      query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
      e.updateData(this.sellers, query);
}

// --------------- Delivery Car --------------
// maps the appropriate column to fields property
public fieldsDeliveryCars: Object = { value: "id", text:"name"};
// set the placeholder to the AutoComplete input
public textDeliveryCars: string = "اسم السائق"

public onFilteringDeliveryCars (e: any)
{
  e.preventDefaultAction=true;
       var predicate = new Predicate('drivers_name', 'contains', e.text);
       predicate = predicate.or('plate_number', 'contains', e.text);
       predicate = predicate.or('national_id', 'contains', e.text);
        var query = new Query();
    //frame the query based on search string with filter type.
      query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
      e.updateData(this.deliveryCars, query);
}

// --------------- Fabric --------------
// maps the appropriate column to fields property
public fieldsFabric: Object = { value: "id", text:"name"};
// set the placeholder to the AutoComplete input
public textFabric: string = "اسم القماش"

public onFilteringFabricName (e: any)
{
  e.preventDefaultAction=true;
       var predicate = new Predicate('name', 'contains', e.text);
       predicate = predicate.or('code', 'contains', e.text);
        var query = new Query();
    //frame the query based on search string with filter type.
      query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
      e.updateData(this.fabrics, query);
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
  public fieldsColor: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
  }

  // --------------- Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textWarehouse: string = "المخزن"

  public onFilteringWarehouse (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.warehouses, query);
  }

constructor(
  private _warehouseService: WarehouseService,
  private _sellerService: BussinessmanService,
  private _sellRequisitionWeService: SellRequisitionWeService,
  public matcher: MyErrorStateMatcher,
  public _sharedComponentService: SharedComponentService,
  private _constantsService: ConstantsService,
  private patterns: ValidatorPatternService,
  private _sessionManagerService: SessionManagerService,
 private _weService: WeService,
 public _exportDataService: ExportDataService,
 private _deliveryCarService: DeliveryCarService,
 private _fabricService: FabricService,
private _colorService: ColorService,
    private _colorCategoryService: ColorCategoryService,
) {
  this._sharedComponentService.configRouterReloadPage()

}

ngOnInit(): void {
  this.getData()
}

getData() {

  this._sellerService.selectSeller().subscribe((response: any) => {
    this.sellers = response
  })

  this._weService.selectStoreWithDyeingServicesWe().subscribe((response: any) => {
    this.currentStockReport.dyersAndRequisitionsFabrics = response
    this.currentStockReport.isShowPrice = false
    this.currentStockReport.isShowValue = false
    this.currentStockReport.isShowStoragePlace = true
    this.currentStockReport.isShowUpdateStoragePlace = true
    this.currentStockReport.isShowDyeingServices = true
    this.currentStockReport.isShowOrderNumber = true
    this.currentStockReport.isShowOrderCustomerName = true
    this.currentStockReport.isShowNotes = true
    this.currentStockReport.isShowSoldedDirectQuantity = true
    this.currentStockReport.listen();
    
  })

  this._deliveryCarService.selectAll().subscribe((response: any) => {
    this.deliveryCars = response
  })

  this._fabricService.selectAll("dyed").subscribe((response: any) => {
    this.fabrics = response
  })
this._colorService.selectAll().subscribe((response: any) => {
    this.colors = response
  })
this._colorCategoryService.selectAll().subscribe((response: any) => {
    this.colorCategories = response
  })

  this._warehouseService.selectAll().subscribe((response: any) => {
    this.warehouses = response
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
    isDyeingItem:new FormControl(1),
    dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
    dyedFabricCode: new FormControl(data.dyed_fabric_code),
    warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
    colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
    colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    colorId: new FormControl(data.color_id, [Validators.required]),
    colorCode: new FormControl(data.color_code),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    validQuantity:new FormControl(data.current_quantity),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    workOrderNumber: new FormControl(data.work_order_number, [Validators.pattern(this.patterns.validator_pattern.number)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

initEmptyItem(index:number) {
  return new FormGroup({
    index:new FormControl(index),
    isDyeingItem:new FormControl(0),
    dyedFabricName: new FormControl(null, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    dyedFabricId: new FormControl(null, [Validators.required]),
    dyedFabricCode: new FormControl(null),
    warehouseId: new FormControl("", [Validators.required]),
    colorCategoryName: new FormControl(null, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    colorCategoryId: new FormControl(null, [Validators.required]),
    colorName: new FormControl(null, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    colorId: new FormControl(null, [Validators.required]),
    colorCode: new FormControl(null),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    validQuantity:new FormControl(null),
    numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
    workOrderNumber: new FormControl(null, [Validators.pattern(this.patterns.validator_pattern.number)]),
    document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

addItem(data:any) {
  let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
  const control = <FormArray>this.sellRequisitionDirectFormWe.get('items');
  control.push(this.initItem(data, index));
}

addEmptyItem() {
  const control = <FormArray>this.sellRequisitionDirectFormWe.get('items');
  control.push(this.initEmptyItem(-1));
}

getItem(form: any) {    
  return form.controls.items.controls;
}

removeItem(index: number){
  const control = <FormArray>this.sellRequisitionDirectFormWe.get('items');
  for (let i = 0; i < control.value.length; i++) {
    const element = control.value[i];
    
    if(element.index == index) {
      control.removeAt(i)
    }
  }
 }

 removeEmptyItem(index: number) {
  const control = <FormArray>this.sellRequisitionDirectFormWe.get('items');
  control.removeAt(index);
}

//  Seller
selectSeller(event: { itemData: any; }) {
  if (!this.sellers.includes(event.itemData)) {
    this.sellRequisitionDirectFormWe.controls.sellerId.setValue(null)
  }
}

//  Fabric
selectFabric(event: { itemData: any; }, row: FormGroup) {
  let indexData = this.fabrics.indexOf(event.itemData)

  if (this.fabrics[indexData] !== event.itemData) {
    row.controls['dyedFabricId'].setValue(null)
    row.controls['dyedFabricCode'].setValue(null)
    row.controls['quantity'].setValue(null)
  } else {
    row.controls['dyedFabricId'].setValue(event.itemData.id)
    row.controls['dyedFabricCode'].setValue(event.itemData.code)
  }
}
// Color
selectColor(event: { itemData: any; }, row: FormGroup) {
  if (!this.colors.includes(event.itemData)) {
    row.controls['colorId'].setValue(null)
  } else {
    row.controls['colorId'].setValue(event.itemData.id)
  }
}

selectColorCategory(event: { itemData: any; }, row: FormGroup) {
  if (!this.colorCategories.includes(event.itemData)) {
    row.controls['colorCategoryId'].setValue(null)
  } else {
    row.controls['colorCategoryId'].setValue(event.itemData.id)
  }
}

//  Warehouse
selectWarehouse(event: { itemData: any; }, row: FormGroup) {
  if (!this.warehouses.includes(event.itemData)) {
    row.controls['warehouseId'].setValue("")
  }
}

  async onSellRequisition(){
    this.isShowAdd = false

  this.sellRequisitionDirectFormWe.markAllAsTouched();
  if (this.sellRequisitionDirectFormWe.valid) {
    const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.sellRequisitionDirectFormWe, 'items', 
    ['index', 'isDyeingItem', 'dyedFabricName', 'dyedFabricCode',
    'colorCategoryName', 'colorName', 'validQuantity'])

    this._constantsService.spinner.show()
    this._sellRequisitionWeService.add(formGroup.value, "direct").subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg == "data inserted") {
       this._constantsService.successAddMessage()
       this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[90]}/details`, {id: response.id});
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
