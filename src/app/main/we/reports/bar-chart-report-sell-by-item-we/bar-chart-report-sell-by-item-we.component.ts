import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportByItemComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-item/bar-chart-report-by-item.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-sell-by-item-we',
  templateUrl: './bar-chart-report-sell-by-item-we.component.html',
  styleUrls: ['./bar-chart-report-sell-by-item-we.component.css']
})
export class BarChartReportSellByItemWeComponent implements OnInit {

  // Child Components
  @ViewChild('barChartByItemReport')barChartByItemReport!:BarChartReportByItemComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics:any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

  public onFilteringFabricName (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics, query);
  }

  constructor(
    private _reportWeService: ReportWeService,
    private _fabricService: FabricService,
    public _sharedComponentService: SharedComponentService,
  ) {
    this.getData()
   }

  ngOnInit(): void {
  }

  getData() {
    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.fabrics = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    // Chart
    this._reportWeService.selectSellByFabric(data.itemData.id).subscribe((response: any) => {
      this.barChartByItemReport.data = response
      this.barChartByItemReport.listen();
    })
  }
}