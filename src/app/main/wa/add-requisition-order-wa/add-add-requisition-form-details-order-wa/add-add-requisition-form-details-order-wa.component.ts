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
import { YarnOrderRequisitionWaService } from "src/app/services/main/wa/yarn-order-requisition-wa.service";
import { ExecuteOrderRequisitionDetailsWaService } from "src/app/services/main/wa/execute-order-requisition-details-wa.service";
import { YarnService } from "src/app/services/main/yarn.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-add-requisition-form-details-order-wa',
  templateUrl: './add-add-requisition-form-details-order-wa.component.html',
  styleUrls: ['./add-add-requisition-form-details-order-wa.component.css']
})
export class AddAddRequisitionFormDetailsOrderWaComponent implements OnInit {

  //////////////////////////////////// Tabel Angular Material /////////////////////////////////
  @ViewChild('dt2') dt2: Table | undefined;
  loadingDyeingFabrics: boolean = true;
  selectedStoredYarnsArrayValues: any[] = [];
  selectedYarnCodes: any[] = []
  selectedYarnNames: any[] = []
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
    waYarnOrderRequisitionId: new FormControl("", [Validators.required]),
    items: new FormArray([]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  requisitionDetails: any = []
  orderedYarns: any = []
  storedWaYarns: any = []
  yarnOrderRequisitionId = ""
  yarnOrderRequisitionDetailsId = ""
  yarnOrderCurrentQuantity = "0"

  yarnsPricesDetails: any[] = [];
  getListYarnPrices: any = []
  listYarnPricesDollar: any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]
  selectedStoredYarnsMap = new Map()
  filter = "";
  selectedStoredYarns: any = {}
  selectedOrderedFabric: any = {}
  isShowAdd = true


  constructor(
    private _yarnService: YarnService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    private _executeOrderRequisitionDetailsWaService: ExecuteOrderRequisitionDetailsWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWaService: ReportWaService,
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

    this.customFilterForYarnCodes();
    this.customFilterForYarnNames();

    this.customFilterForWarehouse();
    this.customFilterForYarnLotCode();
    this.customFilterForTypeOfRequisition();
    this.customFilterForConsigmentYarn();
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this._executeOrderRequisitionDetailsWaService.selectOne(params['id']).subscribe((response: any) => {
          this.requisitionDetails = response
          
          
          this.addRequisitionForm.controls['id'].setValue(this.requisitionDetails[0]?.requisition_id)
          this.addRequisitionForm.controls['waYarnOrderRequisitionId'].setValue(this.requisitionDetails[0]?.wa_yarn_order_requisition_id)
          this.addRequisitionForm.controls['warehouseId'].setValue(this.requisitionDetails[0]?.warehouse_id)

          this._yarnOrderRequisitionWaService.selectYarnsOfYarnOrderRequisition(this.requisitionDetails[0]?.wa_yarn_order_requisition_id).subscribe((response: any) => {
            this.orderedYarns = response
    
            // PrimeNG Table
            this.primengConfig.ripple = true;
            this.loadingDyeingFabrics = false;
          })
        })
      })

  }


  selectRowYarn(objectData: any) {
    if (objectData) {
      this._yarnService.selectStoredWaYarnsByYarnId(objectData.yarn_id).subscribe((response: any) => {
        this.storedWaYarns = response
        this.yarnOrderRequisitionId = objectData.requisition_id
        this.yarnOrderRequisitionDetailsId = objectData.id
        this.yarnOrderCurrentQuantity = objectData.current_quantity
        // PrimeNG Table
        this.loading = false;
      })
    } else {
      this.storedWaYarns = []
      this.yarnOrderRequisitionId = ""
      this.yarnOrderRequisitionDetailsId = ""
      this.yarnOrderCurrentQuantity = "0"
    }
  }

  getSelectedStoredYarns(selectedStoredYarns: any) {

    if (this.selectedStoredYarnsArrayValues.filter(objOfArr =>
      objOfArr.requisition_details_id == selectedStoredYarns.requisition_details_id
    ).length < 1) {
      this.selectedStoredYarnsMap.set(selectedStoredYarns, selectedStoredYarns?.current_quantity)


      this.selectedStoredYarnsArrayValues.push(selectedStoredYarns);
      this.addItem(selectedStoredYarns)
      // Get Prices
      this._reportWaService.selectPriceWa(selectedStoredYarns.id, selectedStoredYarns.consigment_yarn_id).subscribe((response: any) => {
        this.yarnsPricesDetails = response

        this.getListYarnPrices[this.selectedStoredYarnsArrayValues.length - 1] = [this._sharedComponentService.getAvgPrice(this.yarnsPricesDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsPricesDetails), parseFloat(this.yarnsPricesDetails[0].latest_price), this.yarnsPricesDetails[0].latest_consigment_price]
        this.listYarnPricesDollar[this.selectedStoredYarnsArrayValues.length - 1] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsPricesDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsPricesDetails, 'quantity', 'price_dollar'), this.yarnsPricesDetails[0].latest_price_dollar, this.yarnsPricesDetails[0].latest_consigment_price]
      })
    }

  }

  // Initialize Form Builder
  initItem(selectedStoredYarns: any) {
    return new FormGroup({
      typeOfRequisition: new FormControl(selectedStoredYarns.type_of_requisition, [Validators.required]),
      typeOfRequisitionTrans: new FormControl(selectedStoredYarns.type_of_requisition_trans, [Validators.required]),
      waRequisitionDetailsId: new FormControl(selectedStoredYarns.requisition_details_id, [Validators.required]),
      waYarnOrderRequisitionId: new FormControl(this.yarnOrderRequisitionId, [Validators.required]),
      waYarnOrderRequisitionDetailsId: new FormControl(this.yarnOrderRequisitionDetailsId, [Validators.required]),
      yarnId: new FormControl(selectedStoredYarns.id, [Validators.required]),
      yarnCode: new FormControl(selectedStoredYarns.code),
      yarnName: new FormControl(selectedStoredYarns.name),
      fromWarehouseId: new FormControl(selectedStoredYarns.warehouse_id, [Validators.required]),
      fromConsigmentYarnId: new FormControl(selectedStoredYarns.consigment_yarn_id, [Validators.required]),
      consigmentYarnNumber: new FormControl(selectedStoredYarns.consigment_yarn_number, [Validators.required]),
      newConsigmentYarnNumber: new FormControl(this.orderedYarns[0].order_name, [Validators.required]),
      yarnLotId: new FormControl(selectedStoredYarns.yarn_lot_id, [Validators.required]),
      yarnLotCode: new FormControl(selectedStoredYarns.yarn_lot_code, [Validators.required]),
      waId: new FormControl(selectedStoredYarns.wa_id, [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl((this.yarnOrderCurrentQuantity <= selectedStoredYarns.current_quantity) ? this.yarnOrderCurrentQuantity : selectedStoredYarns.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl(selectedStoredYarns.current_quantity),
      note: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem(selectedStoredYarns: any) {
    this.selectedStoredYarnsArrayValues.indexOf(selectedStoredYarns)
    const control = <FormArray>this.addRequisitionForm.get('items');
    let row = this.initItem(selectedStoredYarns)
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
    this.getListYarnPrices.splice(index, 1)
    this.listYarnPricesDollar.splice(index, 1)
    this._quantityOccurrencesValidationService.removeIndexFromMapAndArray(this.selectedStoredYarnsMap, index, objectData, this.selectedStoredYarnsArrayValues)
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

    for (let i = 0; i < this.orderedYarns.length; i++) {
      const orderedYarn = this.orderedYarns[i];
      orderedYarn.added_quantity = 0

      for (let j = 0; j < control.controls.length; j++) {
        const controls = control.controls[j];

        if (orderedYarn.yarn_id == controls['controls']['yarnId'].value) {
          orderedYarn.added_quantity = parseFloat(orderedYarn.added_quantity + parseFloat(controls['controls']['quantity'].value))
        }
      }

    }

  }

  async onAddRequisition() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid && this.addRequisitionForm.get('items')!['controls'].length > 0) {
      if (
        this._quantityOccurrencesValidationService.validateQuantityDynamic(
          this.selectedStoredYarnsMap, this.addRequisitionForm.controls['items'].value,
          'id', 'yarnId',
          'consigment_yarn_id', 'consigmentYarnId',
          'waYarnOrderRequisitionDetailsId', 'id',
          'quantity', 'name')) {

        this._constantsService.spinner.show()
        this._executeOrderRequisitionDetailsWaService.add(this.addRequisitionForm.value).subscribe(response => {
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

  customFilterForYarnLotCode() {
    const customFilterName = "yarn-lot-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnLotCode

      if (this.selectedYarnLotCode[0] != null) {
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
            if (value == filter[j].yarn_lot_code) {
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

  customFilterForConsigmentYarn() {
    const customFilterName = "consigment-yarn-number-filter";
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
            if (value == filter[j].consigment_yarn_number) {
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

  customFilterForYarnCodes() {
    const customFilterName = "yarn-code-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnCodes

      if (this.selectedYarnCodes[0] != null) {
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
            if (value == filter[j].yarn_code) {
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


  customFilterForYarnNames() {
    const customFilterName = "yarn-name-filter";
    this.filterService.register(customFilterName, (value: any[], filter: any[]): boolean => {
      filter = this.selectedYarnNames

      if (this.selectedYarnNames[0] != null) {
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
            if (value == filter[j].yarn_name) {
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

  clearOrderYarn(table: Table) {
    table.clear();
    table.reset();
    this.selectedYarnCodes = []
    this.selectedYarnNames = []
  }

  onMultiselectedYarnCodes(event) {
    this.selectedYarnCodes = event
    this.dt2?._filter()
  }

  onMultiselectedYarnNames(event) {
    this.selectedYarnNames = event
    this.dt2?._filter()
  }


}


