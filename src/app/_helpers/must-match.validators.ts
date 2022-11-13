// import { FormGroup } from "@angular/forms";

// export function MustMatch(password: any, confirmpassword: string) {
//     return (FormGroup: FormGroup) => {
//         const passwordControl = FormGroup.controls[password];
//         const confirmpasswordControl = FormGroup.controls[confirmpassword];

//         if (confirmpasswordControl.errors && !confirmpasswordControl.errors['mustMatch']) {
//             return;
//         }


//         if (passwordControl.value !== confirmpasswordControl.value) {
//             confirmpasswordControl.setErrors({ mustMatch: true });
//         } else {
//             confirmpasswordControl.setErrors(null);
//         }
//     }
// }



import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MustMatch(password: string, confirmPassword: string): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | any => {
        const passwordControl = ctrl.get(password);
        const confirmPasswordControl = ctrl.get(confirmPassword);

        if (confirmPasswordControl?.errors && confirmPasswordControl.errors['mustMatch'])
            return null;



        if (passwordControl?.value == confirmPasswordControl?.value) {
            confirmPasswordControl?.setErrors({ MustMatch:false });
        }
        else {
            confirmPasswordControl?.setErrors(null);
        }
        return null;
    }
}










