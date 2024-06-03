import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

// Form
import { FormArray, FormGroup } from '@angular/forms';

// Reload Page
import { Router, NavigationEnd } from '@angular/router';

// Shared Service
import { ConstantsService } from "./constants.service";

// Angular Material Configuration
import { PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  @Output() event_callback: EventEmitter<any> = new EventEmitter();
  // transfer data between components
  private eventCallback: Subject<any[]> = new Subject<any>();
  eventCallback$ = this.eventCallback.asObservable();

  // Classes
  sectionClass = ""
  titlePageClass = "main-page-title"
  subTitlePageClass = ""
  TitleTextClass = "title-page"
  mainPageFormClass = " main-page-form mx-3"
  subMainPageFormClass = "container-fluid form-body"
  subMainPageForm2Class = "container-fluid form-body"
  gridFormClass = "row row-cols-md-2 "
  gridForm2Class = "row row-cols-md-1"
  gridForm3Class = "row row-cols-lg-5"
  gridForm4Class = "row row-cols-lg-3"
  btnSectionClass = "container-fluid btn-body px-0"
  tableSectionClass = "table-section"
  tableStyleClass = "table-style"

  undefinedreturn_defect = "undefinedreturn_defect"
  // Invalid messages
  required_field = "الحقل <b>مطلوب</b>"
  invalid_pattern_1 = "المسموح فقط الاحرف, الفاصلة, النقطة, والخط السفلي"
  invalid_message = "الرجاء إدخال البيانات بالشكل الصحيح"
  invalid_pattern_number = "المسموح فقط الأرقام كحد اقصى (15 رقم بالإنجليزي"
  invalid_pattern_number_only = "المسموح فقط الأرقام"
  password_pattern = `نمط غير صالح ، يجب أن تحتوي كلمة المرور من 8 إلى 20 حرفًا أبجديًا رقميًا على الأقل رقمًا واحدًا وحرفًا أبجديًا واحدًا ويجب ألا تحتوي على أحرف خاصة`
  repeat_password = `مطلوب تكرار كلمة المرور`
  match_password = `كلمة المرور غير متطابقة`
  invalid_email = `تنسيق البريد الإلكتروني غير صحيح`
  invalid_pattern_mobile_number = "المسموح كحد اقصى ١٤ رقم بالإنجليزي"

  constructor(
    private router: Router,
    private _constantsService: ConstantsService,

  ) {

  }

  configRouterReloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  reloadPage() {
    setTimeout(() => {
      this.router.navigateByUrl('/' + location.pathname.split("/")[1], { skipLocationChange: true })
        .then(() => this.router.navigate([location.pathname.substr(1)]));
    }, this._constantsService.RELOAD_TIME);
  }

  reloadPageWithParams(params1) {
    setTimeout(() => {
      this.router.navigateByUrl('/' + location.pathname.split("/")[1], { skipLocationChange: true })
        .then(() => this.router.navigate([location.pathname.substr(1)], { queryParams: { id: params1 } }));
    }, this._constantsService.RELOAD_TIME);
  }

  reloadPageWithDynamicParams(params) {
    setTimeout(() => {
      this.router.navigateByUrl('/' + location.pathname.split("/")[1], { skipLocationChange: true })
        .then(() => this.router.navigate([location.pathname.substr(1)], { queryParams: params }));
    }, this._constantsService.RELOAD_TIME);
  }

  openNewTab(urlPage, params) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/' + urlPage], {
        queryParams: params,
      })
    );
    window.open(url, '_blank');
  }

  openPageNewTab(url, params1) {
    this.router.navigate([], { queryParams: { id: params1 } }).then(result => { window.open(url, '_blank'); });
  }

  openPageNewTabWithoutParams(urlPage) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/' + urlPage])
    );
    window.open(url, '_blank');
  }

  pageId() {
    return location.pathname.split("/")[1]
  }


  // Angular Material Configuration
  angularMaterialTableConfig() {
    if (localStorage.getItem(location.pathname.split("/")[1] + "-table-page") === null) {
      localStorage.setItem(location.pathname.split("/")[1] + "-table-page", String(0))
    }

    if (localStorage.getItem("page_size_table") === null) {
      localStorage.setItem("page_size_table", String(1000))
    }
  }

  getAngularMaterialTablePageIndex() {
    return localStorage.getItem(location.pathname.split("/")[1] + "-table-page")
  }
  getAngularMaterialTablePageSize() {
    return localStorage.getItem("page_size_table")
  }

  // set index of table page
  getServerData(event?: PageEvent) {
    localStorage.setItem("page_size_table", String(event!.pageSize))
    localStorage.setItem(location.pathname.split("/")[1] + "-table-page", String(event!.pageIndex))
  }

  setData(data: any) {
setTimeout(() => {
    this.eventCallback.next(data);
    }, 500);
  }

  // WA
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
    return yarns?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount(yarns) {
    return yarns?.map(function (a) { return (a.input_output == '1' && (parseFloat(a['price']) >= 0)) ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }


  getAvgInputesPrice(yarns) {
    return this.getInputAmount(yarns) / this.notZero(this.getTotalAmountQuantityInput(yarns))
  }

  // AVG Price
  getOutputAmount(yarns) {
    return yarns?.map(function (a) { return (a.input_output == '0' && (parseFloat(a['price']) >= 0)) ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }


  getTotalInputQuantity(yarns) {
    return yarns?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  getTotalOutputQuantity(yarns) {
    return yarns?.map(function (a) { return (a.input_output == '0') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  
  getItemAmount(yarns) {
    return this.getInputAmount(yarns) - this.getOutputAmount(yarns)
  }

  getTotalBalance(yarns) {
    return this.getTotalInputQuantity(yarns) - this.getTotalOutputQuantity(yarns)
  }

  getAvgPrice(yarns) {
    return this.getItemAmount(yarns) / this.notZero(this.getTotalBalance(yarns))
  }

  
  getInputAmountDynamic(yarns, quantity, price) {
    return yarns?.map(function (a) { return (a.input_output == '1' && (parseFloat(a[price]) >= 0)) ? (parseFloat(a[quantity]) * parseFloat(a[price])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  getOutputAmountDybamic(yarns, quantity, price) {
    return yarns?.map(function (a) { return (a.input_output == '0' && (parseFloat(a[price]) >= 0)) ? (parseFloat(a[quantity]) * parseFloat(a[price])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmountDynamic(yarns, quantity, price) {
    return this.getInputAmountDynamic(yarns, quantity, price) - this.getOutputAmountDybamic(yarns, quantity, price)
  }

  getAvgPriceDynamic(yarns, quantity, price) {
    return this.getItemAmountDynamic(yarns, quantity, price) / this.notZero(this.getTotalBalance(yarns))
  }
  
  getAvgInputesPriceDynamic(yarns, quantity, price) {
    return this.getInputAmountDynamic(yarns, quantity, price) / this.notZero(this.getTotalAmountQuantityInput(yarns))
  }

  
  
  getItemAmountDynamicDetails(yarns, quantity, price) {
    return this.getInputAmountDynamicDetails(yarns, quantity, price) - this.getOutputAmountDynamicDetails(yarns, quantity, price)
  }

  getInputAmountDynamicDetails(yarns, quantity, price) {
    return yarns.details?.map(function (a) { return (a.input_output == '1' && (parseFloat(a[price]) >= 0)) ? (parseFloat(a[quantity]) * parseFloat(a[price])) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  getOutputAmountDynamicDetails(yarns, quantity, price) {
    return yarns.details?.map(function (a) { return (a.input_output == '0' && (parseFloat(a[price]) >= 0)) ? (parseFloat(a[quantity]) * parseFloat(a[price])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPriceDynamicDetails(yarns, quantity, price) {
    return this.getItemAmountDynamicDetails(yarns, quantity, price) / this.notZero(yarns.current_quantity)
  }

  getTotalAmountQuantityInputDynamicDetails(yarns, quantity) {
    return yarns.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a[quantity])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice2DynamicDetails(yarns, quantity, price) {
    return this.getInputAmountDynamicDetails(yarns, quantity, price) / this.notZero(this.getTotalAmountQuantityInputDynamicDetails(yarns, quantity))
  }

  // WB
  // Get Avg Inputes Price
  getTotalAmountQuantityInput2(yarns) {
    return yarns.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a['quantity'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount2(yarns) {
    return yarns.details?.map(function (a) { return (a.input_output == '1' && (parseFloat(a['price']) >= 0)) ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice2(yarns) {
    return this.getInputAmount2(yarns) / this.notZero(this.getTotalAmountQuantityInput2(yarns))
  }

  // AVG Price
  getOutputAmount2(yarns) {
    return yarns.details?.map(function (a) { return (a.input_output == '0' && (parseFloat(a['price']) >= 0)) ? (parseFloat(a['quantity']) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount2(yarns) {
    return this.getInputAmount2(yarns) - this.getOutputAmount2(yarns)
  }

  getAvgPrice2(yarns) {
    return this.getItemAmount2(yarns) / this.notZero(yarns.current_quantity)
  }

  // WD
  // Get Avg Inputes Price
  getTotalAmountQuantityInput3(fabrics) {
    return fabrics.details.map(function (a) { return (a.input_output == '1') ? (parseFloat(a.initial_quantity)) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getInputAmount3(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '1') ? (parseFloat(a.initial_quantity) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getAvgInputesPrice3(fabrics) {
    return this.getInputAmount3(fabrics) / this.notZero(this.getTotalAmountQuantityInput3(fabrics))
  }

  // AVG Price
  getOutputAmount3(fabrics) {
    return fabrics.details?.map(function (a) { return (a.input_output == '0') ? (parseFloat(a.initial_quantity) * parseFloat(a['price'])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getItemAmount3(fabrics) {
    return this.getInputAmount3(fabrics) - this.getOutputAmount3(fabrics)
  }

  getAvgPrice3(fabrics) {
    return this.getItemAmount3(fabrics) / this.notZero(fabrics.current_quantity)
  }


  getTotalCollectTimes(data, quantity: string, price: string) {
    return data?.map(function (a) { return parseFloat(a[quantity]) * parseFloat(a[price]) }).reduce((acc, value) => acc + value, 0);
  }

  getTotalCollectTimesWithCondition(data, dataObject, quantity: string, price: string, columnCondition: string, condition: string) {
    return data[dataObject]?.map(function (a) { return (a[columnCondition] == condition && parseFloat(a[price]) >= 0) ? (parseFloat(a[quantity]) * parseFloat(a[price])) : 0 }).reduce((acc, value) => acc + value, 0);
  }

  getTotalCollectSum(data, quantity: string) {
    return data?.map(function (a) { return parseFloat(a[quantity]) }).reduce((acc, value) => acc + value, 0);
  }

  getTotalCollectSumWithCondition(data, quantity: string, columnCondition: string, condition: string) {
    return data?.map(function (a) {  return (a[columnCondition] == condition) ? parseFloat(a[quantity]) : 0 }).reduce((acc, value) => acc + value, 0);
  }
  
  getTotalBalanceDynamic(yarns, quantity: string) {
    return this.getTotalCollectSumWithCondition(yarns, quantity, 'input_output', '1') - this.getTotalCollectSumWithCondition(yarns, quantity, 'input_output', '0')
  }

  getTotalCollectTotalSum(data, quantity: string) {
    if (data == null) {
      data = []
    }
    let sum = 0
    for (let index = 0; index < data.length; index++) {
      const element = data[index].details;
      sum = sum + element?.map(function (a) { return parseFloat(a[quantity]) }).reduce((acc, value) => acc + value, 0);
    }
    return sum
  }

  getCollectTimes(quantity: string, price: string) {
    return parseFloat(quantity) * parseFloat(price)
  }

  getTotalQuantity(dataSourceSearchTabel, columnQuantity) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0;
    dataSourceSearchTabel?.forEach(item => {
      sum = sum + parseFloat(item[columnQuantity] ?? 0)
    });
    return sum
  }

  getSumTotalQuantity(dataSourceSearchTabel, columnQuantity) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0
    for (let index = 0; index < dataSourceSearchTabel?.length; index++) {
      const element = dataSourceSearchTabel[index].details;
      sum = sum + this.getTotalQuantity(element, columnQuantity)
    }
    return sum
  }

  getTotalQuantityWithCondition(dataSourceSearchTabel, columnQuantity, columnCondition, condition) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    
    let sum = 0;
    dataSourceSearchTabel.forEach(item => {
      if (item[columnCondition] == condition) {
        sum = sum + parseFloat(item[columnQuantity])
      }
    });
    return sum
  }

  getTotalDetailsQuantityWithCondition(dataSourceSearchTabel, columnQuantity, columnCondition, condition) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }

    let sum = 0;
    for (let index = 0; index < dataSourceSearchTabel?.length; index++) {
      const element = dataSourceSearchTabel[index].details;
        sum = sum + this.getTotalCollectSumWithCondition(element, columnQuantity, columnCondition, condition)
    }
    return sum
  }

  getTotalQuantityForm(form, arrayControl, control) {
    return form.controls[arrayControl].controls.map(t => t.controls[control].value).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
  }

  getTotalPriceXQuantityForm(form, arrayControl, control1, control2) {
    return form.controls[arrayControl].controls.map(function (a) { return parseFloat(a.controls[control1].value) * parseFloat(a.controls[control2].value) }).reduce((acc, value) => acc + value, 0);
  }

  getPriceXQuantity(price: string, quantity: string) {
    return parseFloat(price) * parseFloat(quantity);
  }

  getDyeingCost(quantity: number, services: any, dyeingFee: number, fabricPiece: number) {
    let sum = 0

    for (let index = 0; index < services.length; index++) {
      const element = services[index];
      if (element.is_fabric_piece) {
        sum = sum + (element.price * fabricPiece)
      }
      else {
        sum = sum + (quantity * element.price)
      }
    }
    sum = sum + (dyeingFee * quantity)
    return sum
  }

  getSumTotalDyeingCost(dataSourceSearchTabel) {
    let sum = 0
    for (let index = 0; index < dataSourceSearchTabel?.length; index++) {
      const element = dataSourceSearchTabel[index];
      sum = sum + this.getDyeingCost(element.quantity, element.dyeingServices,
        parseFloat(element.dyeing_fee) + parseFloat(element.added_cost), element.fabric_piece)
    }
    return sum
  }

  getTotalTotalAmountQuantity(dataSourceSearchTabel, columnCondition, condition) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0;
    dataSourceSearchTabel.forEach(data => {
      sum = sum + this.getTotalCollectTimesWithCondition(data, "details", "quantity", "price", columnCondition, condition)
    });
    return sum
  }

  getTotalCost(price: number, quantity: number, services: any, dyeingFee: number, fabricPiece: number) {
    let sum = 0

    for (let index = 0; index < services.length; index++) {
      const element = services[index];
      if (element.is_fabric_piece) {
        sum = sum + (element.price * fabricPiece)
      }
      else {
        sum = sum + (quantity * element.price)
      }
    }
    sum = sum + (dyeingFee * quantity)
    return sum + (price * quantity)
  }

  getSumTotalCost(dataSourceSearchTabel) {
    let sum = 0
    for (let index = 0; index < dataSourceSearchTabel?.length; index++) {
      const element = dataSourceSearchTabel[index];
      sum = sum + this.getTotalCost(element.price, element.quantity, element.dyeingServices,
        parseFloat(element.dyeing_fee) + parseFloat(element.added_cost), element.fabric_piece)
    }
    return sum
  }

  getSumTotalCostOfDyeing(dataSourceSearchTabel) {

    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0
    const element = dataSourceSearchTabel;
    sum = this.getTotalCost(element.price, element.quantity, element.dyeingServices,
      element.dyeing_fee, element.fabric_piece) / element.dyeing_quantity
    return parseFloat((sum).toFixed(3))
  }

  getAvgWast(dataSourceSearchTabel, quantity, dyeingQuantity) {
    if (dataSourceSearchTabel == null) {
      dataSourceSearchTabel = []
    }
    let sum = 0
    let totalDyeingQuantity = this.getTotalQuantityWithCondition(dataSourceSearchTabel, quantity, 'type_of_requisition', 'اذن صباغة')
    let totalProductedQuantity = this.getTotalQuantity(dataSourceSearchTabel, dyeingQuantity)
    sum = ((totalDyeingQuantity - totalProductedQuantity) / totalDyeingQuantity) * 100
    return sum
  }

  // Form

  deleteControlsOfFormArray(form: any, formArrayName: any, deletedControls) {
    const control = <FormArray>form.get(formArrayName);
    for (let index = 0; index < control.length; index++) {
      const formGroup: FormGroup = control.get(String(index)) as FormGroup;
      for (let g = 0; g < deletedControls.length; g++) {
        formGroup.removeControl(deletedControls[g])
      }
    }
    return form
  }

  deleteControlsOfRegularForm(form: any, deletedControls) {
      const formGroup: FormGroup = form as FormGroup;
      for (let g = 0; g < deletedControls.length; g++) {
        formGroup.removeControl(deletedControls[g])
      }
    return formGroup
  }

  // Filter
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key, key2?) {
    const uniqChk = [];
    fullObj.filter((obj: []) => {
      if (!uniqChk.includes(obj[key]) && obj[key] != null && obj[key] != ' ' && obj[key] != '-' && obj[key] != "") {
        uniqChk.push(obj[key]);
      }
      return obj;
    });

    if (key2 != undefined) {
      fullObj.filter((obj: []) => {
        if (!uniqChk.includes(obj[key2]) && obj[key2] != null && obj[key2] != ' ' && obj[key2] != '-' && obj[key2] != "") {
          uniqChk.push(obj[key2]);
        }
        return obj;
      });
    }
    return uniqChk;
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col] != null) {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true
                }
              }

            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }
  //Setup Filter Header
  setupFilter(data, dataSourceSearchTabel, filterSelectObj) {
    //Configure Filter Header
    dataSourceSearchTabel.data = data;
    filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(data, o.columnProp, o.columnProp2);
    });
    // filterSelectObj.filter((o) => {
    //   o.options.push(this.getFilterObject(data, o.columnProp2)) 
    // });

    // Overrride default filter behaviour of Material Datatable
    dataSourceSearchTabel.filterPredicate = this.createFilter();
  }

  // Called on Filter change
  filterChange(filter: any, event: any, filterType: any,
    dataSourceSearchTabel: any, filterValues: any,
    getStartDate?: any, getEndDate?: any, columnDateName?: any) {

    if (filterType == 'regular') {
      dataSourceSearchTabel.filterPredicate = this.createFilter();
      filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
      filterValues[filter.columnProp2] = event.target.value.trim().toLowerCase()

      if (filter.columnProp2 == undefined) {
        delete filterValues[filter.columnProp2]
      }

      for (let index = 0; index < dataSourceSearchTabel.filteredData.length; index++) {
        const element = dataSourceSearchTabel.filteredData[index];
        if (String(element[filter.columnProp]) != String(event.target.value.trim().toLowerCase())) {
          delete dataSourceSearchTabel.filteredData[index]
        }
      }
      dataSourceSearchTabel.filter = JSON.stringify(Array.from(filterValues).entries())
    }
    else if (filterType == 'filterByDate') {
      let startDate = JSON.stringify(moment(getStartDate)).replace(/\"/g, "")
      let endDate = JSON.stringify(moment(getEndDate)).replace(/\"/g, "")
      dataSourceSearchTabel.filterPredicate = (data, filter) => {
        // if (this.startDate && this.endDate) {
        return data[columnDateName] >= startDate && data[columnDateName] <= endDate;
        // }
        // return true;
      }
      this.applyFilterByDate(dataSourceSearchTabel)
    }
  }

  filterChange2(event: any,
    dataSourceSearchTabel: any, filterValues: any) {
    filterValues['return_normal'] = event.target.value
    dataSourceSearchTabel.filter = JSON.stringify(filterValues)
  }

  applyFilterByDate(dataSourceSearchTabel: any) {
    dataSourceSearchTabel.filter = '' + Math.random();
  }

  isObjectEmpty(obj) { return Object.keys(obj).length === 0; }
  // applyFilter(filterValue: string, dataSourceSearchTabel: any, sortColumns: any, data: any, sortColumn, sortType: string) {
  //   dataSourceSearchTabel = new MatTableDataSource(data);
  //   dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
  //   sortColumns.sort(({ id: sortColumn, start: sortType}) as MatSortable);
  //   dataSourceSearchTabel.sort = sortColumns;
  //   dataSourceSearchTabel.sort.start = sortType
  //   console.log(dataSourceSearchTabel);

  //   return dataSourceSearchTabel
  // }


  uniqueArray(data: any = [], key) {
    let result: any = [];
    let filteredArray: any = [];
    data.forEach(item => {
      if (filteredArray.indexOf(item[key]) < 0 && item[key] != undefined) {
        filteredArray.push(item[key]);
        result.push(item);
      }
    });
    return result
  }

  calculateRatio(formArray, attrCalc) {
    let sum = 0
    for (let i = 0; i < formArray.length; i++) {
      const form = formArray[i];
      form.controls[attrCalc].setErrors({ 'incorrect': null });
      form.controls[attrCalc].updateValueAndValidity()
      let num = parseFloat(form.value[attrCalc])
      sum = sum + num
    }
    if (sum != 100) {
      formArray[formArray.length - 1].controls[attrCalc].setErrors({ 'incorrect': true });
    } else {
      formArray[formArray.length - 1].controls[attrCalc].setErrors({ 'incorrect': null });
      formArray[formArray.length - 1].controls[attrCalc].updateValueAndValidity()
    }
  }

  calculateMaxQuantity(formArray, attrCalc, quantity) {
    let sum = 0
    for (let i = 0; i < formArray.length; i++) {
      const form = formArray[i];
      form.controls[attrCalc].setErrors({ 'incorrect': null });
      form.controls[attrCalc].updateValueAndValidity()
      let num = parseFloat(form.controls[attrCalc].value)
      sum = sum + num
    }
    if (sum != quantity) {
      formArray[formArray.length - 1].controls[attrCalc].setErrors({ 'incorrect': true });
    } else {
      formArray[formArray.length - 1].controls[attrCalc].setErrors({ 'incorrect': null });
      formArray[formArray.length - 1].controls[attrCalc].updateValueAndValidity()
    }
  }
}