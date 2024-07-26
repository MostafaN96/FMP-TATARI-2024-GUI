import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SellRequisitionDetalisWeService } from "src/app/services/main/we/sell-requisition-detalis-we.service";
import { WeService } from "src/app/services/main/we/we.service";
import { DeliveryCarService } from "src/app/services/main/delivery-car.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Child Components
import { CurrentStockReportWeComponent } from "../../reports/current-stock-report-we/current-stock-report-we.component";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-direct-sell-we',
  templateUrl: './confirm-direct-sell-we.component.html',
  styleUrls: ['./confirm-direct-sell-we.component.css']
})
export class ConfirmDirectSellWeComponent implements OnInit {

  // Child Components
  @ViewChild('currentStockReport') currentStockReport!: CurrentStockReportWeComponent;

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  selectArrayValues: any[] = [];

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  confirmSellRequisitionFormWe = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    sellerId: new FormControl('', [Validators.required]),
    deliveryCarId: new FormControl(null),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  sellers: any
  deliveryCars: any
  requisitionId!: string;
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Seller --------------
  // maps the appropriate column to fields property
  public fieldsSeller: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSeller: string = "العميل"

  public onFilteringSeller(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.sellers, query);
  }

  // --------------- Delivery Car --------------
  // maps the appropriate column to fields property
  public fieldsDeliveryCars: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDeliveryCars: string = "اسم السائق"

  public onFilteringDeliveryCars(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('drivers_name', 'contains', e.text);
    predicate = predicate.or('plate_number', 'contains', e.text);
    predicate = predicate.or('national_id', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.deliveryCars, query);
  }

  constructor(
    private _sellerService: BussinessmanService,
    private _sellRequisitionDetalisWeService: SellRequisitionDetalisWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _weService: WeService,
    public _exportDataService: ExportDataService,
    private _deliveryCarService: DeliveryCarService,
    private route: ActivatedRoute,
    private router: Router,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()

    this.route.queryParams
      .subscribe(params => {
        this.confirmSellRequisitionFormWe.controls['id'].setValue(params['id'])
        this.requisitionId = params['id']
      })
  }

  getData() {

    this.route.queryParams
      .subscribe(params => {
        this._weService.selectStoreForDirectSellWe(params['id']).subscribe((response: any) => {
          this.currentStockReport.dyersAndRequisitionsFabrics = response
          this.currentStockReport.isShowPrice = true
          this.currentStockReport.isShowValue = false
          this.currentStockReport.isShowSoldedQuantity = true
          this.currentStockReport.isShowStoragePlace = true
          this.currentStockReport.isShowUpdateStoragePlace = true
          this.currentStockReport.isShowDyeingServices = false
          this.currentStockReport.listen();

          this.confirmSellRequisitionFormWe.controls.sellerId.setValue(response[0]?.direct_bussiness_man_id)
          this.confirmSellRequisitionFormWe.controls.deliveryCarId.setValue(response[0]?.direct_delivery_car_id)
        })
      })

      this._sellerService.selectSeller().subscribe((response: any) => {
        this.sellers = response
      })

    this._deliveryCarService.selectAll().subscribe((response: any) => {
      this.deliveryCars = response
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

  selectAll() {
    this.currentStockReport.dyersAndRequisitionsFabrics.forEach(dyersAndRequisitionsFabrics => {
      this.getSelectedIndex(dyersAndRequisitionsFabrics)
    })
  }

  isAllSelected() {
    const numSelected = this.currentStockReport.selection.selected.length;
    const numRows = this.currentStockReport.dyersAndRequisitionsFabrics.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.currentStockReport.selection.clear() :
      this.currentStockReport.dyersAndRequisitionsFabrics.forEach((row: any) => this.currentStockReport.selection.select(row));
  }

  // Initialize Form Builder
  initItem(data: any, index: number) {
    return new FormGroup({
      index: new FormControl(index),
      weSellRequisitionDirectDetailsId: new FormControl(data.we_sell_requisition_direct_details_id, [Validators.required]),
      supplierName: new FormControl(data.supplier_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      weId: new FormControl(data.we_id, [Validators.required]),
      warehouseId: new FormControl(data.warehouse_id, [Validators.required]),
      warehouseName: new FormControl(data.warehouse_name),
      requisitionId: new FormControl(data.requisition_id, [Validators.required]),
      dyedFabricName: new FormControl(data.dyed_fabric_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      dyedFabricId: new FormControl(data.dyed_fabric_id, [Validators.required]),
      dyedFabricCode: new FormControl(data.dyed_fabric_code),
      colorCategoryName: new FormControl(data.color_category_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorId: new FormControl(data.color_id, [Validators.required]),
      colorName: new FormControl(data.color_name, [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      colorCode: new FormControl(data.color_code),
      price: new FormControl(data.direct_price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(data.direct_price, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl((data.direct_quantity >= data.current_quantity) ? String(data.current_quantity) : String(data.direct_quantity), [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(data.current_quantity),
      numberFabricPieces: new FormControl(String(data.direct_fabric_piece), [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      workOrderNumber: new FormControl(data.work_order_number, [Validators.pattern(this.patterns.validator_pattern.number)]),
      document: new FormControl(data.direct_document, [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl(data.direct_statement, [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(data: any) {
    let index = this.currentStockReport.dyersAndRequisitionsFabrics.indexOf(data)
    const control = <FormArray>this.confirmSellRequisitionFormWe.get('items');
    control.push(this.initItem(data, index));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.confirmSellRequisitionFormWe.get('items');
    for (let i = 0; i < control.value.length; i++) {
      const element = control.value[i];
      if (element.index == index) {
        control.removeAt(i)
      }
    }
  }


  validate(row: FormGroup) {
    if (parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) {
      row.controls['quantity'].setErrors({ 'incorrect': true });
    }
    else {
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  //  Seller
  selectSeller(event: { itemData: any; }) {
    if (!this.sellers.includes(event.itemData)) {
      this.confirmSellRequisitionFormWe.controls.sellerId.setValue(null)
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

  async onConfirmSellRequisition() {
    this.isShowAdd = false

    this.confirmSellRequisitionFormWe.markAllAsTouched();
    if (this.confirmSellRequisitionFormWe.valid) {
      if (this._quantityOccurrencesValidationService.validateQuantitySellDirectWe(
        this.confirmSellRequisitionFormWe.controls.items.value, 
        this.confirmSellRequisitionFormWe.controls.items.value, 
        'warehouseId', 'warehouseId', 
        'dyedFabricId', 'dyedFabricId', 
        'colorCode', 'colorCode', 
        'workOrderNumber', 'workOrderNumber', 
        'quantity', 'dyedFabricName', 'validQuantity')) {

      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.confirmSellRequisitionFormWe, 'items',
        ['index', 'supplierName', 'warehouseName', 'dyedFabricName', 'dyedFabricCode',
          'colorCategoryName', 'colorName', 'colorCode', 'supplierName', 'validQuantity'])

      this._constantsService.spinner.show()
      this._sellRequisitionDetalisWeService.confirm(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this.router.navigate(['/dashboard//show-all-sell-requisition-we/details'], { queryParams: { id: this.requisitionId } });
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
          } else {
            this.isShowAdd = true
          } 

  }
}
