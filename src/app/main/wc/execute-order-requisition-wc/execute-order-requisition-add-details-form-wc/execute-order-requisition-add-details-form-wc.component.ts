import { Component, OnInit, ViewChild } from '@angular/core';

// PrimeNG Table
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterService } from 'primeng/api';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricOrderRequisitionWcService } from "src/app/services/main/wc/fabric-order-requisition-wc.service";
import { ExecuteOrderRequisitionDetailsWcService } from "src/app/services/main/wc/execute-order-requisition-details-wc.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-execute-order-requisition-add-details-form-wc',
  templateUrl: './execute-order-requisition-add-details-form-wc.component.html',
  styleUrls: ['./execute-order-requisition-add-details-form-wc.component.css']
})
export class ExecuteOrderRequisitionAddDetailsFormWcComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt2') dt2: Table | undefined;
  loadingDyeingFabrics: boolean = true;
  selectedStoredFabricsArrayValues: any[] = [];
  selectedFabricCodes: any[] = []
  selectedFabricNames: any[] = []
  selectedConsigmentYarn: any[] = []
  selectedWarehouses: any[] = []
  selectedYarnLotCode: any[] = []
  selectedTypeOfRequisition: any[] = []

  //////////////////////////////////// PrimeNG /////////////////////////////////
  @ViewChild('dt1') dt1: Table | undefined;
  loading: boolean = true;
  selectedCodes: any[] = []

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    warehouseId: new FormControl(this._constantsService.DEFAULT_WA_WAREHOUSE_ID, [Validators.required]),
    wcFabricOrderRequisitionId: new FormControl("", [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionDetails: any = []
  orderedFabrics: any = []
  storedWcFabrics: any = []
  fabricOrderRequisitionId = ""
  fabricOrderRequisitionDetailsId = ""
  fabricOrderCurrentQuantity = "0"
  fabricOrderPrice = "0"
  fabricOrderPriceDollar = "0"

  fabricsPricesDetails: any[] = [];
  getListFabricPrices: any = []
  listFabricPricesDollar: any = []
  groupPrices: any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]
  selectedStoredFabricsMap = new Map()
  filter = "";
  selectedStoredFabrics: any = {}
  selectedOrderedFabric: any = {}
  isShowAdd = true


  constructor(
    private _fabricService: FabricService,
    private _fabricOrderRequisitionWcService: FabricOrderRequisitionWcService,
    private _executeOrderRequisitionDetailsWcService: ExecuteOrderRequisitionDetailsWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _exportDataService: ExportDataService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private route: ActivatedRoute,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()

    this.customFilterForFabricCodes();
    this.customFilterForFabricNames();

    this.customFilterForWarehouse();
    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentManufacturing();
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._executeOrderRequisitionDetailsWcService.selectOne(params['id']).subscribe((response: any) => {
          this.requisitionDetails = response
          
          this.addRequisitionForm.controls['id'].setValue(this.requisitionDetails[0]?.requisition_id)
          this.addRequisitionForm.controls['wcFabricOrderRequisitionId'].setValue(this.requisitionDetails[0]?.wc_fabric_order_requisition_id)
          this.addRequisitionForm.controls['warehouseId'].setValue(this.requisitionDetails[0]?.warehouse_id)

          this._fabricOrderRequisitionWcService.selectFabricsOrderRequisition(this.requisitionDetails[0]?.wc_fabric_order_requisition_id).subscribe((response: any) => {
            this.orderedFabrics = response
    
            // PrimeNG Table
            this.primengConfig.ripple = true;
            this.loadingDyeingFabrics = false;
          })
        })
      })

  }


  selectRowFabric(objectData: any) {
    if (objectData) {
      this._fabricService.selectStoredFabricsByFabricIdWc(objectData.fabric_id).subscribe((response: any) => {
        this.storedWcFabrics = response
        this.fabricOrderRequisitionId = objectData.requisition_id
        this.fabricOrderRequisitionDetailsId = objectData.id
        this.fabricOrderCurrentQuantity = objectData.current_quantity
        // PrimeNG Table
        this.loading = false;
      })
    } else {
      this.storedWcFabrics = []
      this.fabricOrderRequisitionId = ""
      this.fabricOrderRequisitionDetailsId = ""
      this.fabricOrderCurrentQuantity = "0"
      this.fabricOrderPrice = "0"
      this.fabricOrderPriceDollar = "0"
    }
  }

  getSelectedStoredFabrics(selectedStoredFabrics: any) {

    if (this.selectedStoredFabricsArrayValues.filter(objOfArr =>
      objOfArr.requisition_details_id == selectedStoredFabrics.requisition_details_id
    ).length < 1) {
      this.selectedStoredFabricsMap.set(selectedStoredFabrics, selectedStoredFabrics?.current_quantity)


      this.selectedStoredFabricsArrayValues.push(selectedStoredFabrics);
      this.addItem(selectedStoredFabrics)
      // Get Prices
      this._reportWcService.selectPriceByFabricByConsigmentManufacturingInWc(selectedStoredFabrics.id, selectedStoredFabrics.consigment_manufacturing_id).subscribe((response: any) => {
        this.fabricsPricesDetails = response

        this.getListFabricPrices[this.selectedStoredFabricsArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.fabricsPricesDetails), this._sharedComponentService.getAvgInputesPrice(this.fabricsPricesDetails), parseFloat(this.fabricsPricesDetails[0].latest_price)]
        this.listFabricPricesDollar[this.selectedStoredFabricsArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.fabricsPricesDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.fabricsPricesDetails, 'quantity', 'price_dollar'), parseFloat(this.fabricsPricesDetails[0].latest_price_dollar)]
        this.fabricOrderPrice = this.fabricsPricesDetails[0].latest_price
        this.fabricOrderPriceDollar = this.fabricsPricesDetails[0].latest_price_dollar
      })
    }

  }

  // Initialize Form Builder
  initItem(selectedStoredFabrics: any) {
    return new FormGroup({
      typeOfRequisition: new FormControl(selectedStoredFabrics.type_of_requisition, [Validators.required]),
      typeOfRequisitionTrans: new FormControl(selectedStoredFabrics.type_of_requisition_trans, [Validators.required]),
      wcRequisitionDetailsId: new FormControl(selectedStoredFabrics.requisition_details_id, [Validators.required]),
      wcFabricOrderRequisitionId: new FormControl(this.fabricOrderRequisitionId, [Validators.required]),
      wcFabricOrderRequisitionDetailsId: new FormControl(this.fabricOrderRequisitionDetailsId, [Validators.required]),
      fabricId: new FormControl(selectedStoredFabrics.id, [Validators.required]),
      fabricCode: new FormControl(selectedStoredFabrics.code),
      fabricName: new FormControl(selectedStoredFabrics.name),
      fromWarehouseId: new FormControl(selectedStoredFabrics.warehouse_id, [Validators.required]),
      fromConsigmentManufacturingId: new FormControl(selectedStoredFabrics.consigment_manufacturing_id, [Validators.required]),
      consigmentManufacturingNumber: new FormControl(selectedStoredFabrics.consigment_manufacturing_number, [Validators.required]),
      newConsigmentManufacturingNumber: new FormControl(this.orderedFabrics[0].order_name, [Validators.required]),
      wcId: new FormControl(selectedStoredFabrics.wc_id, [Validators.required]),
      price: new FormControl(this.fabricOrderPrice, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl(this.fabricOrderPriceDollar, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl((this.fabricOrderCurrentQuantity <= selectedStoredFabrics.current_quantity) ? this.fabricOrderCurrentQuantity : selectedStoredFabrics.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(selectedStoredFabrics.current_quantity),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      note: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(selectedStoredFabrics: any) {
    this.selectedStoredFabricsArrayValues.indexOf(selectedStoredFabrics)
    const control = <FormArray>this.addRequisitionForm.get('items');
    let row = this.initItem(selectedStoredFabrics)
    control.push(row);
    this.goalQuantityOfOrder()
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number, objectData: any) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.getListFabricPrices.splice(index, 1)
    this.listFabricPricesDollar.splice(index, 1)
    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.selectedStoredFabricsMap, index, objectData, this.selectedStoredFabricsArrayValues)
  }




  validate(row: FormGroup) {

    if (parseFloat(row.controls['quantity'].value) > parseFloat(row.controls['validQuantity'].value)) {
      console.log("if");
      row.controls['quantity'].setErrors({ 'incorrect': true });
      // row.controls['quantity'].updateValueAndValidity()
      this.addRequisitionForm.markAllAsTouched();
    }
    else {
      console.log("else");
      row.controls['quantity'].setErrors({ 'incorrect': null });
      row.controls['quantity'].updateValueAndValidity()
      this.goalQuantityOfOrder()
    }
  }

  goalQuantityOfOrder() {
    const control = <FormArray>this.addRequisitionForm.get('items');

    for (let i = 0; i < this.orderedFabrics.length; i++) {
      const orderedYarn = this.orderedFabrics[i];
      orderedYarn.added_quantity = 0

      for (let j = 0; j < control.controls.length; j++) {
        const controls = control.controls[j];

        if (orderedYarn.fabric_id == controls['controls']['fabricId'].value) {
          orderedYarn.added_quantity = parseFloat(orderedYarn.added_quantity + parseFloat(controls['controls']['quantity'].value))
        }
      }

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

  async onAddRequisition() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid && this.addRequisitionForm.get('items')!['controls'].length > 0) {
      if (
        this._quantityOccurrencesValidationService.validateQuantityDynamic(
          this.selectedStoredFabricsMap, this.addRequisitionForm.controls['items'].value,
          'id', 'fabricId',
          'consigment_manufacturing_id', 'consigmentManufacturingId',
          'requisition_details_id', 'wcRequisitionDetailsId',
          'quantity', 'name')) {

        this._constantsService.spinner.show()
        this._executeOrderRequisitionDetailsWcService.add(this.addRequisitionForm.value).subscribe(response => {
          this._constantsService.spinner.hide();
          if (response.msg == "data inserted") {
            this._constantsService.successAddMessage()
            this._sharedComponentService.reloadPageWithDynamicParams({ id: this.requisitionDetails[0]['requisition_id'] });

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
    } else {
      this.isShowAdd = true
    }
  }


  ///////////////////// ----------- Start Search Tabel ----------- /////////////////////
  customFilterForWarehouse() {
    const customFilterName = "warehouse-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedWarehouses

      if (this.selectedWarehouses[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].warehouse_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForConsigmentManufacturing() {
    const customFilterName = "consigment-manufacturing-number-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedConsigmentYarn

      if (this.selectedConsigmentYarn[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].consigment_manufacturing_number) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  customFilterForTypeOfRequisition() {
    const customFilterName = "type-of-requisition-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedTypeOfRequisition

      if (this.selectedTypeOfRequisition[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].type_of_requisition_trans) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }


  clear(table: Table) {
    table.clear();
    table.reset();
    this.selectedConsigmentYarn = []
    this.selectedWarehouses = []
    this.selectedYarnLotCode = []
    this.selectedTypeOfRequisition = []
    // this.getData();
  }

  onMultiselectedConsigmentYarn(event) {
    this.selectedConsigmentYarn = event
    this.dt2?._filter()
  }

  onMultiselectedWarehouses(event) {
    this.selectedWarehouses = event
    this.dt1?._filter()
  }

  onMultiselectedYarnLotCodes(event) {
    this.selectedYarnLotCode = event
    this.dt1?._filter()
  }

  onMultiselectedTypeOfRequisition(event) {
    this.selectedTypeOfRequisition = event
    this.dt1?._filter()
  }

  customFilterForFabricCodes() {
    const customFilterName = "fabric-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricCodes

      if (this.selectedFabricCodes[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].fabric_code) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }


  customFilterForFabricNames() {
    const customFilterName = "fabric-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedFabricNames

      if (this.selectedFabricNames[0] != null) {
        if (filter === undefined || filter === null || !filter.length) {
          return true;
        }
        if (value === undefined || value === null || value.length == 0) {
          return false;
        }
        if (filter.length > 0) {
          // let count = 0

          // for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < filter.length; j++) {
            if (value == filter[j].fabric_name) {
              // count++
              // if (count == filter.length) {
              return true;
              // }
            }
          }
          // }
        }
        return false;
      }
      else {
        return true;
      }
    });
  }

  clearOrderFabrics(table: Table) {
    table.clear();
    table.reset();
    this.selectedFabricCodes = []
    this.selectedFabricNames = []
  }

  onMultiselectedFabricCodes(event) {
    this.selectedFabricCodes = event
    this.dt2?._filter()
  }

  onMultiselectedFabricNames(event) {
    this.selectedFabricNames = event
    this.dt2?._filter()
  }


}


