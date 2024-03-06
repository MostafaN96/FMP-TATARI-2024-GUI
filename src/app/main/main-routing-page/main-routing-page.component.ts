import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import * as $ from 'jquery';

// Import Components
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-main-routing-page',
  templateUrl: './main-routing-page.component.html',
  styleUrls: ['./main-routing-page.component.css']
})
export class MainRoutingPageComponent implements AfterViewChecked  {



  constructor(
    @Inject(AppComponent) private parent: AppComponent,

  ) { }
  ngAfterViewChecked(): void {
    this.parent.isShowNav = true
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    $(`.main-content-wrap .mat-paginator .mat-paginator-container .mat-paginator-page-size 
    .mat-paginator-page-size-label`).html("عدد العناصر في كل صفحة:")

    $(`.main-content-wrap .mat-paginator .mat-paginator-outer-container
     .mat-paginator-container
     .mat-paginator-range-actions 
    .mat-paginator-range-label`).css("direction","ltr")
  }
}
