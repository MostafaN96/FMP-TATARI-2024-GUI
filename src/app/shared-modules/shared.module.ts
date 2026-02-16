import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DetailsMultiselectFilterComponent } from 'src/app/general-pages/details-multiselect-filter/details-multiselect-filter.component';
import { UpdateReportWcComponent } from 'src/app/main/wc/reports/update-report-wc/update-report-wc.component';

// Forms //
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// HTTP Service //
import { HttpClientModule } from "@angular/common/http";

//Web Storage For Session
import { AngularWebStorageModule } from 'angular-web-storage';

/////////////////Angulart Material//////////////////
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from "@angular/material/dialog";
// To Make Date Correct As Local
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// AutoComplete 
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

// PrimeNG
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

// AgGrid
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    DetailsMultiselectFilterComponent,
    UpdateReportWcComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MultiSelectModule
  ],
  exports: [
    CommonModule,

    // Forms //
    ReactiveFormsModule,
    FormsModule,

    //Web Storage For Session
    AngularWebStorageModule,

    // HTTP Service //
    HttpClientModule,

    // Angular Material 
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSortModule,
    MatSliderModule,
    MatDialogModule,
    MatMomentDateModule,

    // AutoComplete
    AutoCompleteModule,
    ButtonModule,


    // PrimeNG
    AccordionModule,
    TableModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    CheckboxModule,
    ConfirmPopupModule,

    // Ag Grid
    AgGridModule,

    DetailsMultiselectFilterComponent,
    UpdateReportWcComponent,

  ],
  providers: [
    // To Make Date Correct As Local
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],

})
export class SharedModule { }
