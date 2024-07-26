import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { ReturnSellRequisitionDetailsWeService } from "src/app/services/main/we/return-sell-requisition-details-we.service";
import { WeService } from "src/app/services/main/we/we.service";
import { GradeItemService } from "src/app/services/main/grade-item.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ActivatedRoute } from '@angular/router';

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-return-sell-requisition-form-we',
  templateUrl: './add-return-sell-requisition-form-we.component.html',
  styleUrls: ['./add-return-sell-requisition-form-we.component.css']
})
export class AddReturnSellRequisitionFormWeComponent implements OnInit {

  
  // Child Components
  @ViewChild('currentStockReport')currentStockReport!:CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  returnSellRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics:any
  colors:any = []
  colorCategories:any
  disabledColorCategory:any = []
  currentQuantity:any = []
  gradeItems:any = []
  @Input() selectedData: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Grade Item --------------
  // maps the appropriate column to fields property
  public fieldsGradeItem: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textGradeItem: string = "نوع الدرجة"

  public onFilteringGradeItem(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.gradeItems, query);
  }

  constructor(
    private _returnSellRequisitionDetailsWeService: ReturnSellRequisitionDetailsWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private route: ActivatedRoute,
    private _weService: WeService,
    private _gradeItemService: GradeItemService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.returnSellRequisitionForm.controls['id'].setValue(params['id'])
    })

    this._weService.selectSoldedBySellerForReturnSellWe(this.selectedData[0].seller_id).subscribe((response: any) => {
      this.fabrics = response
      this.currentStockReport.dyersAndRequisitionsFabrics = response
      this.currentStockReport.listen();
    })
    
    this._gradeItemService.selectAll().subscribe((response: any) => {
      this.gradeItems = response
    })

  }

  // Initialize Form Builder
  initItem(data:any, index:number) {
    return new FormGroup({
      index:new FormControl(index),
      weSellRequisitionDetailsId: new FormControl(data.requisition_details_id, [Validators.required]),
      warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
      warehouseName: new FormControl(data.warehouse_name),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryId: new FormControl(data.color_category_id, [Validators.required]),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      consigmentDyeingId: new FormControl(data.consigment_dyeing_id, [Validators.required]),
      gradeItemId: new FormControl(data.grade_item_id, [Validators.required]),
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

  //  Grade item
  selectGradeItem(event: { itemData: any; }, row: FormGroup) {
    if (!this.gradeItems.includes(event.itemData)) {
      row.controls['gradeItemId'].setValue("")
    }
  }

  async onReturnSellRequisition(){
    this.returnSellRequisitionForm.markAllAsTouched();
    if (this.returnSellRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.returnSellRequisitionForm, 'items', 
      ['index', 'warehouseName', 'dyedFabricName', 'dyedFabricCode',
    'colorCategoryName', 'colorName', 'validQuantity'])
    
    this._constantsService.spinner.show()
      this._returnSellRequisitionDetailsWeService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg == "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.reloadPageWithParams(response.id);
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
