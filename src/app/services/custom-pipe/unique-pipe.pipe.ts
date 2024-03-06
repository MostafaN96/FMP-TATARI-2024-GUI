import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniquePipe'
})
export class UniquePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements (this will remove duplicates
    let uniqueArray = value.filter(function (el, index, array) { 
      console.log("el :: ", el);
      console.log("array :: ", array);
      
      return array.indexOf (el) == index;
    });

  return uniqueArray;   } 

}
