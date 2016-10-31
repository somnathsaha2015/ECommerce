import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';
import { md5 } from '../../vendor/md5';

@Component({
  templateUrl: 'app/components/forgotPassword/forgotPassword.component.html'
})
export class ForgotPassword {
  subscription: Subscription;
  email: string;
  constructor(private appService: AppService, private router: Router) {
    this.subscription = appService.filterOn('post:forgot:password')
      .subscribe(d => {
        if (d.data.error) {
          console.log(d.data.error.status)
        } else {
          console.log('Success');          
        }
      });
  };
  sendMail() {
    let base64Encoded = this.appService.encodeBase64(this.email);
    this.appService.httpPost('post:forgot:password', { auth: base64Encoded });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

//send password component
@Component({
  template: `
  <button (click)="sendPassword()">Send Password</button>
  `
})
export class SendPassword {
  subscription: Subscription;
  constructor(private appService: AppService, private router: Router) {
    this.subscription = appService.filterOn('post:send:password')
      .subscribe(d => {
        if (d.data.error) {
          console.log(d.data.error.status)
        } else {
          console.log('Success');          
        }
      });
  };
  sendPassword() {
    let code = window.location.search.split('=')[1];
    console.log(code);
    this.appService.httpPost('post:send:password', { auth: code });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

//change password component
@Component({
  templateUrl:'app/components/forgotPassword/changePassword.component.html'
})
export class ChangePassword {
  subscription: Subscription;
  constructor(private appService: AppService, private router: Router) {
    this.subscription = appService.filterOn('post:change:password')
      .subscribe(d => {
        if (d.data.error) {
          console.log(d.data.error.status)
        } else {
          console.log('Success');          
        }
      });
  };
  changePassword(oldPwd1, oldPwd2, newPwd) {
    let email = this.appService.getEmail();
    if (oldPwd1 === oldPwd2) {
      let base64Encoded = this.appService.encodeBase64(email + ':' + md5(oldPwd1) + ':' + md5(newPwd));
      console.log(base64Encoded);
      this.appService.httpPost('post:change:password', { auth: base64Encoded });
    }    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}