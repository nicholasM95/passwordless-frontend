import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {RegisterService} from "../../service/register.service";
import {startAuthentication, startRegistration} from "@simplewebauthn/browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  username: string;

  constructor(private registerService: RegisterService, private loginService: LoginService, private router: Router) {
    this.username = '';
  }

  register() {
    this.registerService.register(this.username).subscribe(result => {
      startRegistration(result).then(result => {
        this.registerService.verify(this.username, result).subscribe(result => {
          type ObjectKey = keyof typeof result;

          const verifiedVar = 'verified' as ObjectKey;
          const verified = result[verifiedVar].toString();

          if (verified === 'true') {
            alert('Registration success.');
          } else {
            alert('Registration failed.');
          }
        });
      }, error => {
        console.error(error);
        alert('Registration failed.');
      });
    });
  }

  login() {
    this.loginService.login(this.username).subscribe(result => {
      startAuthentication(result).then(result => {
        this.loginService.verify(this.username, result).subscribe(result => {
          type ObjectKey = keyof typeof result;

          const verifiedVar = 'verified' as ObjectKey;
          const verified = result[verifiedVar].toString();

          if (verified === 'false') {
            alert('Login failed.');
          } else {
            this.router.navigateByUrl('/user');
          }
        });
      }, error => {
        console.error(error);
        alert('Login failed.');
      });
    });
  }
}
