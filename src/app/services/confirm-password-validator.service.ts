import { Injectable } from '@angular/core';

import { AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPasswordValidatorService {

  constructor() { }

  ConfirmedValidator(controlName: AbstractControl ) {
    
    const control = controlName.get('password');

    const matchingControl = controlName.get('confirmPassword');

    if (control?.value !== matchingControl?.value) {
      console.log("confirmedValidator: true");
      matchingControl?.setErrors({ confirmedValidator: true })
      return { confirmedValidator: null };

    } else {
      matchingControl?.clearValidators()
      matchingControl?.setValidators(Validators.required)
      return { confirmedValidator: null };

    }

  }

}
