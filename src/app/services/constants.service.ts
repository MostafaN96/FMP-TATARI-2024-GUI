import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as UIkit from "../../../node_modules/uikit";

import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(
    public spinner: NgxSpinnerService
  ) { }

  get BASE_URL(): string {
   return environment.baseUrl;
  }

  get TOKEN_KEY(): string {
    return 'q@3z25QWS@!!2';
  }

  get RELOAD_TIME(): number {
    return 1000;
  }

  get TOKEN_SESSION_KEY(): string {
    return 'token';
  }

  // Start Services
  get WE_Fabric_URL_IMG(): string {
    return "sell-requisition-we/image/";
  }
  
  get TRAINING_SUB_CATEGORY_URL_IMG(): string {
    return "training-sub-categories/image/";
  }

  get COURSE_URL_IMG(): string {
    return "courses/image/";
  }

  get CONSULTING_URL_IMG(): string {
    return "consulting-services/image/";
  }

  get Audit_URL_IMG(): string {
    return "audit/image/";
  }

  get WEB_DEVELOPMENT_URL_IMG(): string {
    return "web-and-mobile-services/image/";
  }

  get PROFESSIONAL_URL_IMG(): string {
    return "professional-services/image/";
  }

  get MANAGED_URL_IMG(): string {
    return "managed-services/image/";
  }

  get SOLUTION_URL_IMG(): string {
    return "solutions/image/";
  }

  get PARTNERS_URL_IMG(): string {
    return "partners/image/";
  }

  get BRANCHES_URL_IMG(): string {
    return "branches/image/";
  }
  // END Services
  // service rquest response 

  requestInHouseMessage(courseName: string): string {
    return `Thanks for registration ${courseName}, confirmation email will be sent soon `;
  }

  userSuccessServiceRequestMessage(serviceName: string, serviceType: string): string {
    return `Thanks for Asking for ${serviceName} ${serviceType}, our services sales team will contact you shortly `;
  }
  userSuccessCarrertMessage(): string {
    return `Thank you for applying to AITB`;
  }
  userSuccessUpdateData(): string {
    return `Data Updated `;
  }
  userSupportSuccessMessage(tickectId: string): string {
    return `Thanks for submitting your ticket #${tickectId}, our support team will contact you shortly `;
  }
  contactUsSuccessMessage(): string {
    return `Thanks for submitting your status , our team will contact you shortly `;
  }
  userErrorMessage(): string {
    UIkit.notification({
      message: `يوجد مشكلة الرجاء المحاولة مرة اخرى`,
      timeout: 5000,
      status: "warning"
    });
    return `يوجد مشكلة الرجاء المحاولة مرة اخرى`;
  }

  invalidDyeinQuantityErrorMessage() {
    UIkit.notification({
      message: `الكمية المصبوغة اكبر من كمية التشكيل`,
      timeout: 5000,
      status: "danger"
    });
    return `الكمية المصبوغة اكبر من كمية التشكيل`;
  }

  userInvaledPNGFileTypeErrorMessage(): string {
    return `only PNG allowed`;
  }
  userAleradyRegisterdErrorMessage(): string {
    return `Sorry, you are allery registerd in this course before`;
  }

  registerationSuccessMessage(): string {
    return `Congratulations, your account has been successfully created `;
  }


  courseRegisterationSuccessMessage(courseName: string): string {
    return ` Thanks for registration for course ${courseName}, confirmation email will be sent before the course date`;
  }
  invalidEmailMessage(): string {
    UIkit.notification({
      message: `الإميل غير موجود, الرجاء إخال ايميل مختلف ومسجل`,
      timeout: 5000,
      status: "danger"
    });
    return `This email address is not available, choose a different email address`;
  }
  invalidEmailOrPasswordMessage(): string {
    return `Invalid email or password`;
  }

  successAddMessage(): string {
    UIkit.notification({
      message: `تم إضافة البيانات بنجاح`,
      timeout: 5000,
      status: "success"
    });
    return `تم إضافة البيانات بنجاح`;
  }

  successUpdateMessage(): string {
    UIkit.notification({
      message: `تم تعديل البيانات بنجاح`,
      timeout: 5000,
      status: "success"
    });
    return `تم تعديل البيانات بنجاح`;
  }

  duplicateDataErrorMessage(): string {
    UIkit.notification({
      message: `البيانات موجودة سابقا`,
      timeout: 5000,
      status: "warning"
    });
    return `البيانات موجودة سابقا`;
  }

  quantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `الكمية المدخلة (${newQuantity}) اقل من الكمية المصروفة (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اقل من الكمية المصروفة`;
  }

  invalidInventoryQuantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `الكمية المدخلة (${newQuantity}) اكثر من الكمية الموجودة في المخزن (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اقل من الكمية المصروفة`;
  }

  invalidNegativeDyeinQuantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `الكمية الموجودة في مخزن الجاهز (${spentQuantity}) اقل من (${newQuantity}) فرق الكمية المراد طرحها`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية الموجودة في مخزن الجاهز اقل من فرق الكمية المراد طرحها`;
  }

  quantityOccurrenceErrorMessage(spentQuantity ,newQuantity, materialName): string {
    UIkit.notification({
      message: `الكمية المدخلة في مادة ${materialName} (${newQuantity}) اكثر من الكمية الموجودة في المخزن (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اقل من الكمية المصروفة`;
  }

  transportWaWbQuantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `فرق الكمية  (${newQuantity}) اكثر من الكمية الموجودة في المخزن (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اقل من الكمية المصروفة`;
  }

  manufactureQuantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `الكمية المدخلة (${newQuantity}) اكثر من الكمية المصنعة (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اكثر من الكمية المصنعة`;
  }

  sellQuantityErrorMessage(spentQuantity ,newQuantity): string {
    UIkit.notification({
      message: `فرق الكمية المراد بيعها (${newQuantity}) اكثر من الكمية الموجودة في المخزن (${spentQuantity})`,
      timeout: 5000,
      status: "warning"
    });
    return `الكمية المدخلة اقل من الكمية المصروفة`;
  }

  invalidIdErrorMessage(): string {
    UIkit.notification({
      message: `الرجاء التأكد من صحة إدخال البيانات`,
      timeout: 5000,
      status: "danger"
    });
    return `الرجاء التأكد من صحة إدخال البيانات`;
  }

  successDeleteMessage(): string {
    UIkit.notification({
      message: `تم حذف البيانات بنجاح`,
      timeout: 5000,
      status: "success"
    });
    return `تم حذف البيانات بنجاح`;
  }
  successUpdateImagesMessage(): string {
    return `The image updated successfully`;
  }

  successRestoreMessage(): string {
    UIkit.notification({
      message: `تم استرجاع البيانات بنجاح`,
      timeout: 5000,
      status: "success"
    });
    return `تم استرجاع البيانات بنجاح`;
  }

  successChangeStateMessage(): string {
    return `The state Changed successfully`;
  }


  get DEFAULT_WA_WAREHOUSE_ID(): string {
    return '20229917115148716';
  }

  get DEFAULT_WC_WAREHOUSE_ID(): string {
    return '20229917115148717';
  }

  get DEFAULT_WE_WAREHOUSE_ID(): string {
    return '20229917115148718';
  }

  get DEFAULT_COLOR_CATEGORY_ID(): string {
    return '20220201721512782932';
  }

  // Start Links
  get ROUTING_LINKS(): any {
    return [
      // Yarn
      'add-yarn', // [0]
      'show-all-yarn', // [1]
      'restore-yarn', // [2]

      // Supplier
      'add-supplier', // [3]
      'show-all-supplier', // [4]
      'restore-supplier', // [5]

      // Seller
      'add-seller', // [6]
      'show-all-seller', // [7]
      'restore-seller', // [8]

      // Warehouse
      'add-warehouse', // [9]
      'show-all-warehouse', // [10]
      'restore-warehouse', // [11]

      // WA
      'add-add-requisition', // [12]
      'show-all-add-requisition', // [13]

      'add-sell-requisition', // [14]
      'show-all-sell-requisition', // [15]

      'add-reconciliation-requisition', // [16]
      'show-all-reconciliation-requisition', // [17]

      'add-transport-requisition', // [18]
      'show-all-transport-requisition', // [19]

      'add-return-requisition', // [20]
      'show-all-return-requisition', // [21]

      // Reports WA
      'report-by-yarn-wa', // [22]
      'report-by-yarn-in-requisition-wa', // [23]

      // WB
      'add-transport-wa-wb-requisition', // [24]
      'show-all-transport-wa-wb-requisition', // [25]

      'add-reconciliation-requisition-wb', // [26]
      'show-all-reconciliation-requisition-wb', // [27]

      'add-manufacturing-requisition-wb', // [28]
      'show-all-manufacturing-requisition-wb', // [29]

      'add-transport-wb-wa-requisition', // [30]
      'show-all-transport-wb-wa-requisition', // [31]

      'report-wb', // [32]

      // WC
      'add-add-requisition-wc', // [33]
      'show-all-add-requisition-wc', // [34]

      'add-sell-requisition-wc', // [35]
      'show-all-sell-requisition-wc', // [36]

      'add-reconciliation-requisition-wc', // [37]
      'show-all-reconciliation-requisition-wc', // [38]

      'add-return-requisition-wc', // [39]
      'show-all-return-requisition-wc', // [40]

      'report-wc', // [41]

      // Fabric
      'add-fabric', // [42]
      'show-all-fabric', // [43]
      'restore-fabric', // [44]

      // Industry
      'add-industry', // [45]
      'show-all-industry', // [46]
      'restore-industry', // [47]

      // Transport between Industries
      'add-transport-between-industries-requisition', // [48]
      'show-all-transport-between-industries-requisition', // [49]

      // Transport wc wd
      'add-transport-wc-wd-requisition', // [50]
      'show-all-transport-wc-wd-requisition', // [51]

      // WD
      'add-form-dyeing-requisition-wd', // [52]
      'show-all-form-dyeing-requisition-wd', // [53]

      'add-reconciliation-requisition-wd', // [54]
      'show-all-reconciliation-requisition-wd', // [55]

      'add-transport-wd-wc-requisition', // [56]
      'show-all-transport-wd-wc-requisition', // [57]

      'add-transport-between-dyers-requisition', // [58]
      'show-all-transport-between-dyers-requisition', // [59]

      'report-wd', // [60]

      
      // Color Category
      'add-color-category', // [61]
      'show-all-color-category', // [62]
      'restore-color-category', // [63]

      // Color
      'add-color', // [64]
      'show-all-color', // [65]
      'restore-color', // [66]

      // Anointed Services
      'add-anointed-services', // [67]
      'show-all-anointed-services', // [68]
      'restore-anointed-services', // [69]

      // Anointed Services Prices
      'add-anointed-services-prices', // [70]
      'show-all-anointed-services-prices', // [71]
      'restore-anointed-services-prices', // [72]

      // Anointed Colors Prices
      'add-anointed-colors-prices', // [73]
      'show-all-anointed-colors-prices', // [74]
      'restore-anointed-colors-prices', // [75]

      // WE
      'add-add-requisition-we', // [76]
      'show-all-add-requisition-we', // [77]

      'add-sell-requisition-we', // [78]
      'show-all-sell-requisition-we', // [79]

      'add-reconciliation-requisition-we', // [80]
      'show-all-reconciliation-requisition-we', // [81]

      'add-return-requisition-we', // [82]
      'show-all-return-requisition-we', // [83]

      'report-we', // [84]

      // Fabric
      'add-dyed-fabric', // [85]
      'show-all-dyed-fabric', // [86]
      'restore-dyed-fabric', // [87]

      'dyeing-services-report', // [88]

      'add-sell-requisition-direct-we', // [89]
      'show-all-sell-requisition-direct-we', // [90]

      'add-return-sell-requisition-we', // [91]
      'show-all-return-sell-requisition-we', // [92]

      // Delivery Car
      'add-delivery-car', // [93]
      'show-all-delivery-car', // [94]
      'restore-delivery-car', // [95]

      // WD
      'add-dyeing-requisition-wd', // [96]
      'show-all-dyeing-requisition-wd', // [97]

      'settling-form-wd', // [98]

      'report-form-item-wd', // [99]
      'report-form-dyer-item-wd', // [100]

      'add-form-dyeing-requisition-wd-by-order', // [101]

      'add-dyeing-order-wd', // [102]
      'show-all-dyeing-order-wd', // [103]
      'show-all-closed-dyeing-order-wd', // [104]

      'update-manufactured-fabric-wb', // [105]

      'daily-report', // [106]

      'bar-chart-report-by-item-wa', // [107]
      'bar-chart-report-by-item-wc', // [108]
      'bar-chart-report-by-item-we', // [109]

      'bar-chart-report-by-supplier-wa', // [110]
      'bar-chart-report-by-manufacturer-wb', // [111]
      'bar-chart-report-by-dyer-wd', // [112]
      'bar-chart-report-sell-by-item-we', // [113]
      'bar-chart-report-sell-by-seller-we', // [114]
      'pie-chart-report-by-manufacturer-wb', // [115]
      'pie-chart-report-by-dyer-wd', // [116]
      'pie-chart-report-sell-by-sellers-we', // [117] 
      'pie-chart-report-suppliers-wa', // [118] 
      'stock-report-we', // [119] 

      // Circular Knitting Machine
      'add-circular-knitting-machine', // [120]
      'show-all-circular-knitting-machine', // [121]
      'restore-circular-knitting-machine', // [122]

      'circular-knitting-machines-manufacturing-report-wb', // [123]

      'inventory-by-circular-knitting-machines-manufacturing-report-wb' ,// [124]
      'report-customer-fabrics-orders-wd' ,// [125]
      'report-fabrics-orders-wd' ,// [126]

      'sales-report-we' ,// [127]

      // Yarn Lot
      'add-yarn-lot', // [128]
      'show-all-yarn-lot', // [129]
      'restore-yarn-lot', // [130]

      'add-manufacturing-order-requisition-wb', // [131]
      'show-all-opened-manufacturing-order-requisition-wb', // [132]
      'show-all-closed-manufacturing-order-requisition-wb', // [133]
      'add-manufacturing-requisition-by-order-wb', // [134]

      'report-seller-fabrics-orders-wb', // [135]
      'report-fabrics-orders-wb', // [136]
      'show-all-manufacturing-order-requisition-wb', // [137]

      // WB
      'show-all-manufacturing-order-requisition-wb', // [138]
      'show-all-manufacturing-order-requisition-wb/order-details', // [139]

      // Wd
      'show-all-form-dyeing-order-requisition-wd/order-details', // [140]
      'show-all-form-dyeing-requisition-wd/details', // [141]
 
      // WB
      'fabric-by-consigment-manufacturing-report-wb', // [142]

      //
      'add-consigment-yarn', // [143]
      'show-all-consigment-yarn', // [144]
      'restore-consigment-yarn', // [145]

      'add-consigment-manufacturing', // [146]
      'show-all-consigment-manufacturing', // [147]
      'restore-consigment-manufacturing', // [148]

      'add-consigment-dyeing', // [149]
      'show-all-consigment-dyeing', // [150]
      'restore-consigment-dyeing', // [151]

      'update-fabric-yarns', // [152]

      'inquire-fabric-avilability-report-wd', // [153]
      'inquire-fabric-avilability-by-send-data-report-wd', // [154]
      
      'add-yarn-order-requisition-wa', // [155]
      'show-all-opened-yarn-order-requisition-wa', // [156]
      'show-all-closed-yarn-order-requisition-wa', // [157]
      'add-yarn-requisition-by-order-wa', // [158]

      'inquire-fabric-avilability-report-by-dyeing-order-wd', // [159]
    ]
  }

  get ROUTING_MAIN_LINKS(): any {
    return [
      'dashboard/' // [0]
    ]
  }

  get MAIN_URL(): any {
    return '/dashboard'
  }

  get ADMIN_ROUTING_LINKS(): any {
    return [
      // Training Service
      'add-training-categories', // [0]
      'show-all-training-categories', // [1]
      'restore-training-categories', // [2]

      // Consulting Service
      'add-consulting', // [3]
      'show-all-consulting', // [4]
      'restore-consulting', // [5]

      // Audit Service
      'add-audit', // [6]
      'show-all-audit', // [7]
      'restore-audit', // [8]

      // Web Development Service
      'add-web-and-mobile-services', // [9]
      'show-all-web-and-mobile-services', // [10]
      'restore-web-and-mobile-services', // [11]

      // Professional Service
      'add-professional-services', // [12]
      'show-all-professional-services', // [13]
      'restore-professional-services', // [14]

      // Managed Service
      'add-managed-services', // [15]
      'show-all-managed-services', // [16]
      'restore-managed-services', // [17]

      // Solution Category Service
      'add-solution-categories', // [18]
      'show-all-solution-categories', // [19]
      'restore-solution-categories', // [20]

      // Solution Service
      'add-solutions', // [21]
      'show-all-solutions', // [22]
      'restore-solutions', // [23]

      // Course Plan
      'add-courses-plans', // [24]
      'show-all-planned-courses-plans', // [25]

      // Courses
      'add-courses', // [26]
      'show-all-courses', // [27]
      'restore-courses', // [28]

      // Partner
      'add-partners', // [29]
      'show-all-partners', // [30]
      'restore-partners', // [31]

      // Event
      'add-event', // [32]
      'show-all-event', // [33]
      'restore-event', // [34]

      // Training Sub Categories
      'add-training-sub-categories', // [35]
      'show-all-training-sub-categories', // [36]
      'restore-training-sub-categories', // [37]

      // Staff
      'add-staff', // [38]
      'show-all-staff', // [39]
      'restore-staff', // [40]

      // Branches
      'add-branches', // [41]
      'show-all-branches', // [42]
      'restore-branches', // [43]

      // Job Categories
      'add-job-categories', // [44]
      'show-all-job-categories', // [45]
      'restore-job-categories', // [46]

      // Contact Us Category
      'add-contact-us-category', // [47]
      'show-all-contact-us-category', // [48]
      'restore-contact-us-category', // [49]

      // About Us
      'add-about-us', // [50]
      'show-all-about-us', // [51]
      'restore-about-us', // [52]

      // Approval Actions
      'approval-actions', // [53]

      // Services Requests
      'consulting-service-requests', // [54]
      'audit-service-requests', // [55]
      'web-and-mobile-requests', // [56]
      'professional-service-requests', // [57]
      'managed-service-requests', // [58]
      'solution-service-requests', // [59]

      // Career
      'show-all-student', // [60]
      'show-all-graduate', // [61]
      'show-all-professional', // [62]

      // Customer Plan
      'customer-plan-state', // [63]
      'customer-confirmed', // [64]

      // Course Plan
      'show-all-confirmed-courses-plans', // [65]

      // contact-us 
      'show-all-contact-us', // [66]

      // support 
      'show-all-support', // [67]

      // escalation 
      'show-all-escalation', // [68]

      // consulting-category
      'add-consulting-category', // [69]
      'show-all-consulting-category', // [70]
      'restore-consulting-category', // [71]

      // in house registration requests
      'in-house-registration-requests', // [72]
      
      
    ]
  }
  // END Links
}
