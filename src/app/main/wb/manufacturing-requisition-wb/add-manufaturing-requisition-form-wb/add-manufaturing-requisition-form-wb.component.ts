import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Angular Material Table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

// Call Service
import { WbService } from "src/app/services/main/wb/wb.service";
import { WbManufacturingInputService } from "src/app/services/main/wb/wb-manufacturing-input.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { ActivatedRoute } from '@angular/router';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

@Component({
  selector: 'app-add-manufaturing-requisition-form-wb',
  templateUrl: './add-manufaturing-requisition-form-wb.component.html',
  styleUrls: ['./add-manufaturing-requisition-form-wb.component.css']
})
export class AddManufaturingRequisitionFormWbComponent implements OnInit {

  inputesQuantity = 0

  @Input() parentData: any | undefined;
  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];
  selection = new SelectionModel(true);

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addManufacturingRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    wbManufacturingOutputId: new FormControl(null, [Validators.required]),
    fabricId: new FormControl(null, [Validators.required]),
    industryId: new FormControl(null, [Validators.required]),
    isOrder: new FormControl(null, [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns:any
  yarnsDetails:any
  getListYarnPrices:any = []
  listYarnPricesDollar: any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  isShowAdd = true

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('sortColumns', { static: true }) sortColumns!: MatSort;
  displayedColumns: string[] = ['select', 'code', 'name', 'yarn_lot_code', 'consigment_yarn_number', 'quantity'];
  dataSourceSearchTabel: any;

  constructor(
    private _wbService: WbService,
    private _wbManufacturingInputService: WbManufacturingInputService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWbService: ReportWbService,
    public _exportDataService: ExportDataService,
    private route: ActivatedRoute,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.sortColumns.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.getData(this.parentData)
  }

  getData(parentData) {
    this.route.queryParams.subscribe(params => {
      this.addManufacturingRequisitionForm.controls.id.setValue(params['id'])

      this.addManufacturingRequisitionForm.controls['industryId'].setValue(params['industryId'] || parentData[0])
      this.addManufacturingRequisitionForm.controls['fabricId'].setValue(params['fabricId'] || parentData[1])

      this.addManufacturingRequisitionForm.controls['wbManufacturingOutputId'].setValue(parentData[2] || params['wbManufacturingOutputId'])
    this.addManufacturingRequisitionForm.controls['isOrder'].setValue(parentData[5] || params['isOrder'])

      this._wbService.selectQuantityByIndustryByFabricWb(
        params['industryId'] || parentData[0],
        params['fabricId'] || parentData[1]).subscribe((response: any) => {
          this.yarns = response

          this.dataSourceSearchTabel = new MatTableDataSource(this.yarns);
          this.dataSourceSearchTabel.sort = this.sortColumns;
        })
    })
  
    
    
    console.log("parentData[6] :::: ", parentData[6]);
    
    // this._wbService.selectByIndustryByNeededFabricToBeManufacturedNotIncludedYarnsAndLotsWb(parentData[0], parentData[1], {
    //   yarns: parentData[3], yarnLots: parentData[4], consigmentsYarn: parentData[6]}).subscribe((response: any) => {
      
  }

  getSelectedIndex(objectData: any) {
    if (this.selectArrayValues.includes(objectData)) {
      let index = this.selectArrayValues.indexOf(objectData);
      this.selectArrayValues[index] = delete this.selectArrayValues[index];
      this.selectArrayValues.splice(index, 1);

      let indexData = this.yarns.indexOf(objectData)
      this.removeItem(indexData)
    }
    else {
      this.selectArrayValues.push(objectData);
      this.addItem(objectData)
      // Get Prices
      this._reportWbService.selectPriceInWb(objectData.yarn_id, this.addManufacturingRequisitionForm.controls['industryId']['value'] ?? "").subscribe((response: any) => {
        this.yarnsDetails = response
        this.getListYarnPrices[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), parseFloat(this.yarnsDetails[0].latest_price)]
        this.listYarnPricesDollar[this.selectArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'price_dollar', 'quantity'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'price_dollar', 'quantity'), parseFloat(this.yarnsDetails[0].latest_price_dollar)]
      })
    }
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {
    return new FormGroup({
      index: new FormControl(index),
      yarnId: new FormControl(data.yarn_id, [Validators.required]),
      yarnName: new FormControl(data.yarn_name),
      yarnCode: new FormControl(data.yarn_code),
      yarnLotId: new FormControl(data.yarn_lot_id, [Validators.required]),
      yarnLotCode: new FormControl(data.yarn_lot_code),
      consigmentYarnId: new FormControl(data.consigment_yarn_id, [Validators.required]),
      consigmentYarnNumber: new FormControl(data.consigment_yarn_number),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      wastRatio: new FormControl(data.wast_ratio, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      quantityWithWaste: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }
  
  addItem(data: any) {
    let index = this.yarns.indexOf(data)
    const control = <FormArray>this.addManufacturingRequisitionForm.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.addManufacturingRequisitionForm.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if (element.index == index) {
        control.removeAt(i)
        // Remove index Price
        this.getListYarnPrices.splice(i, 1)
        this.listYarnPricesDollar.splice(i, 1)
      }
    }
    
   }

  validate(row: FormGroup, index) {
    // (1) 17-1-2022
    // let quantityWithWaste = parseFloat((((parseFloat(row.controls['quantity'].value) * parseFloat(row.controls['wastRatio'].value)) / 100) + parseFloat(row.controls['quantity'].value)).toFixed(2)) || ''
    let quantityWithWaste = ((parseFloat(row.controls['quantity'].value) * parseFloat(row.controls['wastRatio'].value)) / 100) + parseFloat(row.controls['quantity'].value) || 0
    if(quantityWithWaste  > parseFloat(row.controls['validQuantity'].value)) {
      row.controls['quantity'].setErrors({'incorrect': true});
      row.controls['quantity'].markAsTouched()
      this.inputesQuantity = 0
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
      row.controls['quantity'].updateValueAndValidity()
      // this.inputesQuantity = (this.sumInputQuantity()).toFixed()
      row.controls['quantityWithWaste'].setValue(String(quantityWithWaste));
    }
  }

  getTotalPriceXQuantityWithWast() {
    return this.addManufacturingRequisitionForm.controls.items.value.map(function(a) {return (parseFloat(a['quantity']) * parseFloat(a['price'])) + (((parseFloat(a['price']) * parseFloat(a['quantity'])) * parseFloat(a['wastRatio'])) / 100)}).reduce((acc, value) => acc + value, 0);
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      row.controls['price'].setValue("0")
    }
  }

  async onAddRequisition(){
    this.isShowAdd = false

    this.addManufacturingRequisitionForm.markAllAsTouched();
    if (this.addManufacturingRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addManufacturingRequisitionForm, 'items',
      ['index', 'yarnName', 'yarnCode', 'yarnLotCode', 'consigmentYarnNumber', 'validQuantity'])
    this._constantsService.spinner.show()
      this._wbManufacturingInputService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg == "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.reloadPageWithDynamicParams({ 
          id: response.id, 
          industryId: this.addManufacturingRequisitionForm.controls['industryId'].value,
          fabricId: this.addManufacturingRequisitionForm.controls['fabricId'].value,
          wbManufacturingOutputId: this.addManufacturingRequisitionForm.controls['wbManufacturingOutputId'].value,
          isOrder: this.addManufacturingRequisitionForm.controls['isOrder'].value,
        });
       }
       else{
        if (response.msg == "quantity is wrong") {
          this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
        }
        else if (response.msg == "duplicated data") {
           this._constantsService.duplicateDataErrorMessage()
         }
         else{
           this._constantsService.userErrorMessage()
         }
         this.isShowAdd = true
       }
      });
    } else {
      console.log(this.addManufacturingRequisitionForm.errors);
      this.isShowAdd = true
    }
   }

  //  Get Average Inputes Price
  notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      n = 1
    }
    return n;
  }

  // Get Avg Inputes Price
  getTotalAmountQuantityInput(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice(yarns){
    return this.getInputAmount(yarns) / this.notZero(this.getTotalAmountQuantityInput(yarns))
  }

  // AVG Price
  getOutputAmount(yarns) {
    return yarns.details.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount(yarns) {
    return this.getInputAmount(yarns) - this.getOutputAmount(yarns)
  }

  getAvgPrice(yarns) {
    return this.getItemAmount(yarns) / this.notZero(yarns.current_quantity)
 }
}
