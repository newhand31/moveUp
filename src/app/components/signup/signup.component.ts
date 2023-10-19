import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private fireauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  // 前端UI功能
  // 顯示OR隱藏密碼
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  // 前端UI功能END
  // 作用功能
  // 送出表單
  onSignup() {
    if (this.signUpForm.valid) {

      // console.log(this.signUpForm.value);
      // Send the object to database
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message)
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert(err?.error.message)
          }
        })
    } else {
      // console.log("Form is not valid!");
      // throw the error using toaster and with required fields
      ValidateForm.validateAllFormFileds(this.signUpForm);
      // alert("You form is invalid!!");
    }
  }

  firebaseSignup() {
    this.fireauth.createUserWithEmailAndPassword(this.signUpForm.value.userName, this.signUpForm.value.password)
      .then(() => {
        alert("註冊成功")
        this.router.navigate(['login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['signup']);
      })
  }
  // 作用功能END


}
