import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
// Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
static areEqual(formGroup: FormGroup) {
	let val;
	let valid = true;

	for (let key in formGroup.controls) {
		if (formGroup.controls.hasOwnProperty(key)) {
			let control: FormControl = <FormControl>formGroup.controls[key];
			if (val === undefined) {
				val = control.value
			} else {
				if (val !== control.value) {
					valid = false;
					break;
				}
			}
		}
	}
	if (valid) {
		return null;
	}
	return {
		areEqual: true
	}
 }
}
// custom validator to check that two fields match
// export function MustMatch(controlName: string, matchingControlName: string) {
//     return (formGroup: FormGroup) => {
//         const control = formGroup.controls[controlName];
//         const matchingControl = formGroup.controls[matchingControlName];

//         if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//             // return if another validator has already found an error on the matchingControl
//             return;
//         }

//         // set error on matchingControl if validation fails
//         if (control.value !== matchingControl.value) {
//             matchingControl.setErrors({ mustMatch: true });
//         } else {
//             matchingControl.setErrors(null);
//         }
//     };
// }
