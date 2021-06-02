import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-login';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });
  showLogindata: Boolean = false;
  showMessage: Boolean = false
  messageText: string = ''

  ngOnInit() {
    this.showMessage = false;
    this.messageText = '';
    this.showLogindata = false;
  }

  forgot() {
    this.showMessage = true;
    this.messageText = 'Forgot password clicked!'
  }

  signup() {
    this.showMessage = true;
    this.messageText = 'Sign up clicked!'
  }

  onSubmit() {
    if (this.loginForm.value.username || this.loginForm.value.password) {
      this.showLogindata = true
      this.showMessage = false;
      this.messageText = ''
    } else {
      this.showMessage = true;
      this.messageText = 'You must enter a username or password'
    }
  }
}
