import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './_helpers/user.service';
import { User } from './_helpers/helpers.interface';
import Swal from 'sweetalert2';
import { DBOperation } from './_helpers/db-opration';
import { MustMatch } from './_helpers/must-match.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registrationapp';
  // registerForm: FormGroup = new FormGroup({});
  //  registerForm!: FormGroup;

  registerForm: any;
  users: User[] = []
  submitted: boolean = false;
  buttonText: string = "submit";

  Dboops!: DBOperation;




  constructor(private _toastr: ToastrService, private fb: FormBuilder, private _userService: UserService) { }
  ngOnInit() {
    this.setFormState();
    this.getAllUsers();

  }

  setFormState() {
    this.buttonText = "submit";
    this.Dboops = DBOperation.create;

    // this.registerForm = this.fb.group({
    //   id: [0],
    //   title: ['', Validators.required],
    //   fristName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
    //   lastname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.max(20)])],
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   dob: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])],
    //   password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    //   confirmPassword: ['', Validators.required],
    //   acceptTerms: [false, Validators.requiredTrue]
    // },{
    //   validators : MustMatch('password','confirmPassword')
    // });



    this.registerForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      fristName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.max(20)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmPassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
      MustMatch('Password','confirmPassword')
    );

  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    switch (this.Dboops) {
      case DBOperation.create:
        this._userService.addUser(this.registerForm.value).subscribe(res => {
          this._toastr.success("User Added!!", "User Registration");
          this.getAllUsers();
          this.onCancel();
        });
        break;
      case DBOperation.update:
         this._userService.updateUser(this.registerForm.value).subscribe(res => {
          this._toastr.success("User Updated!!", "User Registration");
          this.getAllUsers();
          this.onCancel();
        });

        break;
    }

  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = "submit";
    this.Dboops = DBOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: any): void => {
      this.users = res;
      console.log(res);
    });

  }

  Edit(userid: number) {
    this.buttonText = "update";
    this.Dboops = DBOperation.update;

    let user = this.users.find((u: User) => u.id === userid);
    this.registerForm.patchValue(user);

    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmPassword').setValue('');
    // this.registerForm.get('acceptTerms').setValue(false);
  }
  Delete(userid: number) {
    // this._userService.deleteUser(userid).subscribe(res => {
    //   this.getAllUsers();
    //   this._toastr.success('deleted Success||','User registration')
    // });

    Swal.fire({
      title: 'Are you soure?',
      text: 'You will not be able to recover deleted file|',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it|',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(userid).subscribe(res => {
          this.getAllUsers();
          // this._toastr.success('deleted Success||', 'User registration')
        // Swal.fire(
        //   'deleted|',
        //   'your imaginary file has been deleted,',
        //   'success'
        // )
      });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'cancelled',
          'Your  File is Safe :)',
          'error'
        )

      }
    })




  }
}