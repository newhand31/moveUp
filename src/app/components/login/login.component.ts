import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private fireauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // UI功能
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  // UI功能END
  // 作用功能
  // 送出表單
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Send the object to database
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
    } else {
      // console.log("Form is not valid!");
      // throw the error using toaster and with required fields
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("You form is invalid!!");
    }
  }
  //firebase登入
  firebaseLogin() {
    this.fireauth.signInWithEmailAndPassword(this.loginForm.value.username, this.loginForm.value.password)
      .then(() => {
        // localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard'])
      }, err => {
        alert("error");
        this.router.navigate(['login']);
      })
  }


  // 作用功能END

  // 輔助功能


  // 輔助功能END
}
