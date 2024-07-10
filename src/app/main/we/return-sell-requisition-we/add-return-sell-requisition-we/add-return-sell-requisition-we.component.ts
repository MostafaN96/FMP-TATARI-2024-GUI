import { Component, Inject, OnInit, ViewChild } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ReturnSellRequisitionWeService } from "src/app/services/main/we/return-sell-requisition-we.service";
import { WeService } from "src/app/services/main/we/we.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

@Component({
  selector: 'app-add-return-sell-requisition-we',
  templateUrl: './add-return-sell-requisition-we.component.html',
  styleUrls: ['./add-return-sell-requisition-we.component.css']
})
export class AddReturnSellRequisitionWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  returnSellRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    sellerId: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics:any
  sellers:any
  colors:any = []
  colorCategories:any
  disabledColorCategory:any = []
  currentQuantity:any = []
  warehouses:any = []

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Supplier --------------
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
    private _sellerService: BussinessmanService,
    private _returnSellRequisitionWeService: ReturnSellRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _weService: WeService,
    private _warehouseService: WarehouseService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._sellerService.selectSellersSellFromWe().subscribe((response: any) => {
      this.sellers = response
    })
    
    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })
  }

  // Initialize Form Builder
  initItem(data:any, index:number) {
    return new FormGroup({
      index:new FormControl(index),
      weSellRequisitionDetailsId: new FormControl(data.requisition_details_id, [Validators.required]),
      warehouseId: new FormControl("", [Validators.required]),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      consigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      price: new FormControl(String(data.price), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(String(data.price_dollar), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity:new FormControl(data.current_quantity),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      workOrderNumber: new FormControl(data.work_order_number, [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      isDefect: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data:any) {
    let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
    const control = <FormArray>this.returnSellRequisitionForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.returnSellRequisitionForm.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if(element.index == index) {
        control.removeAt(i)
      }
    }
   }

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

  //  Warehouse
  selectWarehouse(event: { itemData: any; }, row: FormGroup) {
    if (!this.warehouses.includes(event.itemData)) {
      row.controls['warehouseId'].setValue("")
    }
  }
   
  //  Seller
  selectSeller(event: { itemData: any; }) {
    // console.log("0000000000");

    if (!this.sellers.includes(event.itemData)) {
      this.returnSellRequisitionForm.controls.sellerId.setValue(null)
      // this.returnSellRequisitionForm.controls.items = new FormArray([])
      // this.returnSellRequisitionForm.setControl('items', new FormArray([]))
      const formGroup = <FormGroup>this.returnSellRequisitionForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));

      this.currentStockReport.dyersAndRequisitionsFabrics = []
      this.currentStockReport.isShowPrice = false
      this.currentStockReport.listen();
    }
    else {
      // console.log("111111");
      
      this._weService.selectSoldedBySellerForReturnSellWe(event.itemData.id).subscribe((response: any) => {
        this.fabrics = response
        this.currentStockReport.dyersAndRequisitionsFabrics = response
        this.currentStockReport.isShowPrice = false
        this.currentStockReport.isShowStoragePlace = true
        this.currentStockReport.isShowUpdateStoragePlace = true
        this.currentStockReport.isShowDyeingServices = true
        
        this.currentStockReport.listen();
      })
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

  selectIsDefect(event: any, row: FormGroup) {
    if (event.checked) {
      row.controls['isDefect'].setValue('1');
    }
    else {
      row.controls['isDefect'].setValue('0');
    }
  }

  async onReturnSellRequisition(){
    this.returnSellRequisitionForm.markAllAsTouched();
    if (this.returnSellRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.returnSellRequisitionForm, 'items', 
      ['index', 'dyedFabricName', 'dyedFabricCode',
    'colorCategoryName', 'colorName', 'colorCode', 'validQuantity'])
    
    this._constantsService.spinner.show()
      this._returnSellRequisitionWeService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg == "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[92]}/details`, {id: response.id});
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
      }
      });
    }    
   }


}
