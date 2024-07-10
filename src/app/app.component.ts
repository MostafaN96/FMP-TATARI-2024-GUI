import { Component } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import * as $ from 'jquery';
import { NavigationEnd, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

import { GlobalService } from 'src/app/services/exchange-rate.service';

// Call Service -
import { ExchangeRateService } from "src/app/services/main/exchange-rate.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application';
  isShowNav = false;

  constructor(private spinner: NgxSpinnerService,     
    private titleService:Title,
    public router: Router,
    public globalService: GlobalService,
    private _exchangeRateService: ExchangeRateService,

    ) {
      
      this._exchangeRateService.select().subscribe((response: any) => {
        setTimeout(() => this.globalService.exchangeRate.next({
          dollarPrice: response[0]['dollar_price']
        }), 1000);
      })

      // submit loading
    onsubmit = (event) => {
      setTimeout(() => {
        event!.submitter!['disabled'] = false
      }, 3000);
      event!.submitter!['disabled'] = true

      event.preventDefault();
    };

        /** spinner starts on init */
        this.spinner.show();

    //after document load
    $(document).ready(() => {   //same as: $(function() { 

      this.spinner.hide();
      this.titleService.setTitle(String(document.getElementsByClassName("title-page")[0]?.innerHTML ?? 'Tatari')  )

      // Change Tab Name
        this.router.events.subscribe(event =>{
          if (event instanceof NavigationEnd){
            //  console.log(event.url)
            $(window).ready( () => {
              this.titleService.setTitle(String(document.getElementsByClassName("title-page")[0].innerHTML ?? 'Tatari')  );
            });
          }
       })


      //after full window load including image src css file
      // $(window).load( () => {
              /** spinner ends after 5 seconds */


      // });

    });

  }
}

