import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorPatternService {

  constructor() { }
  
  get validator_pattern(): any {      
    return {
      name: "[A-Z a-z \*\% \s]{0,50}",
      shortText: "^[a-zA-Z0-9\%\,\ \*\.\_\n\:\(\)\-\/\?& \u0600-\u06FF-/]{1,300}$",
      longText: "^[a-zA-Z0-9\%\,\ \*\.\_\n\:\(\)\-\/\?& \u0600-\u06FF-/]{3,300}$",
      htmlText: "^<(\\S*?)[^>]*>.*?</\\1>|<.*?/>$",
      email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{1,10}(?:\.[a-zA-Z0-9-]+){1,3}$",
      phone: "^[0-9]{8,15}$",
      password: "^[a-zA-Z0-9\ \:\|\/\-\_\,\&\$\@\.\(\)\#]{8,45}$",
      eUsername: "^user_[0-9]{6}$",
      number: "^[0-9]{1,20}$",
      numberNotZero: "^[1-9]([0-9]{1,25})?(.[0-9]{1,25})?$",
      floatNumber: "^[0-9]*\.?[0-9]+$",
      floatNumberNotZero: "^[0-9]*\.?[0-9]+$",

    }
   }  
}
