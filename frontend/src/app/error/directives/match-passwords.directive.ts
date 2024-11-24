import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPasswords]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordsDirective,
    multi: true
  }]
})
export class MatchPasswordsDirective implements Validator {
    @Input('appMatchPasswords') passwordField: string = '';

    validate(control: AbstractControl): ValidationErrors | null {
      if (!control || !control.parent) return null;
  
      const password = control.parent.get(this.passwordField);
      const repeatPassword = control;
  
      if (password && repeatPassword && password.value !== repeatPassword.value) {
        return { passwordMismatch: true };
      }
  
      return null; // Valid if no mismatch
    }

}
