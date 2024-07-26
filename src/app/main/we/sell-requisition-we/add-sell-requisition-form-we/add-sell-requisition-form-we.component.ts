import { Component, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SellRequisitionDetalisWeService } from "src/app/services/main/we/sell-requisition-detalis-we.service";
import { WeService } from "src/app/services/main/we/we.service";

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sell-requisition-form-we',
  templateUrl: './add-sell-requisition-form-we.component.html',
  styleUrls: ['./add-sell-requisition-form-we.component.css']
})
export class AddSellRequisitionFormWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];
  isShowAdd = true

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
sellRequisitionFormWe = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  items: new FormArray([]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
  ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
});

  constructor(
    private _sellRequisitionDetalisWeService: SellRequisitionDetalisWeService,
    private _sessionManagerService: SessionManagerService,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    private _weService: WeService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
   }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.sellRequisitionFormWe.controls['id'].setValue(params['id'])
    })

    this._weService.selectStoreWe().subscribe((response: any) => {
      this.currentStockReport.dyersAndRequisitionsFabrics = response
      this.currentStockReport.listen();
    })
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
  
  // Initialize Form Builder
  initItem(data:any, index:number) {
    return new FormGroup({
      index:new FormControl(index),
      supplierName: new FormControl(data.supplier_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      weId: new FormControl(data.we_id, [Validators.required]),
      warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
      warehouseName: new FormControl(data.warehouse_name),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      gradeItemName: new FormControl(data.grade_item_name, [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity:new FormControl(data.current_quantity),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      workOrderNumber: new FormControl(data.work_order_number, [Validators.pattern(this.patterns.validator_pattern.number)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }
  
  addItem(data:any) {
    let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
    const control = <FormArray>this.sellRequisitionFormWe.get('items');
    control.push(this.initItem(data, index));
  }
  
  getItem(form: any) {    
    return form.controls.items.controls;
  }
  
  removeItem(index: number){
    const control = <FormArray>this.sellRequisitionFormWe.get('items');
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

// price
changePrice(type, row: FormGroup) {
  if(type == "priceEG") {
    row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
  } else if (type == "priceDollar") {
    row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
  }
}

  async onSellRequisition(){
    this.isShowAdd = false

    this.sellRequisitionFormWe.markAllAsTouched();
    if (this.sellRequisitionFormWe.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.sellRequisitionFormWe, 'items', 
      ['index', 'supplierName', 'warehouseName', 'dyedFabricName', 'dyedFabricCode',
    'colorCategoryName', 'colorName', 'colorCode', 'supplierName', 'workOrderNumber', 'validQuantity'])
      
      this._constantsService.spinner.show()
      this._sellRequisitionDetalisWeService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.reloadPageWithParams(response.id);
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
