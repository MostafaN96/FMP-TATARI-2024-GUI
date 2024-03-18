import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main Side
import { MainRoutingPageComponent } from './main/main-routing-page/main-routing-page.component';
import { DashboardLoginComponent } from './main/dashboard-login/dashboard-login.component';

// Client Side
// import { CRoutingPageComponent } from './client-pages/c-routing-page/c-routing-page.component';

// ERROR PAGE
import { PageNotFoundComponent } from './general-pages/page-not-found/page-not-found.component';

// AuthGuard
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },

  // ------------------------ START Admin Side ------------------------ \\
  { path: '', component: DashboardLoginComponent },

  {
    path: 'dashboard', component: MainRoutingPageComponent, children:

      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', loadChildren: () => import('./system-modules/main-pages-modules/home-page-module/home-page-module.module').then(m => m.HomePageModuleModule) },


        ////////////////// ----------- Preparation ----------- //////////////////
        { path: 'update-user-permissions', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/user-permissions-modules/update-user-permissions-module/update-user-permissions-module.module').then(m => m.UpdateUserPermissionsModuleModule) },

        // Yarn
        { path: 'add-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-modules/add-yarn-module/add-yarn-module.module').then(m => m.AddYarnModuleModule) },
        { path: 'show-all-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-modules/show-all-yarn-module/show-all-yarn-module.module').then(m => m.ShowAllYarnModuleModule) },
        { path: 'restore-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-modules/restore-yarn-module/restore-yarn-module.module').then(m => m.RestoreYarnModuleModule) },

        // Yarn Lot
        { path: 'add-yarn-lot', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-lot-modules/yarn-lot-add-module/yarn-lot-add-module.module').then(m => m.YarnLotAddModuleModule) },
        { path: 'show-all-yarn-lot', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-lot-modules/yarn-lot-show-all-module/yarn-lot-show-all-module.module').then(m => m.YarnLotShowAllModuleModule) },
        { path: 'restore-yarn-lot', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/yarn-lot-modules/yarn-lot-restore-module/yarn-lot-restore-module.module').then(m => m.YarnLotRestoreModuleModule) },

        // supplier
        { path: 'add-supplier', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/supplier-modules/add-supplier-module/add-supplier-module.module').then(m => m.AddSupplierModuleModule) },
        { path: 'show-all-supplier', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/supplier-modules/show-all-supplier-module/show-all-supplier-module.module').then(m => m.ShowAllSupplierModuleModule) },
        { path: 'restore-supplier', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/supplier-modules/restore-supplier-module/restore-supplier-module.module').then(m => m.RestoreSupplierModuleModule) },

        // warehouse
        { path: 'add-warehouse', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/warehouse-modules/add-warehouse-module/add-warehouse-module.module').then(m => m.AddWarehouseModuleModule) },
        { path: 'show-all-warehouse', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/warehouse-modules/show-all-warehouse-module/show-all-warehouse-module.module').then(m => m.ShowAllWarehouseModuleModule) },
        { path: 'restore-warehouse', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/warehouse-modules/restore-warehouse-module/restore-warehouse-module.module').then(m => m.RestoreWarehouseModuleModule) },

        // Seller
        { path: 'add-seller', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/seller-modules/add-seller-module/add-seller-module.module').then(m => m.AddSellerModuleModule) },
        { path: 'show-all-seller', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/seller-modules/show-all-seller-module/show-all-seller-module.module').then(m => m.ShowAllSellerModuleModule) },
        { path: 'restore-seller', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/seller-modules/restore-seller-module/restore-seller-module.module').then(m => m.RestoreSellerModuleModule) },

        // Circular Knitting Machine
        { path: 'add-circular-knitting-machine', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/circular-knitting-machine-modules/add-circular-knitting-machine-module/add-circular-knitting-machine-module.module').then(m => m.AddCircularKnittingMachineModuleModule) },
        { path: 'show-all-circular-knitting-machine', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/circular-knitting-machine-modules/show-all-circular-knitting-machine-module/show-all-circular-knitting-machine-module.module').then(m => m.ShowAllCircularKnittingMachineModuleModule) },
        { path: 'restore-circular-knitting-machine', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/circular-knitting-machine-modules/restore-circular-knitting-machine-module/restore-circular-knitting-machine-module.module').then(m => m.RestoreCircularKnittingMachineModuleModule) },

        // Color
        { path: 'add-color', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-modules/add-color-module/add-color-module.module').then(m => m.AddColorModuleModule) },
        { path: 'show-all-color', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-modules/show-all-color-module/show-all-color-module.module').then(m => m.ShowAllColorModuleModule) },
        { path: 'restore-color', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-modules/restore-color-module/restore-color-module.module').then(m => m.RestoreColorModuleModule) },

        // Color Category
        { path: 'add-color-category', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-category-modules/add-color-category-module/add-color-category-module.module').then(m => m.AddColorCategoryModuleModule) },
        { path: 'show-all-color-category', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-category-modules/show-all-color-category-module/show-all-color-category-module.module').then(m => m.ShowAllColorCategoryModuleModule) },
        { path: 'restore-color-category', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/color-category-modules/restore-color-category-module/restore-color-category-module.module').then(m => m.RestoreColorCategoryModuleModule) },

        // Anointed Services
        { path: 'add-anointed-services', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-modules/add-anointed-services-module/add-anointed-services-module.module').then(m => m.AddAnointedServicesModuleModule) },
        { path: 'show-all-anointed-services', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-modules/show-all-anointed-services-module/show-all-anointed-services-module.module').then(m => m.ShowAllAnointedServicesModuleModule) },
        { path: 'restore-anointed-services', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-modules/restore-anointed-services-module/restore-anointed-services-module.module').then(m => m.RestoreAnointedServicesModuleModule) },

        // Anointed Services Prices
        { path: 'add-anointed-services-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-prices-modules/add-anointed-services-prices-module/add-anointed-services-prices-module.module').then(m => m.AddAnointedServicesPricesModuleModule) },
        { path: 'show-all-anointed-services-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-prices-modules/show-all-anointed-services-prices-module/show-all-anointed-services-prices-module.module').then(m => m.ShowAllAnointedServicesPricesModuleModule) },
        { path: 'restore-anointed-services-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-services-prices-modules/restore-anointed-services-prices-module/restore-anointed-services-prices-module.module').then(m => m.RestoreAnointedServicesPricesModuleModule) },

        // Anointed Services Prices
        { path: 'add-anointed-colors-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-colors-prices-modules/add-anointed-colors-prices-module/add-anointed-colors-prices-module.module').then(m => m.AddAnointedColorsPricesModuleModule) },
        { path: 'show-all-anointed-colors-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-colors-prices-modules/show-all-anointed-colors-prices-module/show-all-anointed-colors-prices-module.module').then(m => m.ShowAllAnointedColorsPricesModuleModule) },
        { path: 'restore-anointed-colors-prices', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/anointed-colors-prices-modules/restore-anointed-colors-prices-module/restore-anointed-colors-prices-module.module').then(m => m.RestoreAnointedColorsPricesModuleModule) },

        // Reports
        { path: 'dyeing-services-report', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/reports-modules/dyeing-services-report-module/dyeing-services-report-module.module').then(m => m.DyeingServicesReportModuleModule) },
        { path: 'bar-chart-report-by-item-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/bar-chart-report-by-item-module/bar-chart-report-by-item-module.module').then(m => m.BarChartReportByItemModuleModule) },
        { path: 'bar-chart-report-by-supplier-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/bar-chart-report-by-supplier-wa-module/bar-chart-report-by-supplier-wa-module.module').then(m => m.BarChartReportBySupplierWaModuleModule) },
        { path: 'pie-chart-report-suppliers-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/pie-chart-report-by-suppliers-wa-module/pie-chart-report-by-suppliers-wa-module.module').then(m => m.PieChartReportBySuppliersWaModuleModule) },

        // Consigment Dyeing
        { path: 'add-consigment-dyeing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-dyeing-modules/add-consigment-dyeing-module/add-consigment-dyeing-module.module').then(m => m.AddConsigmentDyeingModuleModule) },
        { path: 'show-all-consigment-dyeing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-dyeing-modules/show-all-consigment-dyeing-module/show-all-consigment-dyeing-module.module').then(m => m.ShowAllConsigmentDyeingModuleModule) },
        { path: 'restore-consigment-dyeing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-dyeing-modules/restore-consigment-dyeing-module/restore-consigment-dyeing-module.module').then(m => m.RestoreConsigmentDyeingModuleModule) },

        // Consigment Manufacturing
        { path: 'add-consigment-manufacturing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-manufacturing-modules/add-consigment-manufacturing-module/add-consigment-manufacturing-module.module').then(m => m.AddConsigmentManufacturingModuleModule) },
        { path: 'show-all-consigment-manufacturing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-manufacturing-modules/show-all-consigment-manufacturing-module/show-all-consigment-manufacturing-module.module').then(m => m.ShowAllConsigmentManufacturingModuleModule) },
        { path: 'restore-consigment-manufacturing', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-manufacturing-modules/restore-consigment-manufacturing-module/restore-consigment-manufacturing-module.module').then(m => m.RestoreConsigmentManufacturingModuleModule) },

        // Consigment Yarn
        { path: 'add-consigment-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-yarn-modules/add-consigment-yarn-module/add-consigment-yarn-module.module').then(m => m.AddConsigmentYarnModuleModule) },
        { path: 'show-all-consigment-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-yarn-modules/show-all-consigment-yarn-module/show-all-consigment-yarn-module.module').then(m => m.ShowAllConsigmentYarnModuleModule) },
        { path: 'restore-consigment-yarn', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/consigment-yarn-modules/restore-consigment-yarn-module/restore-consigment-yarn-module.module').then(m => m.RestoreConsigmentYarnModuleModule) },

        // WA
        // Add Requisition
        { path: 'add-add-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-wa-modules/add-add-requisition-wa-module/add-add-requisition-wa-module.module').then(m => m.AddAddRequisitionWaModuleModule) },
        { path: 'show-all-add-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-wa-modules/show-all-add-requisition-wa-module/show-all-add-requisition-wa-module.module').then(m => m.ShowAllAddRequisitionModuleModule) },
        { path: 'show-all-add-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-wa-modules/add-requisition-details-wa-module/add-requisition-details-wa-module.module').then(m => m.AddRequisitionDetailsModuleModule) },
        
        { path: 'add-add-requisition-by-order-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-wa-modules/add-add-requisition-by-order-wa-module/add-add-requisition-by-order-wa-module.module').then(m => m.AddAddRequisitionByOrderWaModuleModule) },
        { path: 'show-all-add-requisition/order-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-wa-modules/add-requisition-details-by-order-wa-module/add-requisition-details-by-order-wa-module.module').then(m => m.AddRequisitionDetailsByOrderWaModuleModule) },


        // Sell Requisition
        { path: 'add-sell-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/sell-requisition-wa-modules/add-sell-requisition-wa-module/add-sell-requisition-wa-module.module').then(m => m.AddSellRequisitionWaModuleModule) },
        { path: 'show-all-sell-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/sell-requisition-wa-modules/show-all-sell-requisition-wa-module/show-all-sell-requisition-wa-module.module').then(m => m.ShowAllSellRequisitionWaModuleModule) },
        { path: 'show-all-sell-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/sell-requisition-wa-modules/sell-requisition-details-wa-module/sell-requisition-details-wa-module.module').then(m => m.SellRequisitionDetailsWaModuleModule) },


        // Reconcilition Requisition
        { path: 'add-reconciliation-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reconciliation-requisition-wa-modules/add-reconciliation-requisition-wa-module/add-reconciliation-requisition-wa-module.module').then(m => m.AddReconciliationRequisitionWaModuleModule) },
        { path: 'show-all-reconciliation-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reconciliation-requisition-wa-modules/show-all-reconciliation-requisition-wa-module/show-all-reconciliation-requisition-wa-module.module').then(m => m.ShowAllReconciliationRequisitionWaModuleModule) },
        { path: 'show-all-reconciliation-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reconciliation-requisition-wa-modules/reconciliation-requisition-details-wa-module/reconciliation-requisition-details-wa-module.module').then(m => m.ReconciliationRequisitionDetailsWaModuleModule) },

        // Return Requisition
        { path: 'add-return-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/return-requisition-wa-modules/add-return-requisition-wa-module/add-return-requisition-wa-module.module').then(m => m.AddReturnRequisitionWaModuleModule) },
        { path: 'show-all-return-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/return-requisition-wa-modules/show-all-return-requisition-wa-module/show-all-return-requisition-wa-module.module').then(m => m.ShowAllReturnRequisitionWaModuleModule) },
        { path: 'show-all-return-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/return-requisition-wa-modules/return-requisition-details-wa-module/return-requisition-details-wa-module.module').then(m => m.ReturnRequisitionDetailsWaModuleModule) },

        // add-execute-order
        { path: 'add-execute-order-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-order-wa-modules/add-add-requisition-order-wa-module/add-add-requisition-order-wa-module.module').then(m => m.AddAddRequisitionOrderWaModuleModule) },
        { path: 'show-all-execute-order-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-order-wa-modules/show-all-requisition-order-wa-module/show-all-requisition-order-wa-module.module').then(m => m.ShowAllRequisitionOrderWaModuleModule) },
        { path: 'show-all-execute-order-requisition-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-requisition-order-wa-modules/add-requisition-details-order-wa-module/add-requisition-details-order-wa-module.module').then(m => m.AddRequisitionDetailsOrderWaModuleModule) },

        // add-transition-between-wh
        { path: 'add-transition-between-wh-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/transition-between-wh-requisition-wa-modules/add-transition-between-wh-requisition-wa-module/add-transition-between-wh-requisition-wa-module.module').then(m => m.AddTransitionBetweenWhRequisitionWaModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/transition-between-wh-requisition-wa-modules/show-all-transition-between-wh-requisition-wa-module/show-all-transition-between-wh-requisition-wa-module.module').then(m => m.ShowAllTransitionBetweenWhRequisitionWaModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/transition-between-wh-requisition-wa-modules/transition-between-wh-requisition-details-wa-module/transition-between-wh-requisition-details-wa-module.module').then(m => m.TransitionBetweenWhRequisitionDetailsWaModuleModule) },

        // add-purchase-order
        { path: 'add-purchase-order-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-purchase-order-wa-modules/add-add-purchase-order-wa-module/add-add-purchase-order-wa-module.module').then(m => m.AddAddPurchaseOrderWaModuleModule) },
        { path: 'show-all-opened-purchase-order-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-purchase-order-wa-modules/show-all-purchase-order-wa-module/show-all-purchase-order-wa-module.module').then(m => m.ShowAllPurchaseOrderWaModuleModule) },
        { path: 'show-all-opened-purchase-order-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-purchase-order-wa-modules/add-purchase-details-order-wa-module/add-purchase-details-order-wa-module.module').then(m => m.AddPurchaseDetailsOrderWaModuleModule) },
        { path: 'show-all-closed-purchase-order-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-purchase-order-wa-modules/show-all-purchase-order-wa-module/show-all-purchase-order-wa-module.module').then(m => m.ShowAllPurchaseOrderWaModuleModule) },
        { path: 'show-all-closed-purchase-order-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/add-purchase-order-wa-modules/add-purchase-details-order-wa-module/add-purchase-details-order-wa-module.module').then(m => m.AddPurchaseDetailsOrderWaModuleModule) },

        // WB
        // Transport WA WB Requisition
        { path: 'add-transport-wa-wb-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wa-wb-requisition-wb-modules/add-transport-wa-wb-requisition-wb-module/add-transport-wa-wb-requisition-wb-module.module').then(m => m.AddTransportWaWbModuleModule) },
        { path: 'show-all-transport-wa-wb-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wa-wb-requisition-wb-modules/show-all-transport-wa-wb-requisition-wb-module/show-all-transport-wa-wb-requisition-wb-module.module').then(m => m.ShowAllTransportWaWbModuleModule) },
        { path: 'show-all-transport-wa-wb-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wa-wb-requisition-wb-modules/transport-wa-wb-requisition-details-wb-module/transport-wa-wb-requisition-details-wb-module.module').then(m => m.TransportWaWbDetailsModuleModule) },

        // Reports WA
        { path: 'report-by-yarn-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/item-history-by-yarn-report-module/item-history-by-yarn-module/item-history-by-yarn-module.module').then(m => m.ItemHistoryByYarnModuleModule) },
        { path: 'report-by-yarn-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/item-history-by-yarn-report-module/item-history-by-yarn-details-module/item-history-by-yarn-details-module.module').then(m => m.ItemHistoryByYarnDetailsModuleModule) },
        { path: 'report-by-yarn-wa/details-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/reports-modules/item-history-by-yarn-report-module/item-history-by-yarn-details-total-wa-module/item-history-by-yarn-details-total-wa-module.module').then(m => m.ItemHistoryByYarnDetailsTotalWaModuleModule) },

        // Yarn Order Requisition WA
        { path: 'add-yarn-order-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-add-wa-module/yarn-order-requisition-add-wa-module.module').then(m => m.YarnOrderRequisitionAddWaModuleModule) },
        { path: 'add-yarn-order-requisition-related-order-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-add-wa-module/yarn-order-requisition-add-wa-module.module').then(m => m.YarnOrderRequisitionAddWaModuleModule) },
        { path: 'show-all-opened-yarn-order-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-show-all-wa-module/yarn-order-requisition-show-all-wa-module.module').then(m => m.YarnOrderRequisitionShowAllWaModuleModule) },
        { path: 'show-all-opened-yarn-order-requisition-wa/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-details-wa-module/yarn-order-requisition-details-wa-module.module').then(m => m.YarnOrderRequisitionDetailsWaModuleModule) },
        { path: 'show-all-closed-yarn-order-requisition-wa', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-show-all-wa-module/yarn-order-requisition-show-all-wa-module.module').then(m => m.YarnOrderRequisitionShowAllWaModuleModule) },
        { path: 'show-all-closed-yarn-order-requisition-wa/closed-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wa-modules/yarn-order-requisition-wa-modules/yarn-order-requisition-details-wa-module/yarn-order-requisition-details-wa-module.module').then(m => m.YarnOrderRequisitionDetailsWaModuleModule) },

        // Reconcilition Requisition WB
        { path: 'add-reconciliation-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reconcilition-requisition-wb-modules/add-reconcilition-requisition-wb-module/add-reconcilition-requisition-wb-module.module').then(m => m.AddReconcilitionRequisitionWbModuleModule) },
        { path: 'show-all-reconciliation-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reconcilition-requisition-wb-modules/show-all-reconcilition-requisition-wb-module/show-all-reconcilition-requisition-wb-module.module').then(m => m.ShowAllReconcilitionRequisitionWbModuleModule) },
        { path: 'show-all-reconciliation-requisition-wb/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reconcilition-requisition-wb-modules/reconcilition-requisition-details-wb-module/reconcilition-requisition-details-wb-module.module').then(m => m.ReconcilitionRequisitionDetailsWbModuleModule) },

        // Manufacturing Requisition WB
        { path: 'add-manufacturing-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/add-manufacturing-requisition-wb-module/add-manufacturing-requisition-wb-module.module').then(m => m.AddManufacturingRequisitionWbModuleModule) },
        { path: 'show-all-manufacturing-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/show-all-manufacturing-requisition-wb-module/show-all-manufacturing-requisition-wb-module.module').then(m => m.ShowAllManufacturingRequisitionWbModuleModule) },
        { path: 'show-all-manufacturing-requisition-wb/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/manufacturing-requisition-details-wb-module/manufacturing-requisition-details-wb-module.module').then(m => m.ManufacturingRequisitionDetailsWbModuleModule) },
        { path: 'update-manufactured-fabric-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/update-manufactured-fabric-wb-module/update-manufactured-fabric-wb-module.module').then(m => m.UpdateManufacturedFabricWbModuleModule) },
        { path: 'add-manufacturing-requisition-by-order-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/add-manufacturing-requisition-by-order-wb-module/add-manufacturing-requisition-by-order-wb-module.module').then(m => m.AddManufacturingRequisitionByOrderWbModuleModule) },
        { path: 'show-all-manufacturing-order-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/show-all-manufacturing-order-requisition-wb-module/show-all-manufacturing-order-requisition-wb-module.module').then(m => m.ShowAllManufacturingOrderRequisitionWbModuleModule) },
        { path: 'show-all-manufacturing-order-requisition-wb/order-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-requisition-wb-modules/wb-manufacturing-requisition-input-details-order-module/wb-manufacturing-requisition-input-details-order-module.module').then(m => m.WbManufacturingRequisitionInputDetailsOrderModuleModule) },

        // Manufacturing Order Requisition WB
        { path: 'add-manufacturing-order-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-order-requisition-wb-modules/manufacturing-order-requisition-add-wb-module/manufacturing-order-requisition-add-wb-module.module').then(m => m.ManufacturingOrderRequisitionAddWbModuleModule) },
        { path: 'show-all-opened-manufacturing-order-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-order-requisition-wb-modules/manufacturing-order-requisition-show-all-wb-module/manufacturing-order-requisition-show-all-wb-module.module').then(m => m.ManufacturingOrderRequisitionShowAllWbModuleModule) },
        { path: 'show-all-opened-manufacturing-order-requisition-wb/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-order-requisition-wb-modules/manufacturing-order-requisition-details-wb-module/manufacturing-order-requisition-details-wb-module.module').then(m => m.ManufacturingOrderRequisitionDetailsWbModuleModule) },
        { path: 'show-all-closed-manufacturing-order-requisition-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-order-requisition-wb-modules/manufacturing-order-requisition-show-all-wb-module/manufacturing-order-requisition-show-all-wb-module.module').then(m => m.ManufacturingOrderRequisitionShowAllWbModuleModule) },
        { path: 'show-all-closed-manufacturing-order-requisition-wb/closed-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/manufacturing-order-requisition-wb-modules/manufacturing-order-requisition-details-wb-module/manufacturing-order-requisition-details-wb-module.module').then(m => m.ManufacturingOrderRequisitionDetailsWbModuleModule) },

        // Transport WB WA Requisition
        { path: 'add-transport-wb-wa-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wb-wa-requisition-wb-modules/add-transport-wb-wa-requisition-wb-module/add-transport-wb-wa-requisition-wb-module.module').then(m => m.AddTransportWbWaRequisitionWbModuleModule) },
        { path: 'show-all-transport-wb-wa-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wb-wa-requisition-wb-modules/show-all-transport-wb-wa-requisition-wb-module/show-all-transport-wb-wa-requisition-wb-module.module').then(m => m.ShowAllTransportWbWaRequisitionWbModuleModule) },
        { path: 'show-all-transport-wb-wa-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transport-wb-wa-requisition-wb-modules/transport-details-wb-wa-requisition-wb-module/transport-details-wb-wa-requisition-wb-module.module').then(m => m.TransportDetailsWbWaRequisitionWbModuleModule) },

        // Reports WB
        { path: 'report-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/item-history-report-wb-module/item-history-report-wb-module.module').then(m => m.ItemHistoryReportWbModuleModule) },
        { path: 'report-wb/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/item-history-report-details-wb-module/item-history-report-details-wb-module.module').then(m => m.ItemHistoryReportDetailsWbModuleModule) },
        { path: 'report-wb/details-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/item-history-total-report-details-wb-module/item-history-total-report-details-wb-module.module').then(m => m.ItemHistoryTotalReportDetailsWbModuleModule) },
        { path: 'bar-chart-report-by-manufacturer-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/bar-chart-report-by-manufacturer-wb/bar-chart-report-by-manufacturer-wb.module').then(m => m.BarChartReportByManufacturerWbModule) },
        { path: 'pie-chart-report-by-manufacturer-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/pie-chart-report-by-manufactures-wb-module/pie-chart-report-by-manufactures-wb-module.module').then(m => m.PieChartReportByManufacturesWbModuleModule) },
        { path: 'circular-knitting-machines-manufacturing-report-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/circular-knitting-machines-manufacturing-report-wb-module/circular-knitting-machines-manufacturing-report-wb-module.module').then(m => m.CircularKnittingMachinesManufacturingReportWbModuleModule) },
        { path: 'inventory-by-circular-knitting-machines-manufacturing-report-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/item-history-by-circular-knitting-machines-manufacturing-report-wb/item-history-by-circular-knitting-machines-manufacturing-report-wb.module').then(m => m.ItemHistoryByCircularKnittingMachinesManufacturingReportWbModule) },
        { path: 'report-seller-fabrics-orders-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/fabric-orders-report-wb-module/fabric-orders-report-wb-module.module').then(m => m.FabricOrdersReportWbModuleModule) },
        { path: 'report-fabrics-orders-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/seller-fabric-orders-report-wb-module/seller-fabric-orders-report-wb-module.module').then(m => m.SellerFabricOrdersReportWbModuleModule) },
        { path: 'fabric-by-consigment-manufacturing-report-wb', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/reports-modules/fabric-by-consigment-manufacturing-report-wb-module/fabric-by-consigment-manufacturing-report-wb-module.module').then(m => m.FabricByConsigmentManufacturingReportWbModuleModule) },

        // WC
        // Add Requisition
        { path: 'add-add-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/add-requisition-wc-modules/add-add-requisition-wc-module/add-add-requisition-wc-module.module').then(m => m.AddAddRequisitionWcModuleModule) },
        { path: 'show-all-add-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/add-requisition-wc-modules/show-all-add-requisition-wc-module/show-all-add-requisition-wc-module.module').then(m => m.ShowAllAddRequisitionWcModuleModule) },
        { path: 'show-all-add-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/add-requisition-wc-modules/add-requisition-details-wc-module/add-requisition-details-wc-module.module').then(m => m.AddRequisitionDetailsWcModuleModule) },

        // Sell Requisition
        { path: 'add-sell-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/sell-requisition-wc-modules/add-sell-requisition-wc-module/add-sell-requisition-wc-module.module').then(m => m.AddSellRequisitionWcModuleModule) },
        { path: 'show-all-sell-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/sell-requisition-wc-modules/show-all-sell-requisition-wc-module/show-all-sell-requisition-wc-module.module').then(m => m.ShowAllSellRequisitionWcModuleModule) },
        { path: 'show-all-sell-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/sell-requisition-wc-modules/sell-requisition-details-wc-module/sell-requisition-details-wc-module.module').then(m => m.SellRequisitionDetailsWcModuleModule) },

        // Reconcilition Requisition
        { path: 'add-reconciliation-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reconciliation-requisition-wc-modules/add-reconciliation-requisition-wc-module/add-reconciliation-requisition-wc-module.module').then(m => m.AddReconciliationRequisitionWcModuleModule) },
        { path: 'show-all-reconciliation-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reconciliation-requisition-wc-modules/show-all-reconciliation-requisition-wc-module/show-all-reconciliation-requisition-wc-module.module').then(m => m.ShowAllReconciliationRequisitionWcModuleModule) },
        { path: 'show-all-reconciliation-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reconciliation-requisition-wc-modules/reconciliation-requisition-details-wc-module/reconciliation-requisition-details-wc-module.module').then(m => m.ReconciliationRequisitionDetailsWcModuleModule) },

        // Return Requisition
        { path: 'add-return-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/return-requisition-wc-modules/add-return-requisition-wc-module/add-return-requisition-wc-module.module').then(m => m.AddReturnRequisitionWcModuleModule) },
        { path: 'show-all-return-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/return-requisition-wc-modules/show-all-return-requisition-wc-module/show-all-return-requisition-wc-module.module').then(m => m.ShowAllReturnRequisitionWcModuleModule) },
        { path: 'show-all-return-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/return-requisition-wc-modules/return-requisition-details-wc-module/return-requisition-details-wc-module.module').then(m => m.ReturnRequisitionDetailsWcModuleModule) },

        // fabric Order Requisition WC
        { path: 'add-fabric-order-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-add-wc-module/fabric-order-requisition-add-wc-module.module').then(m => m.FabricOrderRequisitionAddWcModuleModule) },
        { path: 'add-fabric-order-requisition-related-order-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-add-wc-module/fabric-order-requisition-add-wc-module.module').then(m => m.FabricOrderRequisitionAddWcModuleModule) },
        { path: 'show-all-opened-fabric-order-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-show-all-wc-module/fabric-order-requisition-show-all-wc-module.module').then(m => m.FabricOrderRequisitionShowAllWcModuleModule) },
        { path: 'show-all-opened-fabric-order-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-details-wc-module/fabric-order-requisition-details-wc-module.module').then(m => m.FabricOrderRequisitionDetailsWcModuleModule) },
        { path: 'show-all-closed-fabric-order-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-show-all-wc-module/fabric-order-requisition-show-all-wc-module.module').then(m => m.FabricOrderRequisitionShowAllWcModuleModule) },
        { path: 'show-all-closed-fabric-order-requisition-wc/closed-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/fabric-order-requisition-wc-modules/fabric-order-requisition-details-wc-module/fabric-order-requisition-details-wc-module.module').then(m => m.FabricOrderRequisitionDetailsWcModuleModule) },

        // add-execute-order
        { path: 'add-execute-order-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/execute-order-requisition-wc-modules/execute-order-requisition-add-wc-module/execute-order-requisition-add-wc-module.module').then(m => m.ExecuteOrderRequisitionAddWcModuleModule) },
        { path: 'show-all-execute-order-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/execute-order-requisition-wc-modules/execute-order-requisition-show-all-wc-module/execute-order-requisition-show-all-wc-module.module').then(m => m.ExecuteOrderRequisitionShowAllWcModuleModule) },
        { path: 'show-all-execute-order-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/execute-order-requisition-wc-modules/execute-order-requisition-details-wc-module/execute-order-requisition-details-wc-module.module').then(m => m.ExecuteOrderRequisitionDetailsWcModuleModule) },

        // Transition Betwen Requisition wc 
        { path: 'add-transition-between-wh-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transition-between-wh-requisition-wc-modules/transition-between-wh-requisition-add-wc-module/transition-between-wh-requisition-add-wc-module.module').then(m => m.TransitionBetweenWhRequisitionAddWcModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transition-between-wh-requisition-wc-modules/transition-between-wh-requisition-show-all-wc-module/transition-between-wh-requisition-show-all-wc-module.module').then(m => m.TransitionBetweenWhRequisitionShowAllWcModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transition-between-wh-requisition-wc-modules/transition-between-wh-requisition-details-wc-module/transition-between-wh-requisition-details-wc-module.module').then(m => m.TransitionBetweenWhRequisitionDetailsWcModuleModule) },

        // Reports WC
        { path: 'report-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reports-modules/item-history-by-fabric-report-module/item-history-by-fabric-module/item-history-by-fabric-module.module').then(m => m.ItemHistoryByFabricModuleModule) },
        { path: 'report-wc/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reports-modules/item-history-by-fabric-report-module/item-history-by-fabric-details-module/item-history-by-fabric-details-module.module').then(m => m.ItemHistoryByFabricDetailsModuleModule) },
        { path: 'report-wc/details-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reports-modules/item-history-by-fabric-report-module/item-history-by-fabric-details-total-wc/item-history-by-fabric-details-total-wc.module').then(m => m.ItemHistoryByFabricDetailsTotalWcModule) },
        { path: 'bar-chart-report-by-item-wc', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/reports-modules/bar-chart-report-by-item-wc-module/bar-chart-report-by-item-wc-module.module').then(m => m.BarChartReportByItemWcModuleModule) },

        // Industry
        { path: 'add-industry', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/industry-modules/add-industry-module/add-industry-module.module').then(m => m.AddIndustryModuleModule) },
        { path: 'show-all-industry', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/industry-modules/show-all-industry-module/show-all-industry-module.module').then(m => m.ShowAllIndustryModuleModule) },
        { path: 'restore-industry', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/industry-modules/restore-industry-module/restore-industry-module.module').then(m => m.RestoreIndustryModuleModule) },

        // fabric
        { path: 'add-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/add-fabric-module/add-fabric-module.module').then(m => m.AddFabricModuleModule) },
        { path: 'show-all-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/show-all-fabric-module/show-all-fabric-module.module').then(m => m.ShowAllFabricModuleModule) },
        { path: 'restore-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/restore-fabric-module/restore-fabric-module.module').then(m => m.RestoreFabricModuleModule) },
        { path: 'update-fabric-yarns', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/update-form-fabric-yarns-module/update-form-fabric-yarns-module.module').then(m => m.UpdateFormFabricYarnsModuleModule) },

        // Dyed fabric
        { path: 'add-dyed-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/add-fabric-module/add-fabric-module.module').then(m => m.AddFabricModuleModule) },
        { path: 'show-all-dyed-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/show-all-fabric-module/show-all-fabric-module.module').then(m => m.ShowAllFabricModuleModule) },
        { path: 'restore-dyed-fabric', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/fabric-modules/restore-fabric-module/restore-fabric-module.module').then(m => m.RestoreFabricModuleModule) },

        // Transport Between Industries
        { path: 'add-transport-between-industries-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transition-between-industries-modules/add-transition-between-industries-wb-module/add-transition-between-industries-wb-module.module').then(m => m.AddTransitionBetweenIndustriesWbModuleModule) },
        { path: 'show-all-transport-between-industries-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transition-between-industries-modules/show-all-transition-between-industries-wb-module/show-all-transition-between-industries-wb-module.module').then(m => m.ShowAllTransitionBetweenIndustriesWbModuleModule) },
        { path: 'show-all-transport-between-industries-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wb-modules/transition-between-industries-modules/transition-between-industries-details-wb-module/transition-between-industries-details-wb-module.module').then(m => m.TransitionBetweenIndustriesDetailsWbModuleModule) },

        // Transport WC WD Requisition
        { path: 'add-transport-wc-wd-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transport-wc-wd-requisition-wc-modules/add-transport-wc-wd-requisition-wc-module/add-transport-wc-wd-requisition-wc-module.module').then(m => m.AddTransportWcWdRequisitionWcModuleModule) },
        { path: 'show-all-transport-wc-wd-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transport-wc-wd-requisition-wc-modules/show-all-transport-wc-wd-requisition-wc-module/show-all-transport-wc-wd-requisition-wc-module.module').then(m => m.ShowAllTransportWcWdRequisitionWcModuleModule) },
        { path: 'show-all-transport-wc-wd-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wc-modules/transport-wc-wd-requisition-wc-modules/transport-wc-wd-requisition-details-wc-module/transport-wc-wd-requisition-details-wc-module.module').then(m => m.TransportWcWdRequisitionDetailsWcModuleModule) },

        // WD
        // Add Dyeing Order
        { path: 'add-dyeing-order-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-order-wd-modules/add-dyeing-order-wd-module/add-dyeing-order-wd-module.module').then(m => m.AddDyeingOrderWdModuleModule) },
        { path: 'show-all-dyeing-order-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-order-wd-modules/show-all-dyeing-order-wd-module/show-all-dyeing-order-wd-module.module').then(m => m.ShowAllDyeingOrderWdModuleModule) },
        { path: 'show-all-closed-dyeing-order-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-order-wd-modules/show-all-dyeing-order-wd-module/show-all-dyeing-order-wd-module.module').then(m => m.ShowAllDyeingOrderWdModuleModule) },
        { path: 'show-all-dyeing-order-wd/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-order-wd-modules/dyeing-order-details-wd-module/dyeing-order-details-wd-module.module').then(m => m.DyeingOrderDetailsWdModuleModule) },
        { path: 'show-all-closed-dyeing-order-wd/closed-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-order-wd-modules/dyeing-order-details-wd-module/dyeing-order-details-wd-module.module').then(m => m.DyeingOrderDetailsWdModuleModule) },

        // Add Form Dyeing Requisition
        { path: 'add-form-dyeing-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/add-form-dyeing-requisition-wd-module/add-form-dyeing-requisition-wd-module.module').then(m => m.AddFormDyeingRequisitionWdModuleModule) },
        { path: 'add-form-dyeing-requisition-wd-by-order', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/add-form-dyeing-requisition-by-order-wd-module/add-form-dyeing-requisition-by-order-wd-module.module').then(m => m.AddFormDyeingRequisitionByOrderWdModuleModule) },
        { path: 'show-all-form-dyeing-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/show-all-form-dyeing-requisition-wd-module/show-all-form-dyeing-requisition-wd-module.module').then(m => m.ShowAllFormDyeingRequisitionWdModuleModule) },
        { path: 'show-all-form-dyeing-requisition-wd/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/form-dyeing-requisition-details-wd-module/form-dyeing-requisition-details-wd-module.module').then(m => m.FormDyeingRequisitionDetailsWdModuleModule) },
        { path: 'show-all-form-dyeing-order-requisition-wd/order-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/wd-form-dyeing-order-requisition-details-module/wd-form-dyeing-order-requisition-details-module.module').then(m => m.WdFormDyeingOrderRequisitionDetailsModuleModule) },
        { path: 'settling-form-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/form-dyeing-requisition-wd-modules/settling-form-wd-module/settling-form-wd-module.module').then(m => m.SettlingFormWdModuleModule) },

        // Add Dyeing Requisition
        { path: 'add-dyeing-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-requisition-wd-modules/add-deying-requisition-wd-module/add-deying-requisition-wd-module.module').then(m => m.AddDeyingRequisitionWdModuleModule) },
        { path: 'show-all-dyeing-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-requisition-wd-modules/show-all-deying-requisition-wd-module/show-all-deying-requisition-wd-module.module').then(m => m.ShowAllDeyingRequisitionWdModuleModule) },
        { path: 'show-all-dyeing-requisition-wd/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/dyeing-requisition-wd-modules/deying-requisition-details-wd-module/deying-requisition-details-wd-module.module').then(m => m.DeyingRequisitionDetailsWdModuleModule) },

        // Reconcilition Requisition
        { path: 'add-reconciliation-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reconcilition-requisition-wd-modules/add-reconcilition-requisition-wd-module/add-reconcilition-requisition-wd-module.module').then(m => m.AddReconcilitionRequisitionWdModuleModule) },
        { path: 'show-all-reconciliation-requisition-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reconcilition-requisition-wd-modules/show-all-reconcilition-requisition-wd-module/show-all-reconcilition-requisition-wd-module.module').then(m => m.ShowAllReconcilitionRequisitionWdModuleModule) },
        { path: 'show-all-reconciliation-requisition-wd/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reconcilition-requisition-wd-modules/reconcilition-requisition-details-wd-module/reconcilition-requisition-details-wd-module.module').then(m => m.ReconcilitionRequisitionDetailsWdModuleModule) },

        // Transport WD WC Requisition
        { path: 'add-transport-wd-wc-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transport-wd-wc-requisition-wd-modules/add-transport-wd-wc-requisition-wd-module/add-transport-wd-wc-requisition-wd-module.module').then(m => m.AddTransportWdWcRequisitionWdModuleModule) },
        { path: 'show-all-transport-wd-wc-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transport-wd-wc-requisition-wd-modules/show-all-transport-wd-wc-requisition-wd-module/show-all-transport-wd-wc-requisition-wd-module.module').then(m => m.ShowAllTransportWdWcRequisitionWdModuleModule) },
        { path: 'show-all-transport-wd-wc-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transport-wd-wc-requisition-wd-modules/transport-details-wd-wc-requisition-wd-module/transport-details-wd-wc-requisition-wd-module.module').then(m => m.TransportDetailsWdWcRequisitionWdModuleModule) },

        // Transport Between Dyers
        { path: 'add-transport-between-dyers-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transition-between-dyers-wd-modules/add-transition-between-dyers-wd-module/add-transition-between-dyers-wd-module.module').then(m => m.AddTransitionBetweenDyersWdModuleModule) },
        { path: 'show-all-transport-between-dyers-requisition', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transition-between-dyers-wd-modules/show-all-transition-between-dyers-wd-module/show-all-transition-between-dyers-wd-module.module').then(m => m.ShowAllTransitionBetweenDyersWdModuleModule) },
        { path: 'show-all-transport-between-dyers-requisition/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/transition-between-dyers-wd-modules/transition-between-dyers-details-wd-module/transition-between-dyers-details-wd-module.module').then(m => m.TransitionBetweenDyersDetailsWdModuleModule) },

        // Reports WD
        { path: 'report-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/item-history-report-wd-module/item-history-report-wd-module.module').then(m => m.ItemHistoryReportWdModuleModule) },
        { path: 'report-wd/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/item-history-report-details-wd-module/item-history-report-details-wd-module.module').then(m => m.ItemHistoryReportDetailsWdModuleModule) },
        { path: 'report-wd/details-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/item-history-report-details-total-wd-module/item-history-report-details-total-wd-module.module').then(m => m.ItemHistoryReportDetailsTotalWdModuleModule) },
        { path: 'bar-chart-report-by-dyer-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/bar-chart-report-by-dyer-wd/bar-chart-report-by-dyer-wd.module').then(m => m.BarChartReportByDyerWdModule) },
        { path: 'pie-chart-report-by-dyer-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/pie-chart-report-by-deiers-wd-module/pie-chart-report-by-deiers-wd-module.module').then(m => m.PieChartReportByDeiersWdModuleModule) },

        { path: 'report-form-item-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/form-item-history-report-wd-module/form-item-history-report-wd-module.module').then(m => m.FormItemHistoryReportWdModuleModule) },
        { path: 'report-form-dyer-item-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/form-dyer-item-history-report-wd-module/form-dyer-item-history-report-wd-module.module').then(m => m.FormDyerItemHistoryReportWdModuleModule) },
        { path: 'report-customer-fabrics-orders-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/customer-fabric-orders-report-wd-module/customer-fabric-orders-report-wd-module.module').then(m => m.CustomerFabricOrdersReportWdModuleModule) },
        { path: 'report-fabrics-orders-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/fabric-orders-report-wd-module/fabric-orders-report-wd-module.module').then(m => m.FabricOrdersReportWdModuleModule) },
        { path: 'inquire-fabric-avilability-report-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-report-wd-module/inquire-fabric-avilability-report-wd-module.module').then(m => m.InquireFabricAvilabilityReportWdModuleModule) },
        { path: 'inquire-fabric-avilability-by-send-data-report-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-by-send-data-report-wd-module/inquire-fabric-avilability-by-send-data-report-wd-module.module').then(m => m.InquireFabricAvilabilityBySendDataReportWdModuleModule) },
        { path: 'inquire-fabric-avilability-report-by-dyeing-order-wd', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/wd-modules/reports-modules/inquire-fabric-avilability-by-dyeing-order-report-wd-module/inquire-fabric-avilability-by-dyeing-order-report-wd-module.module').then(m => m.InquireFabricAvilabilityByDyeingOrderReportWdModuleModule) },

        // WE
        // Add Requisition
        { path: 'add-add-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/add-requisition-we-modules/add-add-requisition-we-module/add-add-requisition-we-module.module').then(m => m.AddAddRequisitionWeModuleModule) },
        { path: 'show-all-add-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/add-requisition-we-modules/show-all-add-requisition-we-module/show-all-add-requisition-we-module.module').then(m => m.ShowAllAddRequisitionWeModuleModule) },
        { path: 'show-all-add-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/add-requisition-we-modules/add-requisition-details-we-module/add-requisition-details-we-module.module').then(m => m.AddRequisitionDetailsWeModuleModule) },

        // Sell Requisition
        { path: 'add-sell-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/add-sell-requisition-we-module/add-sell-requisition-we-module.module').then(m => m.AddSellRequisitionWeModuleModule) },
        { path: 'show-all-sell-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/show-all-sell-requisition-we-module/show-all-sell-requisition-we-module.module').then(m => m.ShowAllSellRequisitionWeModuleModule) },
        { path: 'show-all-sell-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/sell-requisition-detalis-we-module/sell-requisition-detalis-we-module.module').then(m => m.SellRequisitionDetalisWeModuleModule) },

        // Sell Requisition Direct
        { path: 'add-sell-requisition-direct-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/add-sell-requisition-direct-we-module/add-sell-requisition-direct-we-module.module').then(m => m.AddSellRequisitionDirectWeModuleModule) },
        { path: 'show-all-sell-requisition-direct-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/show-all-sell-requisition-we-module/show-all-sell-requisition-we-module.module').then(m => m.ShowAllSellRequisitionWeModuleModule) },
        { path: 'show-all-sell-requisition-direct-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/sell-requisition-direct-details-we-module/sell-requisition-direct-details-we-module.module').then(m => m.SellRequisitionDirectDetailsWeModuleModule) },
        { path: 'show-all-sell-requisition-direct-we/confirm', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/sell-requisition-we-modules/confirm-direct-sell-we-module/confirm-direct-sell-we-module.module').then(m => m.ConfirmDirectSellWeModuleModule) },

        // Reconcilition Requisition
        { path: 'add-reconciliation-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reconcilition-requisition-we-modules/add-reconcilition-requisition-we-module/add-reconcilition-requisition-we-module.module').then(m => m.AddReconcilitionRequisitionWeModuleModule) },
        { path: 'show-all-reconciliation-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reconcilition-requisition-we-modules/show-all-reconcilition-requisition-we-module/show-all-reconcilition-requisition-we-module.module').then(m => m.ShowAllReconcilitionRequisitionWeModuleModule) },
        { path: 'show-all-reconciliation-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reconcilition-requisition-we-modules/reconcilition-requisition-details-we-module/reconcilition-requisition-details-we-module.module').then(m => m.ReconcilitionRequisitionDetailsWeModuleModule) },

        // Return Requisition
        { path: 'add-return-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-requisition-we-modules/add-return-requisition-we-module/add-return-requisition-we-module.module').then(m => m.AddReturnRequisitionWeModuleModule) },
        { path: 'show-all-return-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-requisition-we-modules/show-all-return-requisition-we-module/show-all-return-requisition-we-module.module').then(m => m.ShowAllReturnRequisitionWeModuleModule) },
        { path: 'show-all-return-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-requisition-we-modules/return-requisition-details-we-module/return-requisition-details-we-module.module').then(m => m.ReturnRequisitionDetailsWeModuleModule) },

        // Delivery Car
        { path: 'add-delivery-car', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/delivery-car-modules/add-delivery-car-module/add-delivery-car-module.module').then(m => m.AddDeliveryCarModuleModule) },
        { path: 'show-all-delivery-car', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/delivery-car-modules/show-all-delivery-car-module/show-all-delivery-car-module.module').then(m => m.ShowAllDeliveryCarModuleModule) },
        { path: 'restore-delivery-car', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/delivery-car-modules/restore-delivery-car-module/restore-delivery-car-module.module').then(m => m.RestoreDeliveryCarModuleModule) },

        // Return Sell Requisition
        { path: 'add-return-sell-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-sell-requisition-we-modules/add-return-sell-requisition-we/add-return-sell-requisition-we.module').then(m => m.AddReturnSellRequisitionWeModule) },
        { path: 'show-all-return-sell-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-sell-requisition-we-modules/show-all-return-sell-requisition-we/show-all-return-sell-requisition-we.module').then(m => m.ShowAllReturnSellRequisitionWeModule) },
        { path: 'show-all-return-sell-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/return-sell-requisition-we-modules/return-sell-requisition-details-we/return-sell-requisition-details-we.module').then(m => m.ReturnSellRequisitionDetailsWeModule) },

        // Reports WE
        { path: 'report-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/item-hostory-by-dyed-fabric-module/item-hostory-by-dyed-fabric-module.module').then(m => m.ItemHostoryByDyedFabricModuleModule) },
        { path: 'report-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/item-hostory-by-dyed-fabric-details-module/item-hostory-by-dyed-fabric-details-module.module').then(m => m.ItemHostoryByDyedFabricDetailsModuleModule) },
        { path: 'report-we/details-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/item-hostory-by-dyed-fabric-details-total-we/item-hostory-by-dyed-fabric-details-total-we.module').then(m => m.ItemHostoryByDyedFabricDetailsTotalWeModule) },
        { path: 'bar-chart-report-sell-by-item-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/bar-chart-report-sell-by-item-we-module/bar-chart-report-sell-by-item-we-module.module').then(m => m.BarChartReportSellByItemWeModuleModule) },
        { path: 'bar-chart-report-sell-by-seller-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/bar-chart-report-sell-by-seller-we-module/bar-chart-report-sell-by-seller-we-module.module').then(m => m.BarChartReportSellBySellerWeModuleModule) },
        { path: 'pie-chart-report-sell-by-sellers-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/pie-chart-report-sell-by-sellers-we-module/pie-chart-report-sell-by-sellers-we-module.module').then(m => m.PieChartReportSellBySellersWeModuleModule) },
        { path: 'stock-report-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/stock-report-we-module/stock-report-we-module.module').then(m => m.StockReportWeModuleModule) },
        { path: 'sales-report-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/sales-report-we-module/sales-report-we-module.module').then(m => m.SalesReportWeModuleModule) },

        // dyed fabric Order Requisition we
        { path: 'add-dyed-fabric-order-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-add-we-module/dyed-fabric-order-requisition-add-we-module.module').then(m => m.DyedFabricOrderRequisitionAddWeModuleModule) },
        { path: 'add-dyed-fabric-order-requisition-related-order-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-add-we-module/dyed-fabric-order-requisition-add-we-module.module').then(m => m.DyedFabricOrderRequisitionAddWeModuleModule) },
        { path: 'show-all-opened-dyed-fabric-order-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-show-all-we-module/dyed-fabric-order-requisition-show-all-we-module.module').then(m => m.DyedFabricOrderRequisitionShowAllWeModuleModule) },
        { path: 'show-all-opened-dyed-fabric-order-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-details-we-module/dyed-fabric-order-requisition-details-we-module.module').then(m => m.DyedFabricOrderRequisitionDetailsWeModuleModule) },
        { path: 'show-all-closed-dyed-fabric-order-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-show-all-we-module/dyed-fabric-order-requisition-show-all-we-module.module').then(m => m.DyedFabricOrderRequisitionShowAllWeModuleModule) },
        { path: 'show-all-closed-dyed-fabric-order-requisition-we/closed-details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/dyed-fabric-order-requisition-we-modules/dyed-fabric-order-requisition-details-we-module/dyed-fabric-order-requisition-details-we-module.module').then(m => m.DyedFabricOrderRequisitionDetailsWeModuleModule) },

        // add-execute-order
        { path: 'add-execute-order-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/execute-order-requisition-we-modules/execute-order-requisition-add-we-module/execute-order-requisition-add-we-module.module').then(m => m.ExecuteOrderRequisitionAddWeModuleModule) },
        { path: 'show-all-execute-order-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/execute-order-requisition-we-modules/execute-order-requisition-show-all-we-module/execute-order-requisition-show-all-we-module.module').then(m => m.ExecuteOrderRequisitionShowAllWeModuleModule) },
        { path: 'show-all-execute-order-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/execute-order-requisition-we-modules/execute-order-requisition-details-we-module/execute-order-requisition-details-we-module.module').then(m => m.ExecuteOrderRequisitionDetailsWeModuleModule) },

        // Transition Betwen Requisition we 
        { path: 'add-transition-between-wh-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/transition-between-wh-requisition-we-modules/add-transition-between-wh-requisition-we-module/add-transition-between-wh-requisition-we-module.module').then(m => m.AddTransitionBetweenWhRequisitionWeModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/transition-between-wh-requisition-we-modules/show-all-transition-between-wh-requisition-we-module/show-all-transition-between-wh-requisition-we-module.module').then(m => m.ShowAllTransitionBetweenWhRequisitionWeModuleModule) },
        { path: 'show-all-transition-between-wh-requisition-we/details', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/transition-between-wh-requisition-we-modules/transition-between-wh-requisition-details-we-module/transition-between-wh-requisition-details-we-module.module').then(m => m.TransitionBetweenWhRequisitionDetailsWeModuleModule) },

        // Reports
        { path: 'daily-report', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/reports-modules/daily-report-by-date-module/daily-report-by-date-module.module').then(m => m.DailyReportByDateModuleModule) },
        { path: 'bar-chart-report-by-item-we', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/we-modules/reports-modules/bar-chart-report-by-item-we-module/bar-chart-report-by-item-we-module.module').then(m => m.BarChartReportByItemWeModuleModule) },
        { path: 'daily-report-total', canActivate: [AuthGuard], loadChildren: () => import('./system-modules/main-pages-modules/reports-modules/daily-report-by-date-total-module/daily-report-by-date-total-module.module').then(m => m.DailyReportByDateTotalModuleModule) },

      ]
  }
  // ------------------------ END Admin Side ------------------------ \\

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
