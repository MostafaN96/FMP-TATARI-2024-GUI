import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WbTransportWbWaRequisitionDetailsService } from "src/app/services/main/wb/wb-transport-wb-wa-requisition-details.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WbService } from "src/app/services/main/wb/wb.service";
import { YarnOrderRequisitionWaService } from 'src/app/services/main/wa/yarn-order-requisition-wa.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ActivatedRoute } from '@angular/router';
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-wb-transport-requisition-wb-wa-form-add-details',
  templateUrl: './wb-transport-requisition-wb-wa-form-add-details.component.html',
  styleUrls: ['./wb-transport-requisition-wb-wa-form-add-details.component.css']
})
export class WbTransportRequisitionWbWaFormAddDetailsComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  transportWbWaRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    industryId: new FormControl(null, [Validators.required]),
    warehouseId: new FormControl("", [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  lots: any = []
  yarns:any = []
  consigmentsYarns: any = []
  industries:any = []
  fabrics:any = []
  currentQuantity:any = []
  yarnsDetails:any
  yarnOrder: any = []
  getListYarnPrices:any = []
  listYarnPrices:any = []
  listYarnPricesDollar:any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  @Input() selectedData: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الخيط"

  public onFilteringYarnName (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.yarns[index], query);
  }

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text:"code"};
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.lots[index], query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.consigmentsYarns[index], query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsYarnOrder: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarnOrder: string = "اسم الطلبية"


  public onFilteringYarnOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarnOrder, query);
  }

  constructor(
    private _wbService: WbService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _wbTransportWbWaRequisitionDetailsService: WbTransportWbWaRequisitionDetailsService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWbService: ReportWbService,
    private _fabricService: FabricService,
    private route: ActivatedRoute,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.transportWbWaRequisitionForm.controls.id.setValue(params['id'])
      this.transportWbWaRequisitionForm.controls.warehouseId.setValue(this.selectedData[0]['warehouse_id'])
      this.transportWbWaRequisitionForm.controls.industryId.setValue(this.selectedData[0]['industry_id'])
    })

    
    this._yarnOrderRequisitionWaService.selectByIndustryWb(this.selectedData[0]['industry_id']).subscribe((response: any) => {
      this.yarnOrder = response
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      ordersRequisitionsId: new FormControl("", [Validators.required]),
      yarnOrderId: new FormControl("", [Validators.required]),
      yarnId: new FormControl("", [Validators.required]),
      yarnCode: new FormControl(""),
      yarnName: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.transportWbWaRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.transportWbWaRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
   }

  //  Yarn Order
  selectYarnOrder(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarnOrder.indexOf(event.itemData)

    if (this.yarnOrder[indexData] !== event.itemData) {
      row.controls['yarnOrderId'].setValue("")
      row.controls['yarnId'].setValue(null)
      row.controls['yarnCode'].setValue(null)
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)

      this._yarnService.selectByIndustryWb(
        this.transportWbWaRequisitionForm.controls['industryId'].value!, 
        event.itemData.id
      ).subscribe((response: any) => {
        this.yarns[index] = response
      })

    }
  }
  
  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns[index].indexOf(event.itemData)

    if (this.yarns[index][indexData] !== event.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['yarnLotId'].setValue("")
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByIndustryByYarnWb(
        this.transportWbWaRequisitionForm.controls['industryId'].value!,
        event.itemData.id,
        row.controls['yarnOrderId'].value!
        ).subscribe((response: any) => {
        this.lots[index] = response

        if(this.lots[index][0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[index][0].id)
          this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
            this.transportWbWaRequisitionForm.controls['industryId'].value!,
            event.itemData.id,
            this.lots[index][0].id,
            row.controls['yarnOrderId'].value!,
            index
          )
        }
      })

      // Get Prices
      this._reportWbService.selectPriceInWb(event.itemData.id, this.transportWbWaRequisitionForm.controls['industryId'].value!).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails) , this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar]
        row.controls['price'].setValue(String(this.yarnsDetails[0].latest_price))
        row.controls['priceDollar'].setValue(String(this.yarnsDetails[0].latest_price_dollar))
      })
    }
    this.validate(row, index)    
  }

  validate(row: FormGroup, index) {
    if(parseFloat(row.controls['quantity'].value)  > parseFloat(this.currentQuantity[index])) {
      row.controls['quantity'].setErrors({'incorrect': true});
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots[index].indexOf(event.itemData)
    if (this.lots[index][indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this.getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
        this.transportWbWaRequisitionForm.controls['industryId'].value!,
        row.controls['yarnId'].value!,
        event.itemData.id, 
        row.controls['yarnOrderId'].value!,
        index
      )
    }
  }

  getSelectConsigmentYarnQuantityByYarnByIndustryByLotWb(
    industryId: string, 
    yarnId: string, 
    lotId:string, 
    yarnOrderId:string, 
    index) {
    this._wbService.selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
      yarnId,
      industryId, 
      lotId,
      yarnOrderId
      ).subscribe((response: any) => {
        this.consigmentsYarns[index] = response
      })
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns[index].indexOf(event.itemData)
    if (this.consigmentsYarns[index][indexData] !== event.itemData) {
      row.controls['consigmentYarnId'].setValue(null)
      row.controls['validQuantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
    }    
  }
  // End Consigment Yarn Autocomplete Section

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onTransportWaWbRequisition(){
    this.transportWbWaRequisitionForm.markAllAsTouched();
    if (this.transportWbWaRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.transportWbWaRequisitionForm.controls.items.value, this.transportWbWaRequisitionForm.controls.items.value,
        'consigmentYarnId', 'consigmentYarnId',
        'yarnLotId', 'yarnLotId',
        'yarnId', 'yarnId',
        'quantity', 'yarnName', 'validQuantity')) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.transportWbWaRequisitionForm, 'items',
        ['yarnCode', 'yarnName', 'validQuantity'])
    this._constantsService.spinner.show()
      this._wbTransportWbWaRequisitionDetailsService.create(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg == "data inserted") {
        this._constantsService.successAddMessage()
        this._sharedComponentService.reloadPageWithDynamicParams({ id: this.selectedData[0]['requisition_id']});
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
      }
      });
    }    
  }
   }
}
