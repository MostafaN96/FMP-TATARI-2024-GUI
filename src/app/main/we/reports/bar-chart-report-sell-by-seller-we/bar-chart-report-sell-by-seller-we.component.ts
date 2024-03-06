import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-supplier/bar-chart-report-by-supplier.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-sell-by-seller-we',
  templateUrl: './bar-chart-report-sell-by-seller-we.component.html',
  styleUrls: ['./bar-chart-report-sell-by-seller-we.component.css']
})
export class BarChartReportSellBySellerWeComponent implements OnInit {

  // Child Components
  @ViewChild('barChartBySupplierReport')barChartBySupplierReport!:BarChartReportBySupplierComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  sellers:any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

// --------------- Seller --------------
// maps the appropriate column to fields property
public fieldsSeller: Object = { value: "id", text:"name"};
// set the placeholder to the AutoComplete input
public textSeller: string = "العميل"

public onFilteringSeller (e: any)
{
  e.preventDefaultAction=true;
       var predicate = new Predicate('name', 'contains', e.text);
        var query = new Query();
    //frame the query based on search string with filter type.
      query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
      e.updateData(this.sellers, query);
}

  constructor(
    private _reportWeService: ReportWeService,
    private _bussinessmanService: BussinessmanService,
    public _sharedComponentService: SharedComponentService,
  ) {
    this.getData()
   }

  ngOnInit(): void {
  }

  getData() {
    this._bussinessmanService.selectSellersSellFromWe().subscribe((response: any) => {
      this.sellers = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    // Chart
    this._reportWeService.selectSellBySeller(data.itemData.id).subscribe((response: any) => {
      this.barChartBySupplierReport.data = response
      this.barChartBySupplierReport.listen();
    })
  }
}